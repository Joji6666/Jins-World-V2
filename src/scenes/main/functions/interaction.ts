export const handleInteraction = (
  scene: Phaser.Scene,
  currentBubble: Phaser.GameObjects.Text | null,
  speechBubbles: { [key: string]: Phaser.GameObjects.Text },
  isCatDistanceOn: boolean
): void => {
  if (isCatDistanceOn) {
    console.log(isCatDistanceOn, "first");
    window.open("https://github.com/Joji6666");

    return;
  }

  if (!currentBubble) return;

  if (currentBubble.text === "SPACE") {
    // 🔹 아이콘 별로 PDF 또는 Notion 페이지 띄우기
    const iconKey = Object.keys(speechBubbles).find(
      (key) => speechBubbles[key] === currentBubble
    );

    if (iconKey === "leaf") {
      showModalWithIframe("자기소개", "/assets/htmls/about_me.html", scene);
    } else if (iconKey === "scroll") {
      showModalWithIframe("경력", "/assets/notion.pdf", scene);
    } else if (iconKey === "skill-book") {
      showModalWithIframe("기술 스택", "/assets/notion.pdf", scene);
    } else if (iconKey === "gift-box") {
      showModalWithIframe(
        "프로젝트",
        "https://www.notion.so/About-Me-1926b3c8ccd580c9bf60d2079c5103bf",
        scene
      );
    }
  }
};

const showModalWithIframe = (
  title: string,
  url: string,
  scene: Phaser.Scene
): void => {
  const modalBackground = scene.add.graphics();
  modalBackground.fillStyle(0x000000, 0.7);
  modalBackground.fillRect(
    0,
    0,
    scene.cameras.main.width,
    scene.cameras.main.height + 300
  );
  modalBackground.setDepth(10);

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.width = `80%`;
  iframe.style.height = `80%`;
  iframe.style.border = "none";
  iframe.style.position = "absolute";
  iframe.style.top = `50%`;
  iframe.style.left = `50%`;
  iframe.style.zIndex = "1000";
  iframe.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(iframe);

  scene.input.keyboard?.once("keydown-ESC", () => {
    modalBackground.destroy();

    iframe.remove();
  });
};
