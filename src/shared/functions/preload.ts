export const playerPreload = (scene: Phaser.Scene): void => {
  scene.load.spritesheet(`char_front`, "/assets/player/char/char_front.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  scene.load.spritesheet(`char_back`, "/assets/player/char/char_back.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  scene.load.spritesheet(`char_right`, "/assets/player/char/char_right.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  scene.load.spritesheet(`char_left`, "/assets/player/char/char_left.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  scene.load.spritesheet(
    `char_front_walk`,
    "/assets/player/char/char_front_walk.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_back_walk`,
    "/assets/player/char/char_back_walk.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_right_walk`,
    "/assets/player/char/char_right_walk.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_left_walk`,
    "/assets/player/char/char_left_walk.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_front_run`,
    "/assets/player/char/char_front_run.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_back_run`,
    "/assets/player/char/char_back_run.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_right_run`,
    "/assets/player/char/char_right_run.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_left_run`,
    "/assets/player/char/char_left_run.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_draw_front`,
    "/assets/player/char/weapon/sword/sword_draw_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_draw_left`,
    "/assets/player/char/weapon/sword/sword_draw_left.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_draw_right`,
    "/assets/player/char/weapon/sword/sword_draw_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_draw_back`,
    "/assets/player/char/weapon/sword/sword_draw_back.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_idle_front`,
    "/assets/player/char/weapon/sword/sword_idle_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_idle_back`,
    "/assets/player/char/weapon/sword/sword_idle_back.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_idle_right`,
    "/assets/player/char/weapon/sword/sword_idle_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_idle_left`,
    "/assets/player/char/weapon/sword/sword_idle_left.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_move_front`,
    "/assets/player/char/weapon/sword/sword_move_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_move_back`,
    "/assets/player/char/weapon/sword/sword_move_back.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_move_right`,
    "/assets/player/char/weapon/sword/sword_move_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_move_left`,
    "/assets/player/char/weapon/sword/sword_move_left.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  // attack

  scene.load.spritesheet(
    `char_sword_attack_front`,
    "/assets/player/char/weapon/sword/sword_attack_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_attack_back`,
    "/assets/player/char/weapon/sword/sword_attack_back.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_attack_right`,
    "/assets/player/char/weapon/sword/sword_attack_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `char_sword_attack_left`,
    "/assets/player/char/weapon/sword/sword_attack_left.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `char_sword_hurt_left`,
    "/assets/player/char/weapon/sword/sword_hurt_left.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `char_sword_hurt_right`,
    "/assets/player/char/weapon/sword/sword_hurt_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `char_sword_hurt_front`,
    "/assets/player/char/weapon/sword/sword_hurt_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `char_sword_hurt_back`,
    "/assets/player/char/weapon/sword/sword_hurt_back.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
};

export const weaponPreload = (scene: Phaser.Scene): void => {
  scene.load.spritesheet(`sword_back`, "/assets/weapon/sword/sword_back.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  scene.load.spritesheet(
    `sword_front`,
    "/assets/weapon/sword/sword_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_right`,
    "/assets/weapon/sword/sword_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(`sword_left`, "/assets/weapon/sword/sword_left.png", {
    frameWidth: 64,
    frameHeight: 64
  });
  scene.load.spritesheet(
    `sword_left_walk`,
    "/assets/weapon/sword/sword_left_walk.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_right_walk`,
    "/assets/weapon/sword/sword_right_walk.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_front_walk`,
    "/assets/weapon/sword/sword_front_walk.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_back_walk`,
    "/assets/weapon/sword/sword_back_walk.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_draw_front`,
    "/assets/weapon/sword/sword_draw_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_draw_back`,
    "/assets/weapon/sword/sword_draw_back.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_draw_right`,
    "/assets/weapon/sword/sword_draw_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_draw_left`,
    "/assets/weapon/sword/sword_draw_left.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_idle_front`,
    "/assets/weapon/sword/sword_idle_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_idle_back`,
    "/assets/weapon/sword/sword_idle_back.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_idle_right`,
    "/assets/weapon/sword/sword_idle_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_idle_left`,
    "/assets/weapon/sword/sword_idle_left.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_move_front`,
    "/assets/weapon/sword/sword_move_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_move_back`,
    "/assets/weapon/sword/sword_move_back.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_move_right`,
    "/assets/weapon/sword/sword_move_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_move_left`,
    "/assets/weapon/sword/sword_move_left.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  // attack

  scene.load.spritesheet(
    `sword_attack_front`,
    "/assets/weapon/sword/sword_attack_front.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_attack_back`,
    "/assets/weapon/sword/sword_attack_back.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_attack_right`,
    "/assets/weapon/sword/sword_attack_right.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
  scene.load.spritesheet(
    `sword_attack_left`,
    "/assets/weapon/sword/sword_attack_left.png",
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
};
