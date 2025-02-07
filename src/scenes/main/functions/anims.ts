export const createPlayerAnims = (scene: Phaser.Scene): void => {
  scene.anims.create({
    key: "left",

    frames: scene.anims.generateFrameNumbers("jin", {
      start: 3,
      end: 5
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "turn_left",

    frames: scene.anims.generateFrameNumbers("jin", {
      start: 3,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "right",

    frames: scene.anims.generateFrameNumbers("jin", {
      start: 6,
      end: 8
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "turn_right",

    frames: scene.anims.generateFrameNumbers("jin", {
      start: 6,
      end: 6
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "up",

    frames: scene.anims.generateFrameNumbers("jin", {
      start: 9,
      end: 11
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "turn_up",

    frames: scene.anims.generateFrameNumbers("jin", {
      start: 9,
      end: 9
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "down",

    frames: scene.anims.generateFrameNumbers("jin", {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "turn_down",

    frames: scene.anims.generateFrameNumbers("jin", {
      start: 0,
      end: 0
    }),

    frameRate: 10,

    repeat: -1
  });
};
