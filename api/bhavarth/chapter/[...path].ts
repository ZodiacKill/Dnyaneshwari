import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  buildOviId,
  getOviContent,
} from "../../../src/database/kvStore";

/**
 * Handles /api/bhavarth/chapter/:chapterNumber/ovi/:oviNumber
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const path = req.query.path;
  if (!Array.isArray(path) || path.length < 3 || path[1] !== "ovi") {
    return res.status(400).json({ error: "Invalid route. Expected /chapter/{n}/ovi/{n}" });
  }

  const chapterNumber = Number(path[0]);
  const oviNumber = Number(path[2]);

  if (!Number.isInteger(chapterNumber) || !Number.isInteger(oviNumber)) {
    return res.status(400).json({ error: "chapterNumber and oviNumber must be integers" });
  }

  const oviId = buildOviId(chapterNumber, oviNumber);
  const content = await getOviContent(oviId);

  if (!content) {
    return res.status(404).json({ error: "Content not found" });
  }

  return res.json(content);
}