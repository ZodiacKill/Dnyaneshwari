import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import dotenv from "dotenv";
import { initializeDatabase } from "./src/database/database";
import { 
  getBhavarthContentByOviId, 
  getBhavarthContentByChapterOvi, 
  createBhavarthContent, 
  contentExists,
  contentExistsByChapterOvi,
  getBhavarthStats 
} from "./src/database/bhavarthService";

dotenv.config();

// Fix for CommonJS build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize database
initializeDatabase();

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

// Database APIs
app.get("/api/bhavarth/:oviId", (req, res) => {
  try {
    const { oviId } = req.params;
    const content = getBhavarthContentByOviId(oviId);
    
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }
    
    res.json(content);
  } catch (error: any) {
    console.error("Error getting bhavarth content:", error);
    res.status(500).json({ error: error.message || "Failed to get content" });
  }
});

app.get("/api/bhavarth/chapter/:chapterNumber/ovi/:oviNumber", (req, res) => {
  try {
    const { chapterNumber, oviNumber } = req.params;
    const content = getBhavarthContentByChapterOvi(parseInt(chapterNumber), parseInt(oviNumber));
    
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }
    
    res.json(content);
  } catch (error: any) {
    console.error("Error getting bhavarth content:", error);
    res.status(500).json({ error: error.message || "Failed to get content" });
  }
});

app.head("/api/bhavarth/:oviId/exists", (req, res) => {
  try {
    const { oviId } = req.params;
    const exists = contentExists(oviId);
    res.status(exists ? 200 : 404).end();
  } catch (error: any) {
    console.error("Error checking content existence:", error);
    res.status(500).end();
  }
});

app.get("/api/bhavarth/stats", (req, res) => {
  try {
    const stats = getBhavarthStats();
    res.json(stats || {});
  } catch (error: any) {
    console.error("Error getting bhavarth stats:", error);
    res.status(500).json({ error: error.message || "Failed to get stats" });
  }
});

// AI Spiritual Chintan & Q&A Endpoint
app.post("/api/ai-explain", async (req, res) => {
  try {
    const { question, verseContext, mode } = req.body;

    console.log("AI Chintan Request:", { question, mode, verseContext });

    if (!question && !verseContext) {
      return res.status(400).json({ error: "Please provide a question or verse context." });
    }

    try {
      const ai = getGeminiAI();
      console.log("Gemini AI initialized successfully");

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
      
      console.log("AI Response generated successfully:", text);

      return res.json({
        answer: text,
        timestamp: new Date().toISOString(),
      });
    } catch (aiError: any) {
      console.error("Gemini AI Error in /api/ai-explain:", aiError);
      return res.status(500).json({
        error: `AI service error: ${aiError.message || "Unknown error occurred"}`
      });
    }
  } catch (error: any) {
    console.error("Gemini API Error in /api/ai-explain:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while generating spiritual explanation.",
    });
  }
});

// AI Ovi Content Generation Endpoint (structured: bhavarth, english, bodh) - Using OpenAI with fallback to Gemini
app.post("/api/generate-ovi-content", async (req, res) => {
  try {
    const { originalMarathi, chapterNumber, oviNumber } = req.body;

    if (!originalMarathi) {
      return res.status(400).json({ error: "originalMarathi is required." });
    }

    // Generate ovi_id for database lookup
    const oviId = `chapter${chapterNumber}_ovi${oviNumber}`;

    // Check if content already exists in database
    const existingContent = getBhavarthContentByOviId(oviId);
    if (existingContent) {
      return res.json({
        marathiBhavarth: existingContent.marathi_bhavarth || "",
        englishTranslation: existingContent.english_translation || "",
        spiritualInsight: existingContent.spiritual_insight || "",
        timestamp: new Date().toISOString(),
        fromDatabase: true,
        aiProvider: existingContent.ai_provider,
      });
    }

    let parsed: { marathiBhavarth?: string; englishTranslation?: string; spiritualInsight?: string } = {};
    let aiProvider = 'openai';
    let generationError = null;

    try {
      // Try OpenAI first
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
    } catch (openaiError: any) {
      console.warn("OpenAI API failed, falling back to Gemini:", openaiError.message);
      aiProvider = 'gemini';
      generationError = openaiError.message;
      
      // Fallback to Gemini
      try {
        const gemini = getGeminiAI();
        
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

        const response = await gemini.models.generateContent({
          model: "gemini-3.6-flash",
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.4,
          },
        });

        const rawText = (response.text || "").trim();

        // Try to parse JSON from the response
        try {
          const jsonStr = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
          parsed = JSON.parse(jsonStr);
        } catch {
          parsed = {
            marathiBhavarth: rawText,
            englishTranslation: "",
            spiritualInsight: "",
          };
        }
      } catch (geminiError: any) {
        console.error("Gemini API Error in fallback:", geminiError);
        throw new Error(`Both OpenAI and Gemini APIs failed. OpenAI: ${generationError}, Gemini: ${geminiError.message}`);
      }
    }

    // Store the generated content in database
    const dbContent = createBhavarthContent({
      ovi_id: oviId,
      chapter_number: chapterNumber,
      ovi_number: oviNumber,
      original_marathi: originalMarathi,
      marathi_bhavarth: parsed.marathiBhavarth || "",
      english_translation: parsed.englishTranslation || "",
      spiritual_insight: parsed.spiritualInsight || "",
      ai_provider: aiProvider,
      is_generated: true,
    });

    if (!dbContent) {
      console.warn("Failed to store content in database");
    }

    return res.json({
      marathiBhavarth: parsed.marathiBhavarth || "",
      englishTranslation: parsed.englishTranslation || "",
      spiritualInsight: parsed.spiritualInsight || "",
      timestamp: new Date().toISOString(),
      aiProvider: aiProvider,
      fromDatabase: false,
      ...(generationError && { warning: `Used ${aiProvider} as fallback due to: ${generationError}` })
    });
  } catch (error: any) {
    console.error("AI API Error in /api/generate-ovi-content:", error);
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

  app.listen(PORT, "127.0.0.1", () => {
    console.log(`Marathi Dnyaneshwari server listening on http://127.0.0.1:${PORT}`);
  });
}

startServer();
