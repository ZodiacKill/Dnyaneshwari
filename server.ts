import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { generateGeminiContent, GeminiApiError } from "./src/services/geminiService.js";
import { initializeDatabase } from "./src/database/database.js";
import { getBhavarthContentByOviId, createBhavarthContent, contentExists } from "./src/database/bhavarthService.js";

dotenv.config();
initializeDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Marathi Dnyaneshwari backend running (Gemini)",
  });
});

/* =====================================================
   🧘 CHINTAN AI (USES GEMINI)
===================================================== */
app.post("/api/ai-explain", async (req, res) => {
  try {
    const { question, verseContext, mode } = req.body;

    if (!question && !verseContext) {
      return res.status(400).json({
        error: "Please provide a question or verse context.",
      });
    }

    const systemInstruction = `You are a deeply respectful Marathi spiritual scholar of Sant Dnyaneshwar Maharaj's Dnyaneshwari.

Provide:
1. मराठी भावार्थ व चिंतन
2. English Summary & Practical Guidance
3. Key Spiritual Takeaways (3 points)

Tone: Compassionate, devotional, scholarly.`;

    let userPrompt = "";

    if (mode === "explain-ovi" && verseContext) {
      userPrompt = `Explain this Dnyaneshwari Ovi:

Adhyay ${verseContext.chapterNumber}
Ovi ${verseContext.oviNumber}

"${verseContext.originalMarathi}"

Focus: ${question || "Deep meaning + life application"}`;
    } else {
      userPrompt = `User question:
"${question}"

Guide using Dnyaneshwari philosophy.`;
    }

    const text = await generateGeminiContent({
      prompt: userPrompt,
      systemInstruction,
      temperature: 0.7,
    });

    return res.json({
      answer: text,
      provider: "gemini",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof GeminiApiError) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Gemini Error:", error);
    return res.status(500).json({
      error: "Gemini failed",
    });
  }
});

/* =====================================================
   🤖 OVI CONTENT GENERATION & DATABASE
===================================================== */
app.head("/api/bhavarth/:oviId/exists", (req, res) => {
  const exists = contentExists(req.params.oviId);
  if (exists) {
    return res.status(200).end();
  }
  return res.status(404).end();
});

app.get("/api/bhavarth/:oviId", (req, res) => {
  const content = getBhavarthContentByOviId(req.params.oviId);
  if (content) {
    return res.json(content);
  }
  return res.status(404).json({ error: "Content not found" });
});

app.post("/api/generate-ovi-content", async (req, res) => {
  try {
    const { originalMarathi, chapterNumber, oviNumber } = req.body;

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

    const { oviId } = req.body;
    if (oviId) {
      createBhavarthContent({
        ovi_id: oviId,
        chapter_number: chapterNumber,
        ovi_number: oviNumber,
        original_marathi: originalMarathi,
        marathi_bhavarth: parsed.marathiBhavarth,
        english_translation: parsed.englishTranslation,
        spiritual_insight: parsed.spiritualInsight,
        ai_provider: "gemini",
        is_generated: true
      });
    }

    return res.json({
      ...parsed,
      provider: "gemini",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof GeminiApiError) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Gemini Error:", error);
    return res.status(500).json({
      error: "Gemini failed",
    });
  }
});

/* =========================
   SERVER START
========================= */
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer } = await import("vite");
    const vite = await createServer({
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
    console.log(`Server running at http://localhost:${PORT}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      const newPort = PORT + 1;
      console.warn(`Port ${PORT} in use, switching to ${newPort}`);
      app.listen(newPort, "0.0.0.0", () => {
        console.log(`Server running at http://localhost:${newPort}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer();
