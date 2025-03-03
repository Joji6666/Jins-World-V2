import { google } from "googleapis";
import path from "path";
import fs from "fs/promises"; // fs의 Promise 버전 사용

// ✅ Google Drive API 인증 설정
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_DRIVE_KEY || "{}"),
  scopes: ["https://www.googleapis.com/auth/drive.readonly"]
});
const drive = google.drive({ version: "v3", auth });

const response = await drive.files.list({
  q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents`,
  fields: "files(id, name)",
  pageSize: 10
});
console.log("📂 폴더 내 파일 목록:", response.data.files);

/**
 *
 * 🔹 특정 폴더의 모든 파일 & 서브폴더 리스트 가져오기
 */
async function listFilesAndFolders(folderId) {
  let files = [];
  let folders = [];
  let nextPageToken = null;

  do {
    const response = await drive.files.list({
      q: `'${folderId}' in parents`, // 특정 폴더 내 검색
      fields: "nextPageToken, files(id, name, mimeType)", // 파일과 폴더 구분 필요
      pageSize: 1000,
      pageToken: nextPageToken
    });

    if (response.data.files) {
      response.data.files.forEach((file) => {
        if (file.mimeType === "application/vnd.google-apps.folder") {
          folders.push(file); // 폴더 리스트 저장
        } else {
          files.push(file); // 파일 리스트 저장
        }
      });
    }

    nextPageToken = response.data.nextPageToken;
  } while (nextPageToken);

  return { files, folders };
}

/**
 * 🔹 Google Drive에서 파일 다운로드 (폴더 구조 유지)
 */
async function downloadFile(fileId, fileName, localPath) {
  await fs.mkdir(path.dirname(localPath), { recursive: true }); // 폴더 없으면 생성
  const dest = await fs.open(localPath, "w");

  await drive.files
    .get({ fileId, alt: "media" }, { responseType: "stream" })
    .then((res) => {
      res.data.pipe(dest.createWriteStream());
    });

  console.log(`✅ 다운로드 완료: ${fileName} -> ${localPath}`);
}

/**
 * 🔹 폴더 구조 유지하면서 모든 파일 다운로드
 */
async function downloadFolder(
  folderId,
  parentPath = "vercel-build-output/static/assets"
) {
  console.log(`📂 폴더 탐색 시작: ${folderId}`);

  const { files, folders } = await listFilesAndFolders(folderId);

  // ✅ 현재 폴더 내 파일 다운로드
  for (const file of files) {
    const localPath = path.join(parentPath, file.name);
    await downloadFile(file.id, file.name, localPath);
  }

  // ✅ 하위 폴더도 재귀적으로 다운로드
  for (const folder of folders) {
    const newFolderPath = path.join(parentPath, folder.name); // 폴더 경로 유지
    await downloadFolder(folder.id, newFolderPath);
  }
}

// 🔹 메인 실행 로직
(async () => {
  const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!rootFolderId) {
    throw new Error("❌ GOOGLE_DRIVE_FOLDER_ID가 설정되지 않았습니다!");
  }

  console.log("📥 Google Drive 폴더 다운로드 시작...");
  await downloadFolder(rootFolderId);
  console.log("🚀 모든 파일 다운로드 완료!");
})();
