import { VercelRequest, VercelResponse } from "@vercel/node";
import path from "path";
import fs from "fs";

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log("🚀 [API 호출됨] 요청 URL:", req.url);
  console.log("📂 요청된 파일:", req.query.name);
  try {
    const name = req.query.name as string;
    if (!name) {
      return res.status(400).json({ error: "파일명이 필요합니다." });
    }

    const filePath = path.join(process.cwd(), "vercel-assets", name);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "파일을 찾을 수 없습니다." });
    }

    // 파일 확장자에 따라 Content-Type 설정
    const ext = path.extname(name).toLowerCase();
    const contentTypeMap: { [key: string]: string } = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".json": "application/json",
      ".svg": "image/svg+xml"
    };
    const contentType = contentTypeMap[ext] || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error("파일 제공 중 오류 발생:", error);
    res.status(500).json({ error: "서버 내부 오류 발생" });
  }
}
