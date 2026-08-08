/**
 * geminiService.ts
 * ---------------------------------------------------------------------------
 * Server-side client for the Gemini Developer API (Google AI Studio).
 *
 * Security rules enforced here:
 *  - Authenticates ONLY with the Gemini API key (never OAuth / Bearer tokens).
 *  - The key is read from process.env.GEMINI_API_KEY and sent via the
 *    `x-goog-api-key` header (or `?key=` query param). `Authorization` is
 *    NEVER used, so no Firebase / Google Sign-In token can leak into a request.
 *  - The key is never written to logs or returned to the frontend.
 * ---------------------------------------------------------------------------
 */

import { GoogleGenAI } from "@google/genai";

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

export interface GeminiGenerateOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  responseMimeType?: "application/json";
  model?: string;
}

export class GeminiApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = "GeminiApiError";
    this.status = status;
    this.code = code;
  }
}

function getApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    throw new GeminiApiError(
      "GEMINI_API_KEY is not set. Add it to .env or the server environment.",
      500,
      "MISSING_API_KEY"
    );
  }
  return apiKey.trim();
}

export async function generateGeminiContent(
  options: GeminiGenerateOptions
): Promise<string> {
  const apiKey = getApiKey();
  const model = options.model || DEFAULT_MODEL;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model,
      contents: options.prompt,
      config: {
        systemInstruction: options.systemInstruction,
        temperature: options.temperature ?? 0.7,
        responseMimeType: options.responseMimeType,
      },
    });

    if (!response.text) {
      throw new GeminiApiError("Empty response from AI", 500, "EMPTY_RESPONSE");
    }

    return response.text.trim();
  } catch (error: any) {
    console.error("Gemini API Error:", error.message || error);

    // Map SDK errors
    const status = error?.status || 500;
    const messages: Record<number, string> = {
      400: "Invalid request sent to the AI service. Please rephrase your question and try again.",
      401: "AI authentication failed. The Gemini API key is missing or invalid.",
      403: "Access to the AI service is forbidden. The API key may be restricted.",
      404: "The requested AI model was not found. Please try again later.",
      429: "The AI service is busy (rate limit reached). Please wait a moment and try again.",
      500: "The AI service encountered an internal error. Please try again later.",
    };

    throw new GeminiApiError(
      messages[status] || "The AI service returned an unexpected error.",
      status,
      error?.code
    );
  }
}
