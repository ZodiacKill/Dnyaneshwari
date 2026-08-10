import { VercelRequest, VercelResponse } from "@vercel/node";
import { getOviContent } from "../../lib/kvStore.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  if (req.method !== "HEAD" && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "oviId is required" });
  }

  const exists = !!(await getOviContent(id));
  return exists ? res.status(200).end() : res.status(404).end();
}