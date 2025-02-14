export const createPlayerAnims = (scene: Phaser.Scene): void => {
  scene.anims.create({
    key: "player_idle_front",

    frames: scene.anims.generateFrameNumbers("player_idle_front", {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "player_idle_back",

    frames: scene.anims.generateFrameNumbers("player_idle_back", {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "player_idle_right",

    frames: scene.anims.generateFrameNumbers("player_idle_right", {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "player_idle_left",

    frames: scene.anims.generateFrameNumbers("player_idle_left", {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "player_run_front",

    frames: scene.anims.generateFrameNumbers("player_run_front", {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "player_run_back",

    frames: scene.anims.generateFrameNumbers("player_run_back", {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "player_run_right",

    frames: scene.anims.generateFrameNumbers("player_run_right", {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: "player_run_left",

    frames: scene.anims.generateFrameNumbers("player_run_left", {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
};
