import { ExtractedSubject } from '@/types';

// LLM Configuration for different providers
interface LLMConfig {
    name: string;
    model: string;
    apiUrl: string;
    apiKey: string;
    maxRetries: number;
}

const LLM_CONFIGS: LLMConfig[] = [
    {
        name: 'hermes',
        model: 'nousresearch/hermes-3-llama-3.1-405b:free',
        apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
        apiKey: process.env.OPENROUTER_API_KEY || '',
        maxRetries: 3,
    },
    {
        name: 'qwen',
        model: 'qwen/qwen3.6-plus-preview:free',
        apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
        apiKey: process.env.OPENROUTER_API_KEY || '',
        maxRetries: 3,
    },
    {
        name: 'llama',
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
        apiKey: process.env.OPENROUTER_API_KEY || '',
        maxRetries: 3,
    },
];

const EXTRACTION_PROMPT = `You are an academic timetable-intelligence agent.

Your task:  
Given a syllabus PDF text dump or extracted text, analyze it EXACTLY like a university academic officer and return a **clean, structured dataset** containing every subject, lab, elective, skill course, contact hours, credits, and semester mapping.

You MUST:
1. Understand ANY syllabus format (tables, scanned text, paragraphs).
2. Auto-detect the academic structure:
   - Program name
   - Year (FE/SE/TE/BE)
   - Semester number
   - Course categories (PCC, BSC, OEC, MDM, VSEC, Labs, Mini Project, etc.)
3. Extract for every subject:
   - Subject Code
   - Subject Name
   - Category (PCC/OE/BS/VSEC/etc.)
   - L-T-P contact hours
   - Total Weekly Hours
   - Credits
4. Detect and extract LABS separately.
5. Detect ELECTIVES and include the list of elective choices.
6. Normalize inconsistent formatting (tabs, merged cells, missing spaces).
7. If something is unclear, infer based on patterns used in Indian university syllabi.
8. Return output using the following JSON schema:

{
  "program": "",
  "year": "",
  "semester": "",
  "subjects": [
    {
      "code": "",
      "name": "",
      "category": "",
      "lecture_hours": 0,
      "tutorial_hours": 0,
      "practical_hours": 0,
      "weekly_hours": 0,
      "credits": 0
    }
  ],
  "labs": [
    {
      "code": "",
      "name": "",
      "weekly_hours": 0,
      "credits": 0
    }
  ],
  "electives": [
    {
      "type": "OE / DE / MDM / VSEC",
      "options": ["", "", ""],
      "credits": 0
    }
  ]
}

Important:
- NEVER hallucinate subject names. Only extract what's present.
- Fix OCR mistakes automatically.
- If an item appears under multiple headings, choose the most logical category.
- Maintain the order in which subjects appear in the syllabus.

Now, read the incoming syllabus text and produce ONLY the JSON described above.

Syllabus text:`;

/**
 * Call LLM with retry logic
 */
async function callLLM(config: LLMConfig, prompt: string, text: string): Promise<string> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Slotify',
    };

    const body = {
        model: config.model,
        messages: [
            {
                role: 'system',
                content: 'You are a precise syllabus parser. Always return valid JSON.',
            },
            {
                role: 'user',
                content: prompt + '\n\n' + text.substring(0, 15000), // Limit text length
            },
        ],
        temperature: 0.1, // Low temperature for more consistent output
        max_tokens: 4000,
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < config.maxRetries; attempt++) {
        try {
            const response = await fetch(config.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API error (${config.name}): ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;

            if (!content) {
                throw new Error(`Empty response from ${config.name}`);
            }

            return content;
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            console.warn(`Attempt ${attempt + 1} failed for ${config.name}:`, lastError.message);

            if (attempt < config.maxRetries - 1) {
                // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
        }
    }

    throw lastError || new Error(`All retries failed for ${config.name}`);
}

/**
 * Parse LLM response to extract JSON
 */
function parseJSONResponse(content: string): ExtractedSubject[] {
    // Try to find JSON in the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('No JSON object found in response');
    }

    let parsed: any;
    try {
        parsed = JSON.parse(jsonMatch[0]);
    } catch (error) {
        // Try cleaning up common JSON issues
        const cleaned = jsonMatch[0]
            .replace(/\n/g, ' ')
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']');
        parsed = JSON.parse(cleaned);
    }

    const allExtracted: ExtractedSubject[] = [];
    
    // Process Theory Subjects
    if (parsed.subjects && Array.isArray(parsed.subjects)) {
        parsed.subjects.forEach((s: any, index: number) => {
            const subjectName = s.name || `Subject ${index + 1}`;
            allExtracted.push({
                name: s.category ? `[${s.category}] ${subjectName}` : subjectName,
                code: s.code || `SUB${index + 1}`,
                type: 'theory',
                hours_per_week: Number(s.weekly_hours) || Number(s.lecture_hours) || 4,
                lab_type: undefined,
                requires_batches: false,
                num_batches: 1,
                credits: Number(s.credits) || 3,
            });
        });
    }

    // Process Labs
    if (parsed.labs && Array.isArray(parsed.labs)) {
        parsed.labs.forEach((l: any, index: number) => {
            const nameLower = (l.name || '').toLowerCase();
            let predictedLabType = 'computer';
            
            if (nameLower.includes('computer') || nameLower.includes('programming') || nameLower.includes('software')) {
                predictedLabType = 'computer';
            } else if (nameLower.includes('physics')) {
                predictedLabType = 'physics';
            } else if (nameLower.includes('chemistry')) {
                predictedLabType = 'chemistry';
            } else if (nameLower.includes('electronic') || nameLower.includes('circuit')) {
                predictedLabType = 'electronics';
            } else if (nameLower.includes('mechanic') || nameLower.includes('workshop')) {
                predictedLabType = 'mechanical';
            }

            allExtracted.push({
                name: l.name || `Lab ${index + 1}`,
                code: l.code || `LAB${index + 1}`,
                type: 'lab',
                hours_per_week: Number(l.weekly_hours) || 2,
                lab_type: predictedLabType,
                requires_batches: true,
                num_batches: 3,
                credits: Number(l.credits) || 1,
            });
        });
    }

    // Process Electives
    if (parsed.electives && Array.isArray(parsed.electives)) {
        parsed.electives.forEach((e: any, index: number) => {
            const options = Array.isArray(e.options) ? e.options.join(', ') : 'Various Options';
            allExtracted.push({
                name: `${e.type || 'Elective'} (${options})`,
                code: `ELEC${index + 1}`,
                type: 'theory',
                hours_per_week: 3,
                lab_type: undefined,
                requires_batches: false,
                num_batches: 1,
                credits: Number(e.credits) || 3,
            });
        });
    }

    if (allExtracted.length === 0) {
        throw new Error('Invalid response format: No subjects, labs, or electives found in JSON.');
    }

    return allExtracted;
}

/**
 * Extract subjects from syllabus text using LLM
 * Falls back through multiple providers if one fails
 */
export async function extractSubjectsFromText(text: string): Promise<ExtractedSubject[]> {
    const errors: string[] = [];

    // Try each LLM in order
    for (const config of LLM_CONFIGS) {
        // Skip if API key not configured
        if (!config.apiKey) {
            console.warn(`Skipping ${config.name}: API key not configured`);
            continue;
        }

        try {
            console.log(`Trying extraction with ${config.name}...`);
            const response = await callLLM(config, EXTRACTION_PROMPT, text);
            const subjects = parseJSONResponse(response);

            if (subjects.length === 0) {
                throw new Error('No subjects extracted');
            }

            console.log(`Successfully extracted ${subjects.length} subjects using ${config.name}`);
            return subjects;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            errors.push(`${config.name}: ${errorMessage}`);
            console.error(`Extraction failed with ${config.name}:`, errorMessage);
        }
    }

    // If all LLMs failed, throw comprehensive error
    throw new Error(`All LLM extraction attempts failed:\n${errors.join('\n')}`);
}

/**
 * Extract subjects using direct Gemini API (fallback)
 */
export async function extractWithGeminiDirect(text: string): Promise<ExtractedSubject[]> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('Gemini API key not configured');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: EXTRACTION_PROMPT + '\n\n' + text.substring(0, 15000),
                }],
            }],
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 4000,
            },
        }),
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
        throw new Error('Empty response from Gemini');
    }

    return parseJSONResponse(content);
}
