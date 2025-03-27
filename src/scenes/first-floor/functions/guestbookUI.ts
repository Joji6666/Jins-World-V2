import { Timestamp } from "firebase/firestore";
import { addMessage, displayMessages } from "../../../guestbook";

const formatTimestamp = (timestamp: Timestamp): string => {
  if (!timestamp || !timestamp.toDate) return "";

  const date = timestamp.toDate(); // Firebase Timestamp → JS Date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export const createGuestbookUI = (scene: Phaser.Scene) => {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "30px";
  container.style.left = "30px";
  container.style.zIndex = "1000";
  container.style.background = "#f5f0e6";
  container.style.border = "2px solid #8b5e3c";
  container.style.padding = "20px";
  container.style.borderRadius = "10px";
  container.style.color = "#4b382a";
  container.style.width = "650px";
  container.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";

  const title = document.createElement("h3");
  title.innerText = "📝 방명록";
  title.style.marginTop = "0";
  title.style.color = "#4b382a";

  const nameInput = document.createElement("input");
  nameInput.placeholder = "이름";
  nameInput.style.width = "96%";
  nameInput.style.padding = "8px";
  nameInput.style.marginBottom = "10px";
  nameInput.style.border = "1px solid #8b5e3c";
  nameInput.style.borderRadius = "4px";
  nameInput.style.background = "#fff";

  const messageInput = document.createElement("textarea");
  messageInput.placeholder = "메시지";
  messageInput.style.width = "96%";
  messageInput.style.height = "120px";
  messageInput.style.padding = "8px";
  messageInput.style.marginBottom = "10px";
  messageInput.style.border = "1px solid #8b5e3c";
  messageInput.style.borderRadius = "4px";
  messageInput.style.background = "#fff";

  const submitButton = document.createElement("button");
  submitButton.innerText = "방명록 남기기";
  submitButton.style.padding = "8px 16px";
  submitButton.style.background = "#8b5e3c";
  submitButton.style.color = "#fff";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "4px";
  submitButton.style.cursor = "pointer";
  submitButton.style.marginRight = "10px";

  const closeButton = document.createElement("button");
  closeButton.innerText = "닫기";
  closeButton.style.padding = "8px 16px";
  closeButton.style.background = "#aaa";
  closeButton.style.color = "#fff";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "4px";
  closeButton.style.cursor = "pointer";

  const messageList = document.createElement("div");
  messageList.style.height = "500px";
  messageList.style.overflowY = "auto";
  messageList.style.background = "#ffffff";
  messageList.style.border = "1px solid #ccc";
  messageList.style.padding = "10px";
  messageList.style.borderRadius = "4px";
  messageList.style.marginTop = "15px";
  messageList.style.fontSize = "14px";

  let lastSubmitTime = 0;
  submitButton.onclick = async () => {
    const now = Date.now();
    if (now - lastSubmitTime < 3000) {
      alert("너무 빠르게 보내고 있어요. 잠시만 기다려주세요.");
      return;
    }

    if (nameInput.value && messageInput.value) {
      if (messageInput.value.length > 200) {
        alert("메시지는 200자 이내로 작성해주세요.");
        return;
      }

      await addMessage(nameInput.value, messageInput.value);
      messageInput.value = "";
      lastSubmitTime = now;
    } else {
      alert("이름과 메시지를 모두 입력해주세요.");
    }
  };

  displayMessages((messages) => {
    messageList.innerHTML = "";

    messages.forEach((msg) => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.width = "100%";
      row.style.marginBottom = "8px";
      row.style.borderBottom = "1px solid #eee";
      row.style.paddingBottom = "5px";

      const nameEl = document.createElement("div");
      nameEl.innerText = msg.name;
      nameEl.style.fontWeight = "bold";
      nameEl.style.width = "15%";
      nameEl.style.color = "#4b382a";

      const messageEl = document.createElement("div");
      messageEl.innerText = msg.message;
      messageEl.style.width = "55%";
      messageEl.style.padding = "0 8px";
      messageEl.style.color = "#4b382a";

      const timeEl = document.createElement("div");
      timeEl.innerText = formatTimestamp(msg.timestamp);
      timeEl.style.width = "30%";
      timeEl.style.fontSize = "12px";
      timeEl.style.color = "#999";
      timeEl.style.fontFamily = "monospace";
      timeEl.style.fontFeatureSettings = '"tnum"';
      timeEl.style.textAlign = "right";

      row.appendChild(nameEl);
      row.appendChild(messageEl);
      row.appendChild(timeEl);
      messageList.appendChild(row);
    });
  });

  closeButton.onclick = () => {
    container.remove();
  };

  container.appendChild(title);
  container.appendChild(nameInput);
  container.appendChild(messageInput);
  container.appendChild(submitButton);
  container.appendChild(closeButton);
  container.appendChild(messageList);

  document.body.appendChild(container);

  scene.events.on("shutdown", () => {
    container.remove();
  });
};
