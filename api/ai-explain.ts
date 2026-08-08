import { VercelRequest, VercelResponse } from '@vercel/node';
import { generateGeminiContent, GeminiApiError } from '../src/services/geminiService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, verseContext, mode } = req.body;

    if (!question && !verseContext) {
      return res.status(400).json({ error: 'Please provide a question or verse context.' });
    }

    const systemInstruction = `You are a deeply respectful, learned Marathi scholar and spiritual guide specializing in Sant Dnyaneshwar Maharaj's 'Dnyaneshwari' (ज्ञानेश्वरी) - the revered 13th-century Marathi commentary on the Bhagavad Gita.
Your mission is to provide authentic, heartwarming, and profound explanations of Dnyaneshwari verses (ओवी), Marathi Bhavarth (भावार्थ), and spiritual wisdom.

Guidelines:
1. Always maintain deep reverence for Sant Dnyaneshwar Maharaj (ज्ञानेश्वर माऊली).
2. Respond clearly with structured sections:
   - **मराठी भावार्थ व चिंतन** (Detailed spiritual explanation in lucid Marathi)
   - **English Summary & Practical Guidance** (Modern application of this wisdom in daily life)
   - **Key Spiritual Takeaways** (3 bullet points)
3. If requested to answer a general life question (e.g. stress, mind control, devotion, karma), cite relevant concepts/Ovis from Dnyaneshwari (such as Chapter 2 Sthitaprajna, Chapter 6 Abhyasa Yoga, Chapter 9 Bhakti, Chapter 12 Bhakta Lakshana, or Pasayadan).
4. Keep the tone compassionate, uplifting, serene, and scholarly.`;

    let userPrompt = '';

    if (mode === 'explain-ovi' && verseContext) {
      userPrompt = `Please explain the following Dnyaneshwari Ovi in detail:
Chapter: ${verseContext.chapterTitle} (Adhyay ${verseContext.chapterNumber})
Ovi Reference: ${verseContext.oviNumber}
Original Ovi: "${verseContext.originalMarathi}"
Marathi Bhavarth: "${verseContext.marathiBhavarth}"
English Translation: "${verseContext.englishTranslation}"

User's specific query/focus: ${question || 'Explain the deeper spiritual nectar, philosophical significance, and practical daily life application of this Ovi.'}`;
    } else {
      userPrompt = `User's Question about Dnyaneshwari / Life Guidance:
"${question}"

${verseContext ? `Context Verse: Adhyay ${verseContext.chapterNumber}, Ovi ${verseContext.oviNumber}` : ''}

Please guide the user according to the philosophy of Sant Dnyaneshwar Maharaj in Dnyaneshwari. Provide both Marathi and English insights.`;
    }

    const text = await generateGeminiContent({
      prompt: userPrompt,
      systemInstruction,
      temperature: 0.7,
    });

    return res.json({
      answer: text,
      provider: 'gemini',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    if (error instanceof GeminiApiError) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error('Gemini AI Error in /api/ai-explain:', error);
    return res.status(500).json({
      error: 'AI service error. Please try again later.',
    });
  }
}
