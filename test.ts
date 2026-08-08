import dotenv from "dotenv";
import { generateGeminiContent } from "./src/services/geminiService.js";

dotenv.config();

async function run() {
  try {
    const res = await generateGeminiContent({
      prompt: "Reply with the exact word 'Working'",
      model: "gemini-3.1-flash-lite"
    });
    console.log("Success:", res);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
