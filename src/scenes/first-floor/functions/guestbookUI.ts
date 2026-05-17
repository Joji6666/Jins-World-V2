import { DocumentData, Timestamp } from "firebase/firestore";
import { addMessage, getAllMessages } from "../../../guestbook";
import {
  getMobileGameAreaHeight,
  isMobileGameboyMode
} from "../../../shared/mobile/mobileGameboyController";

const formatTimestamp = (timestamp: Timestamp): string => {
  if (!timestamp || !timestamp.toDate) return "";

  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export const createGuestbookUI = (scene: Phaser.Scene) => {
  const isMobile = isMobileGameboyMode();
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = isMobile ? "8px" : "30px";
  container.style.left = isMobile ? "8px" : "30px";
  container.style.zIndex = "1000";
  container.style.background = "#f5f0e6";
  container.style.border = "2px solid #8b5e3c";
  container.style.padding = isMobile ? "14px" : "20px";
  container.style.borderRadius = "10px";
  container.style.color = "#4b382a";
  container.style.width = isMobile ? "calc(100vw - 16px)" : "650px";
  container.style.maxWidth = "650px";
  container.style.maxHeight = isMobile
    ? `${Math.max(320, getMobileGameAreaHeight() - 16)}px`
    : "none";
  container.style.overflowY = isMobile ? "auto" : "visible";
  container.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";

  const title = document.createElement("h3");
  title.innerText = "📝 방명록";
  title.style.marginTop = "0";
  title.style.marginBottom = isMobile ? "12px" : "";
  title.style.color = "#4b382a";
  title.style.fontSize = isMobile ? "22px" : "";

  const nameInput = document.createElement("input");
  nameInput.placeholder = "이름";
  nameInput.style.width = "100%";
  nameInput.style.padding = "8px";
  nameInput.style.marginBottom = "10px";
  nameInput.style.border = "1px solid #8b5e3c";
  nameInput.style.borderRadius = "4px";
  nameInput.style.background = "#fff";
  nameInput.style.fontSize = isMobile ? "16px" : "";

  const messageInput = document.createElement("textarea");
  messageInput.placeholder = "메시지";
  messageInput.style.width = "100%";
  messageInput.style.height = isMobile ? "88px" : "120px";
  messageInput.style.padding = "8px";
  messageInput.style.marginBottom = "10px";
  messageInput.style.border = "1px solid #8b5e3c";
  messageInput.style.borderRadius = "4px";
  messageInput.style.background = "#fff";
  messageInput.style.fontSize = isMobile ? "16px" : "";

  const submitButton = document.createElement("button");
  submitButton.innerText = "방명록 남기기";
  submitButton.style.padding = "8px 16px";
  submitButton.style.background = "#8b5e3c";
  submitButton.style.color = "#fff";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "4px";
  submitButton.style.cursor = "pointer";
  submitButton.style.marginRight = "10px";
  submitButton.style.marginBottom = isMobile ? "8px" : "";

  const closeButton = document.createElement("button");
  closeButton.innerText = "닫기";
  closeButton.style.padding = "8px 16px";
  closeButton.style.background = "#aaa";
  closeButton.style.color = "#fff";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "4px";
  closeButton.style.cursor = "pointer";

  const messageList = document.createElement("div");
  messageList.style.height = isMobile ? "120px" : "300px";
  messageList.style.overflowY = "auto";
  messageList.style.background = "#ffffff";
  messageList.style.border = "1px solid #ccc";
  messageList.style.padding = "10px";
  messageList.style.borderRadius = "4px";
  messageList.style.marginTop = "15px";
  messageList.style.fontSize = "14px";

  const pagination = document.createElement("div");
  pagination.style.display = "flex";
  pagination.style.justifyContent = "center";
  pagination.style.marginTop = "10px";
  pagination.style.gap = "6px";

  let currentPage = 1;
  const pageSize = 10;
  let allMessages: DocumentData[] = [];

  const renderMessages = (page: number) => {
    messageList.innerHTML = "";
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageMessages = allMessages.slice(start, end);

    pageMessages.forEach((msg) => {
      const row = document.createElement("div");
      row.style.display = isMobile ? "grid" : "flex";
      row.style.gridTemplateColumns = isMobile ? "78px 1fr" : "";
      row.style.width = "100%";
      row.style.marginBottom = "8px";
      row.style.borderBottom = "1px solid #eee";
      row.style.paddingBottom = "5px";

      const nameEl = document.createElement("div");
      nameEl.innerText = msg.name;
      nameEl.style.fontWeight = "bold";
      nameEl.style.width = isMobile ? "auto" : "15%";
      nameEl.style.color = "#4b382a";

      const messageEl = document.createElement("div");
      messageEl.innerText = msg.message;
      messageEl.style.width = isMobile ? "auto" : "55%";
      messageEl.style.padding = isMobile ? "0" : "0 8px";
      messageEl.style.color = "#4b382a";

      const timeEl = document.createElement("div");
      timeEl.innerText = formatTimestamp(msg.timestamp);
      timeEl.style.width = isMobile ? "auto" : "30%";
      timeEl.style.fontSize = "12px";
      timeEl.style.color = "#999";
      timeEl.style.fontFamily = "monospace";
      timeEl.style.fontFeatureSettings = '"tnum"';
      timeEl.style.textAlign = isMobile ? "left" : "right";
      timeEl.style.gridColumn = isMobile ? "2" : "";

      row.appendChild(nameEl);
      row.appendChild(messageEl);
      row.appendChild(timeEl);
      messageList.appendChild(row);
    });
  };

  const renderPagination = () => {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(allMessages.length / pageSize);

    const createButton = (label: string, page?: number) => {
      const btn = document.createElement("button");
      btn.innerText = label;
      btn.style.padding = "4px 10px";
      btn.style.border = "1px solid #8b5e3c";
      btn.style.borderRadius = "4px";
      btn.style.background = page === currentPage ? "#8b5e3c" : "#fff";
      btn.style.color = page === currentPage ? "#fff" : "#4b382a";
      btn.style.cursor = "pointer";
      if (page && page !== currentPage) {
        btn.onclick = () => {
          currentPage = page;
          renderMessages(currentPage);
          renderPagination();
        };
      }
      return btn;
    };

    if (currentPage > 1)
      pagination.appendChild(createButton("←", currentPage - 1));

    const range = Math.min(5, totalPages);
    let start = Math.max(1, currentPage - Math.floor(range / 2));
    if (start + range - 1 > totalPages) start = totalPages - range + 1;

    for (let i = start; i < start + range && i <= totalPages; i++) {
      pagination.appendChild(createButton(i.toString(), i));
    }

    if (currentPage < totalPages)
      pagination.appendChild(createButton("→", currentPage + 1));
  };

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
      allMessages = await getAllMessages();
      currentPage = 1;
      renderMessages(currentPage);
      renderPagination();
    } else {
      alert("이름과 메시지를 모두 입력해주세요.");
    }
  };

  closeButton.onclick = () => {
    container.remove();
  };

  container.appendChild(title);
  container.appendChild(nameInput);
  container.appendChild(messageInput);
  container.appendChild(submitButton);
  container.appendChild(closeButton);
  container.appendChild(messageList);
  container.appendChild(pagination);

  document.body.appendChild(container);

  getAllMessages().then((data) => {
    allMessages = data;
    renderMessages(currentPage);
    renderPagination();
  });

  scene.events.on("shutdown", () => {
    container.remove();
  });
};
