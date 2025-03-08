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
    { key: "char_sword_hurt", frames: 0, frameRate: 10, repeat: 0 },
    { key: "char_sword_retreat", frames: 0, frameRate: 10, repeat: 0 }
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

  scene.anims.create({
    key: `char_hit`,
    frames: scene.anims.generateFrameNumbers(`char_hit`, {
      start: 0,
      end: 2
    }),
    frameRate: 10,
    repeat: 0
  });

  scene.anims.create({
    key: `heart_idle`,
    frames: scene.anims.generateFrameNumbers(`heart_idle`, {
      start: 0,
      end: 1
    }),
    frameRate: 5,
    repeat: -1
  });

  scene.anims.create({
    key: `heart_damage`,
    frames: scene.anims.generateFrameNumbers(`heart_damage`, {
      start: 0,
      end: 4
    }),
    frameRate: 10,
    repeat: 0
  });

  scene.anims.create({
    key: `broken_heart_idle`,
    frames: scene.anims.generateFrameNumbers(`broken_heart_idle`, {
      start: 0,
      end: 1
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: `broken_heart_damage`,
    frames: scene.anims.generateFrameNumbers(`broken_heart_damage`, {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: `empty_heart`,
    frames: scene.anims.generateFrameNumbers(`empty_heart`, {
      start: 0,
      end: 0
    }),
    frameRate: 10,
    repeat: 0
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
    { key: "sword_death", frames: 1, frameRate: 10, repeat: 0 },
    { key: "sword_retreat", frames: 0, frameRate: 10, repeat: 0 }
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

export const createClothesAnims = (scene: Phaser.Scene): void => {
  const animationConfig = [
    {
      key: `clothes_front`,
      start: 0,
      end: 0,
      frameRate: 60,
      repeat: 0,
      sourceKey: "clothes_front"
    },
    {
      key: `clothes_back`,
      start: 8,
      end: 8,
      frameRate: 60,
      repeat: 0,
      sourceKey: "clothes"
    },
    {
      key: `clothes_right`,
      start: 16,
      end: 16,
      frameRate: 60,
      repeat: 0,
      sourceKey: "clothes"
    },
    {
      key: `clothes_left`,
      start: 24,
      end: 24,
      frameRate: 60,
      repeat: 0,
      sourceKey: "clothes"
    },

    {
      key: `clothes_walk_front`,
      start: 32,
      end: 37,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes"
    },
    {
      key: `clothes_walk_back`,
      start: 40,
      end: 45,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes"
    },
    {
      key: `clothes_walk_right`,
      start: 48,
      end: 53,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes"
    },
    {
      key: `clothes_walk_left`,
      start: 56,
      end: 61,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes"
    },

    {
      key: `clothes_hurt_front`,
      start: 5,
      end: 5,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },
    {
      key: `clothes_hurt_back`,
      start: 13,
      end: 13,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },
    {
      key: `clothes_hurt_left`,
      start: 21,
      end: 21,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },
    {
      key: `clothes_hurt_right`,
      start: 5,
      end: 5,
      frameRate: 29,
      repeat: 29,
      sourceKey: "clothes_sword_1"
    },

    {
      key: `clothes_death_front`,
      start: 6,
      end: 7,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },

    {
      key: `clothes_death_back`,
      start: 14,
      end: 15,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },

    {
      key: `clothes_death_right`,
      start: 22,
      end: 23,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },

    {
      key: `clothes_death_left`,
      start: 30,
      end: 31,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },

    {
      key: `clothes_sword_draw_front`,
      start: 0,
      end: 2,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },

    {
      key: `clothes_sword_draw_back`,
      start: 8,
      end: 10,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },

    {
      key: `clothes_sword_draw_right`,
      start: 16,
      end: 18,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },

    {
      key: `clothes_sword_draw_left`,
      start: 24,
      end: 26,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_1"
    },

    {
      key: `clothes_sword_idle_front`,
      start: 0,
      end: 3,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes_sword_2"
    },
    {
      key: `clothes_sword_idle_back`,
      start: 8,
      end: 11,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes_sword_2"
    },
    {
      key: `clothes_sword_idle_right`,
      start: 16,
      end: 19,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes_sword_2"
    },
    {
      key: `clothes_sword_idle_left`,
      start: 24,
      end: 27,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes_sword_2"
    },

    {
      key: `clothes_sword_move_front`,
      start: 4,
      end: 7,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes_sword_2"
    },
    {
      key: `clothes_sword_move_back`,
      start: 12,
      end: 15,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes_sword_2"
    },
    {
      key: `clothes_sword_move_right`,
      start: 20,
      end: 23,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes_sword_2"
    },
    {
      key: `clothes_sword_move_left`,
      start: 28,
      end: 31,
      frameRate: 10,
      repeat: -1,
      sourceKey: "clothes_sword_2"
    },

    {
      key: `clothes_sword_attack_front`,
      start: 0,
      end: 3,
      frameRate: 30,
      repeat: 0,
      sourceKey: "clothes_sword_3"
    },
    {
      key: `clothes_sword_attack_back`,
      start: 8,
      end: 11,
      frameRate: 30,
      repeat: 0,
      sourceKey: "clothes_sword_3"
    },
    {
      key: `clothes_sword_attack_right`,
      start: 16,
      end: 19,
      frameRate: 30,
      repeat: 0,
      sourceKey: "clothes_sword_3"
    },
    {
      key: `clothes_sword_attack_left`,
      start: 24,
      end: 27,
      frameRate: 30,
      repeat: 0,
      sourceKey: "clothes_sword_3"
    },

    {
      key: `clothes_sword_retreat_front`,
      start: 33,
      end: 33,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_2"
    },
    {
      key: `clothes_sword_retreat_back`,
      start: 41,
      end: 41,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_2"
    },
    {
      key: `clothes_sword_retreat_right`,
      start: 49,
      end: 49,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_2"
    },
    {
      key: `clothes_sword_retreat_left`,
      start: 57,
      end: 57,
      frameRate: 10,
      repeat: 0,
      sourceKey: "clothes_sword_2"
    }
  ];

  animationConfig.forEach(
    ({ key, start, end, frameRate, repeat, sourceKey }) => {
      scene.anims.create({
        key: `${key}`,
        frames: scene.anims.generateFrameNumbers(sourceKey, {
          start,
          end
        }),
        frameRate,
        repeat
      });
    }
  );
};

export const createHairAnims = (scene: Phaser.Scene): void => {
  const animationConfig = [
    {
      key: `hair_front`,
      start: 0,
      end: 0,
      frameRate: 60,
      repeat: 0,
      sourceKey: "hair_front"
    },
    {
      key: `hair_back`,
      start: 8,
      end: 8,
      frameRate: 60,
      repeat: 0,
      sourceKey: "hair"
    },
    {
      key: `hair_right`,
      start: 16,
      end: 16,
      frameRate: 60,
      repeat: 0,
      sourceKey: "hair"
    },
    {
      key: `hair_left`,
      start: 24,
      end: 24,
      frameRate: 60,
      repeat: 0,
      sourceKey: "hair"
    },

    {
      key: `hair_walk_front`,
      start: 32,
      end: 37,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair"
    },
    {
      key: `hair_walk_back`,
      start: 40,
      end: 45,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair"
    },
    {
      key: `hair_walk_right`,
      start: 48,
      end: 53,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair"
    },
    {
      key: `hair_walk_left`,
      start: 56,
      end: 61,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair"
    },

    {
      key: `hair_hurt_front`,
      start: 5,
      end: 5,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },
    {
      key: `hair_hurt_back`,
      start: 13,
      end: 13,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },
    {
      key: `hair_hurt_left`,
      start: 21,
      end: 21,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },
    {
      key: `hair_hurt_right`,
      start: 5,
      end: 5,
      frameRate: 29,
      repeat: 29,
      sourceKey: "hair_sword_1"
    },

    {
      key: `hair_death_front`,
      start: 6,
      end: 7,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },

    {
      key: `hair_death_back`,
      start: 14,
      end: 15,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },

    {
      key: `hair_death_right`,
      start: 22,
      end: 23,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },

    {
      key: `hair_death_left`,
      start: 30,
      end: 31,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },

    {
      key: `hair_sword_draw_front`,
      start: 0,
      end: 2,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },

    {
      key: `hair_sword_draw_back`,
      start: 8,
      end: 10,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },

    {
      key: `hair_sword_draw_right`,
      start: 16,
      end: 18,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },

    {
      key: `hair_sword_draw_left`,
      start: 24,
      end: 26,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_1"
    },

    {
      key: `hair_sword_idle_front`,
      start: 0,
      end: 3,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair_sword_2"
    },
    {
      key: `hair_sword_idle_back`,
      start: 8,
      end: 11,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair_sword_2"
    },
    {
      key: `hair_sword_idle_right`,
      start: 16,
      end: 19,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair_sword_2"
    },
    {
      key: `hair_sword_idle_left`,
      start: 24,
      end: 27,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair_sword_2"
    },

    {
      key: `hair_sword_move_front`,
      start: 4,
      end: 7,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair_sword_2"
    },
    {
      key: `hair_sword_move_back`,
      start: 12,
      end: 15,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair_sword_2"
    },
    {
      key: `hair_sword_move_right`,
      start: 20,
      end: 23,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair_sword_2"
    },
    {
      key: `hair_sword_move_left`,
      start: 28,
      end: 31,
      frameRate: 10,
      repeat: -1,
      sourceKey: "hair_sword_2"
    },

    {
      key: `hair_sword_attack_front`,
      start: 0,
      end: 3,
      frameRate: 30,
      repeat: 0,
      sourceKey: "hair_sword_3"
    },
    {
      key: `hair_sword_attack_back`,
      start: 8,
      end: 11,
      frameRate: 30,
      repeat: 0,
      sourceKey: "hair_sword_3"
    },
    {
      key: `hair_sword_attack_right`,
      start: 16,
      end: 19,
      frameRate: 30,
      repeat: 0,
      sourceKey: "hair_sword_3"
    },
    {
      key: `hair_sword_attack_left`,
      start: 24,
      end: 27,
      frameRate: 30,
      repeat: 0,
      sourceKey: "hair_sword_3"
    },

    {
      key: `hair_sword_retreat_front`,
      start: 33,
      end: 33,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_2"
    },
    {
      key: `hair_sword_retreat_back`,
      start: 41,
      end: 41,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_2"
    },
    {
      key: `hair_sword_retreat_right`,
      start: 49,
      end: 49,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_2"
    },
    {
      key: `hair_sword_retreat_left`,
      start: 57,
      end: 57,
      frameRate: 10,
      repeat: 0,
      sourceKey: "hair_sword_2"
    }
  ];

  animationConfig.forEach(
    ({ key, start, end, frameRate, repeat, sourceKey }) => {
      scene.anims.create({
        key: `${key}`,
        frames: scene.anims.generateFrameNumbers(sourceKey, {
          start,
          end
        }),
        frameRate,
        repeat
      });
    }
  );
};
