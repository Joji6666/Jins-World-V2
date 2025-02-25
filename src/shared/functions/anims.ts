export const createPlayerAnims = (scene: Phaser.Scene): void => {
  scene.anims.create({
    key: `char_front`,

    frames: scene.anims.generateFrameNumbers(`char_front`, {
      start: 0,
      end: 0
    }),

    frameRate: 60,

    repeat: 0
  });
  scene.anims.create({
    key: `char_back`,

    frames: scene.anims.generateFrameNumbers(`char_back`, {
      start: 0,
      end: 0
    }),

    frameRate: 60,

    repeat: 0
  });
  scene.anims.create({
    key: `char_right`,

    frames: scene.anims.generateFrameNumbers(`char_right`, {
      start: 0,
      end: 0
    }),

    frameRate: 60,

    repeat: 0
  });
  scene.anims.create({
    key: `char_left`,

    frames: scene.anims.generateFrameNumbers(`char_left`, {
      start: 0,
      end: 0
    }),

    frameRate: 60,

    repeat: 0
  });
  scene.anims.create({
    key: `char_front_walk`,

    frames: scene.anims.generateFrameNumbers(`char_front_walk`, {
      start: 0,
      end: 5
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_back_walk`,

    frames: scene.anims.generateFrameNumbers(`char_back_walk`, {
      start: 0,
      end: 5
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_right_walk`,

    frames: scene.anims.generateFrameNumbers(`char_right_walk`, {
      start: 0,
      end: 5
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_left_walk`,

    frames: scene.anims.generateFrameNumbers(`char_left_walk`, {
      start: 0,
      end: 5
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_front_run`,

    frames: scene.anims.generateFrameNumbers(`char_front_run`, {
      start: 0,
      end: 7
    }),

    frameRate: 30,

    repeat: -1
  });
  scene.anims.create({
    key: `char_back_run`,

    frames: scene.anims.generateFrameNumbers(`char_back_run`, {
      start: 0,
      end: 7
    }),

    frameRate: 30,

    repeat: -1
  });
  scene.anims.create({
    key: `char_right_run`,

    frames: scene.anims.generateFrameNumbers(`char_right_run`, {
      start: 0,
      end: 7
    }),

    frameRate: 30,

    repeat: -1
  });
  scene.anims.create({
    key: `char_left_run`,

    frames: scene.anims.generateFrameNumbers(`char_left_run`, {
      start: 0,
      end: 7
    }),

    frameRate: 30,

    repeat: -1
  });
  scene.anims.create({
    key: `char_sword_draw_front`,

    frames: scene.anims.generateFrameNumbers(`char_sword_draw_front`, {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: 0
  });
  scene.anims.create({
    key: `char_sword_draw_back`,

    frames: scene.anims.generateFrameNumbers(`char_sword_draw_back`, {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: 0
  });
  scene.anims.create({
    key: `char_sword_draw_right`,

    frames: scene.anims.generateFrameNumbers(`char_sword_draw_right`, {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: 0
  });
  scene.anims.create({
    key: `char_sword_draw_left`,

    frames: scene.anims.generateFrameNumbers(`char_sword_draw_left`, {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: 0
  });

  scene.anims.create({
    key: `char_sword_idle_front`,

    frames: scene.anims.generateFrameNumbers(`char_sword_idle_front`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_sword_idle_back`,

    frames: scene.anims.generateFrameNumbers(`char_sword_idle_back`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_sword_idle_right`,

    frames: scene.anims.generateFrameNumbers(`char_sword_idle_right`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_sword_idle_left`,

    frames: scene.anims.generateFrameNumbers(`char_sword_idle_left`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: `char_sword_move_front`,

    frames: scene.anims.generateFrameNumbers(`char_sword_move_front`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_sword_move_back`,

    frames: scene.anims.generateFrameNumbers(`char_sword_move_back`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_sword_move_right`,

    frames: scene.anims.generateFrameNumbers(`char_sword_move_right`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `char_sword_move_left`,

    frames: scene.anims.generateFrameNumbers(`char_sword_move_left`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  // attack
  scene.anims.create({
    key: `char_sword_attack_front`,

    frames: scene.anims.generateFrameNumbers(`char_sword_attack_front`, {
      start: 0,
      end: 3
    }),

    frameRate: 30,

    repeat: 0
  });
  scene.anims.create({
    key: `char_sword_attack_left`,

    frames: scene.anims.generateFrameNumbers(`char_sword_attack_left`, {
      start: 0,
      end: 3
    }),

    frameRate: 30,

    repeat: 0
  });
  scene.anims.create({
    key: `char_sword_attack_back`,

    frames: scene.anims.generateFrameNumbers(`char_sword_attack_back`, {
      start: 0,
      end: 3
    }),

    frameRate: 30,

    repeat: 0
  });
  scene.anims.create({
    key: `char_sword_attack_right`,

    frames: scene.anims.generateFrameNumbers(`char_sword_attack_right`, {
      start: 0,
      end: 3
    }),

    frameRate: 30,

    repeat: 0
  });

  scene.anims.create({
    key: `char_sword_hurt_right`,

    frames: scene.anims.generateFrameNumbers(`char_sword_hurt_right`, {
      start: 0,
      end: 0
    }),

    frameRate: 10,

    repeat: 0
  });

  scene.anims.create({
    key: `char_sword_hurt_left`,

    frames: scene.anims.generateFrameNumbers(`char_sword_hurt_left`, {
      start: 0,
      end: 0
    }),

    frameRate: 10,

    repeat: 0
  });

  scene.anims.create({
    key: `char_sword_hurt_front`,

    frames: scene.anims.generateFrameNumbers(`char_sword_hurt_front`, {
      start: 0,
      end: 0
    }),

    frameRate: 10,

    repeat: 0
  });

  scene.anims.create({
    key: `char_sword_hurt_back`,

    frames: scene.anims.generateFrameNumbers(`char_sword_hurt_back`, {
      start: 0,
      end: 0
    }),

    frameRate: 10,

    repeat: 0
  });
};

export const createWeaponAnims = (scene: Phaser.Scene): void => {
  scene.anims.create({
    key: `sword_front`,

    frames: scene.anims.generateFrameNumbers(`sword_front`, {
      start: 0,
      end: 0
    }),

    frameRate: 60,

    repeat: 0
  });
  scene.anims.create({
    key: `sword_back`,

    frames: scene.anims.generateFrameNumbers(`sword_back`, {
      start: 0,
      end: 0
    }),

    frameRate: 60,

    repeat: 0
  });
  scene.anims.create({
    key: `sword_right`,

    frames: scene.anims.generateFrameNumbers(`sword_right`, {
      start: 0,
      end: 0
    }),

    frameRate: 60,

    repeat: 0
  });
  scene.anims.create({
    key: `sword_left`,

    frames: scene.anims.generateFrameNumbers(`sword_left`, {
      start: 0,
      end: 0
    }),

    frameRate: 60,

    repeat: 0
  });
  scene.anims.create({
    key: `sword_front_walk`,

    frames: scene.anims.generateFrameNumbers(`sword_front_walk`, {
      start: 0,
      end: 5
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `sword_back_walk`,

    frames: scene.anims.generateFrameNumbers(`sword_back_walk`, {
      start: 0,
      end: 5
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `sword_right_walk`,

    frames: scene.anims.generateFrameNumbers(`sword_right_walk`, {
      start: 0,
      end: 5
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `sword_left_walk`,

    frames: scene.anims.generateFrameNumbers(`sword_left_walk`, {
      start: 0,
      end: 5
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: `sword_draw_front`,

    frames: scene.anims.generateFrameNumbers(`sword_draw_front`, {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: 0
  });
  scene.anims.create({
    key: `sword_draw_back`,

    frames: scene.anims.generateFrameNumbers(`sword_draw_back`, {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: 0
  });
  scene.anims.create({
    key: `sword_draw_left`,

    frames: scene.anims.generateFrameNumbers(`sword_draw_left`, {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: 0
  });
  scene.anims.create({
    key: `sword_draw_right`,

    frames: scene.anims.generateFrameNumbers(`sword_draw_right`, {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: 0
  });
  scene.anims.create({
    key: `sword_draw_left`,

    frames: scene.anims.generateFrameNumbers(`sword_draw_left`, {
      start: 0,
      end: 2
    }),

    frameRate: 10,

    repeat: 0
  });

  scene.anims.create({
    key: `sword_idle_front`,

    frames: scene.anims.generateFrameNumbers(`sword_idle_front`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `sword_idle_back`,

    frames: scene.anims.generateFrameNumbers(`sword_idle_back`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `sword_idle_right`,

    frames: scene.anims.generateFrameNumbers(`sword_idle_right`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `sword_idle_left`,

    frames: scene.anims.generateFrameNumbers(`sword_idle_left`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  scene.anims.create({
    key: `sword_move_front`,

    frames: scene.anims.generateFrameNumbers(`sword_move_front`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `sword_move_back`,

    frames: scene.anims.generateFrameNumbers(`sword_move_back`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `sword_move_right`,

    frames: scene.anims.generateFrameNumbers(`sword_move_right`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });
  scene.anims.create({
    key: `sword_move_left`,

    frames: scene.anims.generateFrameNumbers(`sword_move_left`, {
      start: 0,
      end: 3
    }),

    frameRate: 10,

    repeat: -1
  });

  // attack

  scene.anims.create({
    key: `sword_attack_front`,

    frames: scene.anims.generateFrameNumbers(`sword_attack_front`, {
      start: 0,
      end: 3
    }),

    frameRate: 30,

    repeat: 0
  });

  scene.anims.create({
    key: `sword_attack_back`,

    frames: scene.anims.generateFrameNumbers(`sword_attack_back`, {
      start: 0,
      end: 3
    }),

    frameRate: 30,

    repeat: 0
  });

  scene.anims.create({
    key: `sword_attack_right`,

    frames: scene.anims.generateFrameNumbers(`sword_attack_right`, {
      start: 0,
      end: 3
    }),

    frameRate: 30,

    repeat: 0
  });

  scene.anims.create({
    key: `sword_attack_left`,

    frames: scene.anims.generateFrameNumbers(`sword_attack_left`, {
      start: 0,
      end: 3
    }),

    frameRate: 30,

    repeat: 0
  });
};
