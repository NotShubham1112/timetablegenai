import { ExtractedSubject } from '@/types';

// ─── LLM Configuration ────────────────────────────────────────────────────────

interface LLMConfig {
    name: string;
    model: string;
    apiUrl: string;
    apiKey: string;
    maxRetries: number;
    /** If true, a 429 from this provider aborts retries immediately */
    skipOn429?: boolean;
}

/**
 * OpenRouter free-tier model chain — ordered from most to least capable/reliable.
 * Rules of thumb:
 *   - Prefer large instruction-tuned models (they follow JSON schemas better)
 *   - Avoid the generic "openrouter/free" pseudo-model (returns empty content)
 *   - Keep maxRetries low for 429-prone providers
 */
const OPENROUTER_CONFIGS: LLMConfig[] = [
    {
        // Gemma 3 27B — very capable, handles structured JSON well
        name: 'gemma-3-27b',
        model: 'google/gemma-3-27b-it:free',
        apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
        apiKey: process.env.OPENROUTER_API_KEY || '',
        maxRetries: 3,
        skipOn429: true,
    },
    {
        // Mistral 7B — lightweight but reliable JSON emitter
        name: 'mistral-7b',
        model: 'mistralai/mistral-7b-instruct:free',
        apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
        apiKey: process.env.OPENROUTER_API_KEY || '',
        maxRetries: 2,
        skipOn429: true,
    },
    {
        // DeepSeek R1 distill — good reasoning, solid fallback
        name: 'deepseek-r1-8b',
        model: 'deepseek/deepseek-r1-distill-llama-8b:free',
        apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
        apiKey: process.env.OPENROUTER_API_KEY || '',
        maxRetries: 2,
        skipOn429: true,
    },
];

// ─── Extraction Prompt ────────────────────────────────────────────────────────

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
- Respond with ONLY the JSON object — no markdown fences, no explanation.

Now, read the incoming syllabus text and produce ONLY the JSON described above.

Syllabus text:`;

// ─── OpenRouter LLM Caller ────────────────────────────────────────────────────

/**
 * Call an OpenRouter model with retry logic.
 * Throws immediately on 429 if config.skipOn429 is set.
 */
async function callOpenRouterLLM(config: LLMConfig, text: string): Promise<string> {
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
                content: 'You are a precise syllabus parser. Always return valid JSON with no markdown fences.',
            },
            {
                role: 'user',
                content: EXTRACTION_PROMPT + '\n\n' + text.substring(0, 15000),
            },
        ],
        temperature: 0.1,
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

            // Skip remaining retries on rate-limit — no point waiting
            if (response.status === 429 && config.skipOn429) {
                const errorText = await response.text();
                throw new Error(`RATE_LIMITED:API error (${config.name}): 429 - ${errorText}`);
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API error (${config.name}): ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;

            if (!content || content.trim() === '') {
                throw new Error(`Empty response from ${config.name}`);
            }

            return content;
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            console.warn(`Attempt ${attempt + 1} failed for ${config.name}:`, lastError.message);

            // Bubble up rate-limit errors immediately (no more retries for this provider)
            if (lastError.message.startsWith('RATE_LIMITED:')) {
                throw new Error(lastError.message.replace('RATE_LIMITED:', ''));
            }

            if (attempt < config.maxRetries - 1) {
                // Exponential backoff: 1s, 2s, 4s …
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
        }
    }

    throw lastError || new Error(`All retries failed for ${config.name}`);
}

// ─── Gemini Native Fallback ───────────────────────────────────────────────────

/**
 * Call Google Gemini directly using the REST API.
 * Used only when all OpenRouter models fail.
 */
async function callGeminiFallback(text: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY not configured');
    }

    // Use gemini-1.5-flash — fast, cheap, great JSON output
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const body = {
        contents: [
            {
                parts: [
                    {
                        text: EXTRACTION_PROMPT + '\n\n' + text.substring(0, 15000),
                    },
                ],
            },
        ],
        generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 4096,
        },
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content || content.trim() === '') {
        throw new Error('Empty response from Gemini');
    }

    return content;
}

// ─── JSON Parser ──────────────────────────────────────────────────────────────

/**
 * Parse LLM response to extract JSON and convert to ExtractedSubject[]
 */
function parseJSONResponse(content: string): ExtractedSubject[] {
    // Strip markdown fences if the model wrapped the JSON anyway
    const stripped = content
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();

    // Find the outermost JSON object
    const jsonMatch = stripped.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('No JSON object found in response');
    }

    let parsed: any;
    try {
        parsed = JSON.parse(jsonMatch[0]);
    } catch {
        // Try cleaning up common JSON issues (trailing commas, etc.)
        const cleaned = jsonMatch[0]
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

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Extract subjects from syllabus text using LLM.
 * Tries OpenRouter free models in order, then falls back to Gemini.
 */
export async function extractSubjectsFromText(text: string): Promise<ExtractedSubject[]> {
    const errors: string[] = [];

    // ── 1. Try OpenRouter free models ──────────────────────────────────────
    for (const config of OPENROUTER_CONFIGS) {
        if (!config.apiKey) {
            console.warn(`Skipping ${config.name}: OPENROUTER_API_KEY not configured`);
            continue;
        }

        try {
            console.log(`Trying extraction with ${config.name}...`);
            const response = await callOpenRouterLLM(config, text);
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

    // ── 2. Gemini native fallback ──────────────────────────────────────────
    if (process.env.GEMINI_API_KEY) {
        try {
            console.log('Trying extraction with gemini-1.5-flash (native fallback)...');
            const response = await callGeminiFallback(text);
            const subjects = parseJSONResponse(response);

            if (subjects.length === 0) {
                throw new Error('No subjects extracted');
            }

            console.log(`Successfully extracted ${subjects.length} subjects using Gemini fallback`);
            return subjects;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            errors.push(`gemini-fallback: ${errorMessage}`);
            console.error('Extraction failed with Gemini fallback:', errorMessage);
        }
    }

    // ── 3. All providers failed ────────────────────────────────────────────
    const combinedErrors = errors.join('\n');

    let helpfulAdvice =
        '\n\nTip: All free AI models failed. Options:\n' +
        '  • Add GEMINI_API_KEY to .env.local for a reliable free fallback (https://aistudio.google.com/app/apikey)\n' +
        '  • Check your OPENROUTER_API_KEY has sufficient quota at https://openrouter.ai/account\n' +
        '  • Free models may be temporarily overloaded — retry in a few minutes.';

    if (combinedErrors.includes('401')) {
        helpfulAdvice =
            '\n\nCRITICAL: A 401 Unauthorized error was received. ' +
            'Your OPENROUTER_API_KEY is likely invalid or expired. ' +
            'Please regenerate it at https://openrouter.ai/keys';
    }

    throw new Error(
        `Subject extraction failed. We tried multiple AI models but all attempts were unsuccessful:\n${combinedErrors}${helpfulAdvice}`
    );
}
