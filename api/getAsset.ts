import { VercelRequest, VercelResponse } from "@vercel/node";
import path from "path";
import fs from "fs";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const name = req.query.name as string;

  if (!name) {
    return res.status(400).json({ error: "파일명이 필요합니다." });
  }

  const filePath = path.join(process.cwd(), "vercel-assets", name);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "파일을 찾을 수 없습니다." });
  }

  res.setHeader("Content-Type", "image/png");
  fs.createReadStream(filePath).pipe(res);
}
