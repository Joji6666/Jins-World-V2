export const createCatAnims = (scene: Phaser.Scene): void => {
  scene.anims.create({
    key: "octocat_idle",

    frames: scene.anims.generateFrameNumbers("octocat", {
      start: 0,
      end: 1
    }),

    frameRate: 1,

    repeat: -1
  });
};
