/**
 * OVI Content Service
 * Generates and caches Marathi Bhavarth, English Translation, and 
 * Gudh Arth & Bodh for each ovi using the Gemini AI API.
 * Results are cached in localStorage so each ovi is only generated once.
 */

const CACHE_PREFIX = "ovi_content_";
const CACHE_VERSION = "v1";

export interface OviGeneratedContent {
  marathiBhavarth: string;
  englishTranslation: string;
  spiritualInsight: string;
  isGenerated: boolean; // true = AI-generated, false = curated/original
}

function getCacheKey(oviId: string): string {
  return `${CACHE_PREFIX}${CACHE_VERSION}_${oviId}`;
}

/**
 * Get cached content for an ovi from localStorage
 */
export function getCachedContent(oviId: string): OviGeneratedContent | null {
  try {
    const cached = localStorage.getItem(getCacheKey(oviId));
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn(`Failed to parse cached content for ovi ${oviId}:`, error);
    // Remove corrupted cache entry
    try {
      localStorage.removeItem(getCacheKey(oviId));
    } catch (removeError) {
      console.error(`Failed to remove corrupted cache for ovi ${oviId}:`, removeError);
    }
  }
  return null;
}

/**
 * Save generated content to localStorage
 */
function setCachedContent(oviId: string, content: OviGeneratedContent): void {
  try {
    localStorage.setItem(getCacheKey(oviId), JSON.stringify(content));
  } catch (error) {
    console.warn(`Failed to cache content for ovi ${oviId}:`, error);
    // Try to clear some space if localStorage is full
    try {
      // Remove oldest cache entries to free up space
      const cacheKeys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(CACHE_PREFIX)) {
          cacheKeys.push(key);
        }
      }
      // Sort by key (includes timestamp) and remove oldest entries
      cacheKeys.sort();
      const entriesToRemove = Math.min(3, cacheKeys.length);
      for (let i = 0; i < entriesToRemove; i++) {
        localStorage.removeItem(cacheKeys[i]);
      }
      
      // Retry saving after cleanup
      localStorage.setItem(getCacheKey(oviId), JSON.stringify(content));
    } catch (cleanupError) {
      console.error(`Failed to cache content for ovi ${oviId} even after cleanup:`, cleanupError);
    }
  }
}

/**
 * Check if an ovi has real curated content (not placeholder)
 */
export function hasCuratedContent(marathiBhavarth?: string, englishTranslation?: string): boolean {
  // Placeholder patterns from dnyaneshwariData.ts
  const isPlaceholderBhavarth = !marathiBhavarth || /^अध्याय \d+ मधील ओवी क्रमांक \d+\.$/.test(marathiBhavarth);
  const isPlaceholderEnglish = !englishTranslation || /^Chapter \d+, Verse \d+\.$/.test(englishTranslation);
  return !isPlaceholderBhavarth && !isPlaceholderEnglish;
}

/**
  * Generate content for an ovi via the server API with retry mechanism
  */
export async function generateOviContent(
  oviId: string,
  originalMarathi: string,
  chapterNumber: number,
  oviNumber: number,
  retryCount = 0
): Promise<OviGeneratedContent> {
  // Check cache first
  const cached = getCachedContent(oviId);
  if (cached) return cached;

  try {
    const response = await fetch("/api/generate-ovi-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalMarathi, chapterNumber, oviNumber, oviId }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to generate content (${response.status})`);
    }

    const data = await response.json();

    const content: OviGeneratedContent = {
      marathiBhavarth: data.marathiBhavarth || "",
      englishTranslation: data.englishTranslation || "",
      spiritualInsight: data.spiritualInsight || "",
      isGenerated: true,
    };

    // Cache it
    setCachedContent(oviId, content);

    return content;
  } catch (error: any) {
    // Retry on network errors or rate limits
    if (retryCount < 2 && (error.message?.includes('network') || error.message?.includes('rate') || error.message?.includes('timeout'))) {
      console.log(`Retrying content generation for ovi ${oviId} (attempt ${retryCount + 1})`);
      await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1))); // Exponential backoff
      return generateOviContent(oviId, originalMarathi, chapterNumber, oviNumber, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Check if content exists in database
 */
export async function checkContentExists(oviId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/bhavarth/${oviId}/exists`, {
      method: 'HEAD',
    });
    return response.ok;
  } catch (error) {
    console.warn('Failed to check content existence:', error);
    return false;
  }
}

/**
 * Get content from database
 */
export async function getDatabaseContent(oviId: string): Promise<OviGeneratedContent | null> {
  try {
    const response = await fetch(`/api/bhavarth/${oviId}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    
    return {
      marathiBhavarth: data.marathi_bhavarth || "",
      englishTranslation: data.english_translation || "",
      spiritualInsight: data.spiritual_insight || "",
      isGenerated: true,
    };
  } catch (error) {
    console.warn('Failed to get database content:', error);
    return null;
  }
}



/**
 * Clear all cached ovi content from localStorage
 */
export function clearAllCachedContent(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CACHE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
