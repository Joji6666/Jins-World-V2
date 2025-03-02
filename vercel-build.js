import { google } from "googleapis";
import path from "path";
import fs from "fs";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_DRIVE_KEY || "{}"),
  scopes: ["https://www.googleapis.com/auth/drive.readonly"]
});
const drive = google.drive({ version: "v3", auth });

async function downloadFromDrive(fileName, localPath) {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const response = await drive.files.list({
    q: `'${folderId}' in parents and name = '${fileName}'`,
    fields: "files(id, name)"
  });

  if (!response.data.files || response.data.files.length === 0) {
    throw new Error(`❌ 파일을 찾을 수 없습니다: ${fileName}`);
  }

  const fileId = response.data.files[0].id;
  const dest = fs.createWriteStream(localPath);

  await drive.files
    .get({ fileId, alt: "media" }, { responseType: "stream" })
    .then((res) => {
      res.data.pipe(dest);
    });

  console.log(`✅ 다운로드 완료: ${fileName} -> ${localPath}`);
}

// `assets/` 폴더에 필요한 파일 목록 추가
const filesToDownload = ["test.png", "logo.png", "monster1.png"];

(async () => {
  for (const fileName of filesToDownload) {
    const localPath = path.join("vercel-build-output/static/assets", fileName);
    await downloadFromDrive(fileName, localPath);
  }
  console.log("🚀 모든 에셋 다운로드 완료!");
})();
