import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily / safely (for Chintan AI)
const getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Initialize OpenAI API client lazily / safely (for Ovi content generation)
const getOpenAI = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is missing.");
  }
  return new OpenAI({
    apiKey,
  });
};

// Healthcheck API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Marathi Dnyaneshwari backend server running" });
});

// AI Spiritual Chintan & Q&A Endpoint
app.post("/api/ai-explain", async (req, res) => {
  try {
    const { question, verseContext, mode } = req.body;

    if (!question && !verseContext) {
      return res.status(400).json({ error: "Please provide a question or verse context." });
    }

    const ai = getGeminiAI();

    let systemInstruction = `You are a deeply respectful, learned Marathi scholar and spiritual guide specializing in Sant Dnyaneshwar Maharaj's 'Dnyaneshwari' (ज्ञानेश्वरी) - the revered 13th-century Marathi commentary on the Bhagavad Gita.
Your mission is to provide authentic, heartwarming, and profound explanations of Dnyaneshwari verses (ओवी), Marathi Bhavarth (भावार्थ), and spiritual wisdom.

Guidelines:
1. Always maintain deep reverence for Sant Dnyaneshwar Maharaj (ज्ञानेश्वर माऊली).
2. Respond clearly with structured sections:
   - **मराठी भावार्थ व चिंतन** (Detailed spiritual explanation in lucid Marathi)
   - **English Summary & Practical Guidance** (Modern application of this wisdom in daily life)
   - **Key Spiritual Takeaways** (3 bullet points)
3. If requested to answer a general life question (e.g. stress, mind control, devotion, karma), cite relevant concepts/Ovis from Dnyaneshwari (such as Chapter 2 Sthitaprajna, Chapter 6 Abhyasa Yoga, Chapter 9 Bhakti, Chapter 12 Bhakta Lakshana, or Pasayadan).
4. Keep the tone compassionate, uplifting, serene, and scholarly.`;

    let userPrompt = "";

    if (mode === "explain-ovi" && verseContext) {
      userPrompt = `Please explain the following Dnyaneshwari Ovi in detail:
Chapter: ${verseContext.chapterTitle} (Adhyay ${verseContext.chapterNumber})
Ovi Reference: ${verseContext.oviNumber}
Original Ovi: "${verseContext.originalMarathi}"
Marathi Bhavarth: "${verseContext.marathiBhavarth}"
English Translation: "${verseContext.englishTranslation}"

User's specific query/focus: ${question || "Explain the deeper spiritual nectar, philosophical significance, and practical daily life application of this Ovi."}`;
    } else {
      userPrompt = `User's Question about Dnyaneshwari / Life Guidance:
"${question}"

${verseContext ? `Context Verse: Adhyay ${verseContext.chapterNumber}, Ovi ${verseContext.oviNumber}` : ""}

Please guide the user according to the philosophy of Sant Dnyaneshwar Maharaj in Dnyaneshwari. Provide both Marathi and English insights.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "क्षमस्व, प्रतिसादाची प्रक्रिया पूर्ण होऊ शकली नाही. कृपया पुन्हा प्रयत्न करा.";

    return res.json({
      answer: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Gemini API Error in /api/ai-explain:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while generating spiritual explanation.",
    });
  }
});

// AI Ovi Content Generation Endpoint (structured: bhavarth, english, bodh) - Using OpenAI
app.post("/api/generate-ovi-content", async (req, res) => {
  try {
    const { originalMarathi, chapterNumber, oviNumber } = req.body;

    if (!originalMarathi) {
      return res.status(400).json({ error: "originalMarathi is required." });
    }

    const openai = getOpenAI();

    const systemInstruction = `You are a deeply learned Marathi scholar specializing in Sant Dnyaneshwar Maharaj's 'Dnyaneshwari' (ज्ञानेश्वरी) - the revered 13th-century Marathi commentary on the Bhagavad Gita.

Your task is to provide three pieces of content for a given Dnyaneshwari verse (ovi):

1. **marathiBhavarth**: A clear, authentic Marathi explanation (भावार्थ) of the ovi. Write in simple, beautiful Marathi prose (2-4 sentences). Explain what Sant Dnyaneshwar is conveying.
2. **englishTranslation**: A faithful English translation/meaning of the ovi (2-3 sentences). Capture the essence accurately.
3. **spiritualInsight**: The गूढ अर्थ व बोध (hidden spiritual meaning and practical life lesson) in English (2-3 sentences). What deeper wisdom or life guidance does this verse offer?

CRITICAL RULES:
- Maintain deep reverence for Sant Dnyaneshwar Maharaj.
- Be authentic and scholarly. Do NOT hallucinate or fabricate meanings.
- If the verse is a simple connecting verse, still provide meaningful context.
- Respond ONLY with valid JSON in this exact format (no markdown, no code fences):
{"marathiBhavarth": "...", "englishTranslation": "...", "spiritualInsight": "..."}`;

    const userPrompt = `Dnyaneshwari Adhyay ${chapterNumber}, Ovi ${oviNumber}:
"${originalMarathi}"

Provide marathiBhavarth, englishTranslation, and spiritualInsight for this ovi.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.4,
      max_tokens: 500,
    });

    const rawText = response.choices[0]?.message?.content || "";

    // Try to parse JSON from the response
    let parsed: { marathiBhavarth?: string; englishTranslation?: string; spiritualInsight?: string } = {};
    try {
      // Strip markdown code fences if present
      const jsonStr = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      // Fallback: return raw text as bhavarth
      parsed = {
        marathiBhavarth: rawText,
        englishTranslation: "",
        spiritualInsight: "",
      };
    }

    return res.json({
      marathiBhavarth: parsed.marathiBhavarth || "",
      englishTranslation: parsed.englishTranslation || "",
      spiritualInsight: parsed.spiritualInsight || "",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("OpenAI API Error in /api/generate-ovi-content:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while generating ovi content.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Marathi Dnyaneshwari server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
