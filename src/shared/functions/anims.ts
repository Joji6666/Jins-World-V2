export const createPlayerAnims = (scene: Phaser.Scene): void => {
  const animationConfig = [
    { key: "char", frames: 0, frameRate: 60, repeat: 0 },
    { key: "char_death", frames: 1, frameRate: 10, repeat: 0 },
    { key: "char_walk", frames: 5, frameRate: 10, repeat: -1 },
    { key: "char_run", frames: 7, frameRate: 30, repeat: -1 },
    { key: "char_sword_draw", frames: 2, frameRate: 10, repeat: 0 },
    { key: "char_sword_idle", frames: 3, frameRate: 10, repeat: -1 },
    { key: "char_sword_move", frames: 3, frameRate: 10, repeat: -1 },
    { key: "char_sword_attack", frames: 3, frameRate: 30, repeat: 0 },
    { key: "char_sword_hurt", frames: 0, frameRate: 10, repeat: 0 }
  ];

  const directions = ["front", "back", "right", "left"];

  animationConfig.forEach(({ key, frames, frameRate, repeat }) => {
    directions.forEach((dir) => {
      scene.anims.create({
        key: `${key}_${dir}`,
        frames: scene.anims.generateFrameNumbers(`${key}_${dir}`, {
          start: 0,
          end: frames
        }),
        frameRate,
        repeat
      });
    });
  });
};

export const createWeaponAnims = (scene: Phaser.Scene): void => {
  const animationConfig = [
    { key: "sword", frames: 0, frameRate: 60, repeat: 0 },
    { key: "sword_walk", frames: 5, frameRate: 10, repeat: -1 },
    { key: "sword_draw", frames: 2, frameRate: 10, repeat: 0 },
    { key: "sword_idle", frames: 3, frameRate: 10, repeat: -1 },
    { key: "sword_move", frames: 3, frameRate: 10, repeat: -1 },
    { key: "sword_attack", frames: 3, frameRate: 30, repeat: 0 },
    { key: "sword_hurt", frames: 0, frameRate: 10, repeat: 0 },
    { key: "sword_death", frames: 1, frameRate: 10, repeat: 0 }
  ];

  const directions = ["front", "back", "right", "left"];

  animationConfig.forEach(({ key, frames, frameRate, repeat }) => {
    directions.forEach((dir) => {
      scene.anims.create({
        key: `${key}_${dir}`,
        frames: scene.anims.generateFrameNumbers(`${key}_${dir}`, {
          start: 0,
          end: frames
        }),
        frameRate,
        repeat
      });
    });
  });
};
