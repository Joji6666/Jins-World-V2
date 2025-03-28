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

  if (currentBubble.text === "PRESS SPACE") {
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
