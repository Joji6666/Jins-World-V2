export const allHairPreload = (scene: Phaser.Scene) => {
  for (let i = 1; i <= 2; i++) {
    scene.load.spritesheet(
      `hair_${i}_front`,
      `/assets/player/hair/hair_${i}/hair_${i}_front.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  }
};

export const allClothesPreload = (scene: Phaser.Scene) => {
  for (let i = 1; i <= 5; i++) {
    scene.load.spritesheet(
      `clothes_${i}_front`,
      `/assets/player/clothes/clothes_${i}/clothes_${i}_front.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  }
};

export const playerFrontPreload = (scene: Phaser.Scene) => {
  scene.load.spritesheet(`char_front`, `/assets/player/char/char_front.png`, {
    frameWidth: 64,
    frameHeight: 64
  });
};
