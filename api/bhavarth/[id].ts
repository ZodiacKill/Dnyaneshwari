import { VercelRequest, VercelResponse } from "@vercel/node";
import { getOviContent } from "../../src/database/kvStore";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "oviId is required" });
  }

  const content = await getOviContent(id);

  if (req.method === "HEAD") {
    return content ? res.status(200).end() : res.status(404).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!content) {
    return res.status(404).json({ error: "Content not found" });
  }

  return res.json(content);
}