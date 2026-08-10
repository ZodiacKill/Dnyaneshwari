import { VercelRequest, VercelResponse } from "@vercel/node";
import { generateGeminiContent, GeminiApiError } from "./lib/geminiService.js";
import { saveOviContent, isStoragePersistent } from "./lib/kvStore.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { originalMarathi, chapterNumber, oviNumber, oviId } = req.body;

    if (!originalMarathi) {
      return res.status(400).json({
        error: "originalMarathi is required.",
      });
    }

    const systemInstruction = `You are a Marathi scholar of Dnyaneshwari.

Return STRICT JSON:
{
"marathiBhavarth": "...",
"englishTranslation": "...",
"spiritualInsight": "..."
}

No markdown. No explanation.`;

    const userPrompt = `Adhyay ${chapterNumber}, Ovi ${oviNumber}:
"${originalMarathi}"`;

    const raw = await generateGeminiContent({
      prompt: userPrompt,
      systemInstruction,
      temperature: 0.4,
      responseMimeType: "application/json",
    });

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = {
        marathiBhavarth: raw,
        englishTranslation: "",
        spiritualInsight: "",
      };
    }

    if (oviId && chapterNumber && oviNumber) {
      await saveOviContent(oviId, {
        ovi_id: oviId,
        chapter_number: Number(chapterNumber),
        ovi_number: Number(oviNumber),
        original_marathi: originalMarathi,
        marathi_bhavarth: parsed.marathiBhavarth,
        english_translation: parsed.englishTranslation,
        spiritual_insight: parsed.spiritualInsight,
        ai_provider: "gemini",
        is_generated: true,
        created_at: new Date().toISOString(),
      });
    }

    return res.json({
      ...parsed,
      provider: "gemini",
      persisted: isStoragePersistent(),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    if (error instanceof GeminiApiError) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Gemini Error in /api/generate-ovi-content:", error);
    return res.status(500).json({
      error: "AI service error. Please try again later.",
    });
  }
}