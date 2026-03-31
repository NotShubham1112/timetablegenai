import pdfParse from 'pdf-parse';

/**
 * Parse PDF buffer and extract text content
 */
export async function parsePDF(buffer: Buffer): Promise<string> {
    try {
        const data = await pdfParse(buffer);
        return data.text;
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Failed to parse PDF. Please ensure it is a valid PDF file.');
    }
}

/**
 * Clean extracted text for better LLM processing
 */
export function cleanExtractedText(text: string): string {
    return text
        // Remove excessive whitespace
        .replace(/\s+/g, ' ')
        // Remove excessive newlines
        .replace(/\n{3,}/g, '\n\n')
        // Remove special characters that might break JSON
        .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '')
        // Normalize unicode quotes
        .replace(/[""''']/g, '"')
        // Remove page numbers (common patterns)
        .replace(/\n\s*\d+\s*\n/g, '\n')
        // Remove headers/footers patterns
        .replace(/Page \d+ of \d+/gi, '')
        .trim();
}

/**
 * Extract structured sections from syllabus text
 */
export function extractSections(text: string): { title: string; content: string }[] {
    const sections: { title: string; content: string }[] = [];

    // Common section headers in syllabi
    const sectionPatterns = [
        /(?:^|\n)\s*(Course Code|Subject Code|Code)\s*[:\-]\s*(.+?)(?:\n|$)/mi,
        /(?:^|\n)\s*(Course Title|Subject Name|Title)\s*[:\-]\s*(.+?)(?:\n|$)/mi,
        /(?:^|\n)\s*(Course Objectives|Objectives)\s*[:\-]?\s*\n/i,
        /(?:^|\n)\s*(Course Outcomes|Learning Outcomes)\s*[:\-]?\s*\n/i,
        /(?:^|\n)\s*(Syllabus|Course Content)\s*[:\-]?\s*\n/i,
        /(?:^|\n)\s*(Reference Books|Text Books|References)\s*[:\-]?\s*\n/i,
        /(?:^|\n)\s*(Practical|Lab Work|Laboratory)\s*[:\-]?\s*\n/i,
        /(?:^|\n)\s*(Teaching Scheme|Hours|Credit)\s*[:\-]?\s*\n/i,
    ];

    let lastIndex = 0;
    let currentTitle = 'Introduction';

    for (const pattern of sectionPatterns) {
        const matches = [...text.matchAll(new RegExp(pattern, 'gi'))];
        for (const match of matches) {
            const index = match.index || 0;
            if (index > lastIndex) {
                sections.push({
                    title: currentTitle,
                    content: text.substring(lastIndex, index).trim(),
                });
                lastIndex = index;
            }
            currentTitle = match[1] || match[0];
        }
    }

    // Add remaining content
    if (lastIndex < text.length) {
        sections.push({
            title: currentTitle,
            content: text.substring(lastIndex).trim(),
        });
    }

    return sections;
}

/**
 * Preprocess PDF text specifically for syllabus extraction
 */
export function preprocessSyllabusText(text: string): string {
    const cleaned = cleanExtractedText(text);

    // Try to identify subject table patterns
    const tablePatterns = [
        // Common table formats
        /(?:Code|Subject Code)\s+[\|\t]+\s*(?:Name|Subject)\s+[\|\t]+\s*(?:Hours|Credits)/i,
        /(?:SEMESTER|SEM)\s*[IVX\d]+/i,
        /(?:Course No\.?|Course Code)\s+Course Title/i,
    ];

    // Check if any table pattern is found
    const hasTable = tablePatterns.some(pattern => pattern.test(cleaned));

    if (hasTable) {
        console.log('Table-like structure detected in syllabus');
    }

    return cleaned;
}
