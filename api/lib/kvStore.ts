/**
 * kvStore.ts
 * ---------------------------------------------------------------------------
 * Shared storage layer for AI-generated Ovi content on serverless platforms.
 *
 * Persistence priority:
 *  1. Vercel KV / Upstash Redis  (KV_REST_API_URL + KV_REST_API_TOKEN, or
 *                                  UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 *  2. In-memory Map fallback     (per-instance only, not persistent)
 *
 * Records are keyed by ovi id (e.g. "2.1") as "ovi:<id>" and stored as JSON.
 * ---------------------------------------------------------------------------
 */

import { createClient } from "@vercel/kv";
import type { VercelKV } from "@vercel/kv";

export interface StoredOviContent {
  ovi_id: string;
  chapter_number: number;
  ovi_number: number;
  original_marathi: string;
  marathi_bhavarth: string;
  english_translation: string;
  spiritual_insight: string;
  ai_provider: string;
  is_generated: boolean;
  created_at?: string;
}

const kvUrl =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const kvToken =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  "";

const USE_PERSISTENT_KV = !!(kvUrl && kvToken);

let kv: VercelKV | null = null;
if (USE_PERSISTENT_KV) {
  try {
    kv = createClient({ url: kvUrl, token: kvToken });
  } catch (error) {
    console.error("Failed to initialize KV client:", error);
    kv = null;
  }
}

/** Falls back to a per-instance in-memory store when no KV is configured. */
const memoryStore = new Map<string, StoredOviContent>();

export function isStoragePersistent(): boolean {
  return USE_PERSISTENT_KV && !!kv;
}

function toKey(oviId: string): string {
  return `ovi:${oviId}`;
}

export async function getOviContent(
  oviId: string
): Promise<StoredOviContent | null> {
  const key = toKey(oviId);
  if (kv) {
    try {
      const data = await kv.get<StoredOviContent>(key);
      return data || null;
    } catch (error) {
      console.warn(`KV get failed for ${key}:`, error);
    }
  }
  return memoryStore.get(key) || null;
}

export async function saveOviContent(
  oviId: string,
  content: StoredOviContent
): Promise<void> {
  const key = toKey(oviId);
  if (kv) {
    try {
      await kv.set(key, content);
      return;
    } catch (error) {
      console.warn(`KV set failed for ${key}:`, error);
    }
  }
  memoryStore.set(key, content);
}

/** Compute ovi id from chapter/ovi numbers, matching the client data format. */
export function buildOviId(chapterNumber: number, oviNumber: number): string {
  return `${chapterNumber}.${oviNumber}`;
}