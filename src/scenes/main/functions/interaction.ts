import { createGuestbookUI } from "../../first-floor/functions/guestbookUI";

export const handleInteraction = (
  scene: Phaser.Scene,
  currentBubble: Phaser.GameObjects.Text | null,
  speechBubbles: { [key: string]: Phaser.GameObjects.Text },
  isCatDistanceOn: boolean
): void => {
  const sound = scene.sound.add("select", {
    volume: 0.8,
    loop: false
  });

  if (isCatDistanceOn) {
    sound.play();
    window.open("https://github.com/Joji6666");

    return;
  }

  const boardBubble = scene.data.get("boardBubble");

  if (boardBubble) {
    sound.play();
    createGuestbookUI(scene);
  }

  if (!currentBubble) return;

  if (currentBubble.text === "스페이스바를 눌러보세요!") {
    const iconKey = Object.keys(speechBubbles).find(
      (key) => speechBubbles[key] === currentBubble
    );

    if (iconKey === "my_topster") {
      sound.play();
      window.open("https://my-topster.vercel.app/");
    }

    if (iconKey === "bullet_samurai") {
      sound.play();
      window.open("https://store.onstove.com/ko/games/2234");
    }
  }
};
