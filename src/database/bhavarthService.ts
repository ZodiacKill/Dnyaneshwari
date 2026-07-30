import { db } from './database';

export interface BhavarthContent {
  id?: number;
  ovi_id: string;
  chapter_number: number;
  ovi_number: number;
  original_marathi: string;
  marathi_bhavarth?: string;
  english_translation?: string;
  spiritual_insight?: string;
  ai_provider?: string;
  access_count?: number;
  created_at?: string;
  updated_at?: string;
  is_generated?: boolean;
}

export interface BhavarthStats {
  total_content?: number;
  total_accesses?: number;
  openai_content?: number;
  gemini_content?: number;
  latest_content?: string;
}

/**
 * Check if bhavarth content exists for a specific ovi
 */
export function contentExists(oviId: string): boolean {
  try {
    const stmt = db.prepare('SELECT 1 FROM bhavarth_content WHERE ovi_id = ?');
    const result = stmt.get(oviId);
    return !!result;
  } catch (error) {
    console.error('Error checking content existence:', error);
    return false;
  }
}

/**
 * Check if bhavarth content exists by chapter and ovi number
 */
export function contentExistsByChapterOvi(chapterNumber: number, oviNumber: number): boolean {
  try {
    const stmt = db.prepare('SELECT 1 FROM bhavarth_content WHERE chapter_number = ? AND ovi_number = ?');
    const result = stmt.get(chapterNumber, oviNumber);
    return !!result;
  } catch (error) {
    console.error('Error checking content existence by chapter/ovi:', error);
    return false;
  }
}

/**
 * Get bhavarth content by ovi ID
 */
export function getBhavarthContentByOviId(oviId: string): BhavarthContent | null {
  try {
    const stmt = db.prepare(`
      SELECT * FROM bhavarth_content 
      WHERE ovi_id = ?
    `);
    const result = stmt.get(oviId) as BhavarthContent;
    
    if (result) {
      // Increment access count
      incrementAccessCount(oviId);
    }
    
    return result || null;
  } catch (error) {
    console.error('Error getting bhavarth content by ovi ID:', error);
    return null;
  }
}

/**
 * Get bhavarth content by chapter and ovi number
 */
export function getBhavarthContentByChapterOvi(chapterNumber: number, oviNumber: number): BhavarthContent | null {
  try {
    const stmt = db.prepare(`
      SELECT * FROM bhavarth_content 
      WHERE chapter_number = ? AND ovi_number = ?
    `);
    const result = stmt.get(chapterNumber, oviNumber) as BhavarthContent;
    
    if (result) {
      // Increment access count
      incrementAccessCount(result.ovi_id!);
    }
    
    return result || null;
  } catch (error) {
    console.error('Error getting bhavarth content by chapter/ovi:', error);
    return null;
  }
}

/**
 * Create new bhavarth content
 */
export function createBhavarthContent(content: Omit<BhavarthContent, 'id' | 'created_at' | 'updated_at' | 'access_count'>): BhavarthContent | null {
  try {
    const stmt = db.prepare(`
      INSERT INTO bhavarth_content (
        ovi_id, chapter_number, ovi_number, original_marathi,
        marathi_bhavarth, english_translation, spiritual_insight,
        ai_provider, is_generated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      content.ovi_id,
      content.chapter_number,
      content.ovi_number,
      content.original_marathi,
      content.marathi_bhavarth,
      content.english_translation,
      content.spiritual_insight,
      content.ai_provider || 'openai',
      content.is_generated || false
    );
    
    return getBhavarthContentByOviId(content.ovi_id);
  } catch (error) {
    console.error('Error creating bhavarth content:', error);
    return null;
  }
}

/**
 * Update existing bhavarth content
 */
export function updateBhavarthContent(oviId: string, updates: Partial<BhavarthContent>): BhavarthContent | null {
  try {
    const fields = Object.keys(updates).filter(key => key !== 'id' && key !== 'ovi_id' && key !== 'created_at');
    const values = fields.map(field => updates[field as keyof BhavarthContent]);
    
    if (fields.length === 0) {
      return getBhavarthContentByOviId(oviId);
    }
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const stmt = db.prepare(`
      UPDATE bhavarth_content 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE ovi_id = ?
    `);
    
    stmt.run([...values, oviId]);
    
    return getBhavarthContentByOviId(oviId);
  } catch (error) {
    console.error('Error updating bhavarth content:', error);
    return null;
  }
}

/**
 * Increment access count for bhavarth content
 */
export function incrementAccessCount(oviId: string): boolean {
  try {
    const stmt = db.prepare(`
      UPDATE bhavarth_content 
      SET access_count = access_count + 1, updated_at = CURRENT_TIMESTAMP 
      WHERE ovi_id = ?
    `);
    const result = stmt.run(oviId);
    return result.changes > 0;
  } catch (error) {
    console.error('Error incrementing access count:', error);
    return false;
  }
}

/**
 * Get database statistics
 */
export function getBhavarthStats(): BhavarthStats | null {
  try {
    return db.prepare(`
      SELECT 
        COUNT(*) as total_content,
        SUM(access_count) as total_accesses,
        COUNT(CASE WHEN ai_provider = 'openai' THEN 1 END) as openai_content,
        COUNT(CASE WHEN ai_provider = 'gemini' THEN 1 END) as gemini_content,
        MAX(created_at) as latest_content
      FROM bhavarth_content
    `).get() as BhavarthStats;
  } catch (error) {
    console.error('Error getting bhavarth stats:', error);
    return null;
  }
}

/**
 * Get all bhavarth content (for admin purposes)
 */
export function getAllBhavarthContent(): BhavarthContent[] {
  try {
    const stmt = db.prepare(`
      SELECT * FROM bhavarth_content 
      ORDER BY chapter_number, ovi_number
    `);
    return stmt.all() as BhavarthContent[];
  } catch (error) {
    console.error('Error getting all bhavarth content:', error);
    return [];
  }
}

/**
 * Delete bhavarth content (for admin purposes)
 */
export function deleteBhavarthContent(oviId: string): boolean {
  try {
    const stmt = db.prepare('DELETE FROM bhavarth_content WHERE ovi_id = ?');
    const result = stmt.run(oviId);
    return result.changes > 0;
  } catch (error) {
    console.error('Error deleting bhavarth content:', error);
    return false;
  }
}