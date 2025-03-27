import { createGuestbookUI } from "../../first-floor/functions/guestbookUI";

export const handleInteraction = (
  scene: Phaser.Scene,
  currentBubble: Phaser.GameObjects.Text | null,
  speechBubbles: { [key: string]: Phaser.GameObjects.Text },
  isCatDistanceOn: boolean
): void => {
  if (isCatDistanceOn) {
    window.open("https://github.com/Joji6666");

    return;
  }

  const boardBubble = scene.data.get("boardBubble");

  if (boardBubble) {
    createGuestbookUI(scene);
  }

  if (!currentBubble) return;

  if (currentBubble.text === "SPACE") {
    const iconKey = Object.keys(speechBubbles).find(
      (key) => speechBubbles[key] === currentBubble
    );

    if (iconKey === "my_topster") {
      window.open("https://my-topster.vercel.app/");
    }

    if (iconKey === "bullet_samurai") {
      window.open("https://store.onstove.com/ko/games/2234");
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
