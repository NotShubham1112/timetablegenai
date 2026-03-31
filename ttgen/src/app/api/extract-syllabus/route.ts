import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { parsePDF, preprocessSyllabusText } from '@/lib/pdf-parser';
import { extractSubjectsFromText } from '@/lib/ai-extractor';

// POST /api/extract-syllabus
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const collegeId = formData.get('college_id') as string;
        const semesterId = formData.get('semester_id') as string;

        if (!file || !collegeId || !semesterId) {
            return NextResponse.json(
                { error: 'File, college_id, and semester_id are required' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.includes('pdf')) {
            return NextResponse.json(
                { error: 'Only PDF files are supported' },
                { status: 400 }
            );
        }

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'File size must be less than 10MB' },
                { status: 400 }
            );
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Initialize Admin client to bypass any RLS issues during file upload and parsing
        const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
        const supabaseAdmin = createSupabaseClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Upload file to storage
        const fileName = `${collegeId}/${Date.now()}-${file.name}`;

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
            .from('syllabus-pdfs')
            .upload(fileName, file, {
                contentType: 'application/pdf',
                upsert: true
            });

        if (uploadError) {
            console.error('Upload Error Details:', uploadError);
            return NextResponse.json(
                { error: 'Failed to upload file. ' + uploadError.message },
                { status: 500 }
            );
        }

        // Get public URL (will 404 if bucket is not public, but we only use it locally for processing anyway)
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('syllabus-pdfs')
            .getPublicUrl(fileName);

        // Create upload record
        const { data: uploadRecord, error: recordError } = await supabaseAdmin
            .from('syllabus_uploads')
            .insert([
                {
                    college_id: collegeId,
                    semester_id: semesterId,
                    file_name: file.name,
                    file_url: publicUrl,
                    file_size: file.size,
                    extraction_status: 'processing',
                },
            ])
            .select()
            .single();

        if (recordError) {
            console.error('Record error:', recordError);
            return NextResponse.json(
                { error: 'Failed to create upload record. ' + recordError.message },
                { status: 500 }
            );
        }

        // Parse PDF and extract text
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        let extractedText: string;
        try {
            extractedText = await parsePDF(fileBuffer);
        } catch (error) {
            await supabaseAdmin
                .from('syllabus_uploads')
                .update({
                    extraction_status: 'failed',
                    extraction_error: 'Failed to parse PDF',
                })
                .eq('id', uploadRecord.id);

            return NextResponse.json(
                { error: 'Failed to parse PDF. Ensure it is a valid PDF file.' },
                { status: 400 }
            );
        }

        // Preprocess text
        const preprocessedText = preprocessSyllabusText(extractedText);

        // Extract subjects using LLM
        let subjects;
        try {
            subjects = await extractSubjectsFromText(preprocessedText);
        } catch (error) {
            console.error('Extraction error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Extraction failed';
            await supabaseAdmin
                .from('syllabus_uploads')
                .update({
                    extraction_status: 'failed',
                    extraction_error: errorMessage,
                })
                .eq('id', uploadRecord.id);

            return NextResponse.json(
                { error: `Failed to extract subjects from PDF details: ${errorMessage}` },
                { status: 500 }
            );
        }

        // Update record with extracted data
        await supabaseAdmin
            .from('syllabus_uploads')
            .update({
                extraction_status: 'completed',
                extracted_data: subjects,
                processed_at: new Date().toISOString(),
            })
            .eq('id', uploadRecord.id);

        return NextResponse.json({
            upload: uploadRecord,
            subjects,
            message: `Successfully extracted ${subjects.length} subjects`,
        });
    } catch (error) {
        console.error('Extract syllabus error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
