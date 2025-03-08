export const playerPreload = (scene: Phaser.Scene): void => {
  const animations = [
    "front",
    "back",
    "right",
    "left",
    "death_front",
    "death_back",
    "death_right",
    "death_left",
    "walk_front",
    "walk_back",
    "walk_right",
    "walk_left",
    "run_front",
    "run_back",
    "run_right",
    "run_left"
  ];

  const swordAnimations = [
    "sword_draw_front",
    "sword_draw_back",
    "sword_draw_right",
    "sword_draw_left",
    "sword_idle_front",
    "sword_idle_back",
    "sword_idle_right",
    "sword_idle_left",
    "sword_move_front",
    "sword_move_back",
    "sword_move_right",
    "sword_move_left",
    "sword_attack_front",
    "sword_attack_back",
    "sword_attack_right",
    "sword_attack_left",
    "sword_hurt_front",
    "sword_hurt_back",
    "sword_hurt_right",
    "sword_hurt_left",
    "sword_retreat_front",
    "sword_retreat_back",
    "sword_retreat_right",
    "sword_retreat_left"
  ];

  animations.forEach((anim) => {
    scene.load.spritesheet(
      `char_${anim}`,
      `/assets/player/char/char_${anim}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  });

  swordAnimations.forEach((anim) => {
    scene.load.spritesheet(
      `char_${anim}`,
      `/assets/player/char/weapon/sword/${anim}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  });

  scene.load.spritesheet(`char_hit`, `/assets/player/fx/char_hit.png`, {
    frameWidth: 34,
    frameHeight: 34
  });
};

export const weaponPreload = (scene: Phaser.Scene): void => {
  const directions = ["front", "back", "right", "left"];
  const actions = [
    "walk",
    "draw",
    "idle",
    "move",
    "attack",
    "hurt",
    "death",
    "retreat"
  ];

  directions.forEach((dir) => {
    scene.load.spritesheet(
      `sword_${dir}`,
      `/assets/weapon/sword/sword_${dir}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  });

  directions.forEach((dir) => {
    actions.forEach((action) => {
      scene.load.spritesheet(
        `sword_${action}_${dir}`,
        `/assets/weapon/sword/sword_${action}_${dir}.png`,
        {
          frameWidth: 64,
          frameHeight: 64
        }
      );
    });
  });
};

export const hairPreload = (scene: Phaser.Scene, number: number) => {
  scene.load.spritesheet(
    `hair_front`,
    `/assets/player/hair/hair_${number}/hair_${number}_front.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `hair`,
    `/assets/player/hair/hair_${number}/hair_${number}.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `hair_sword_1`,
    `/assets/player/hair/hair_${number}/hair_${number}_sword_1.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `hair_sword_2`,
    `/assets/player/hair/hair_${number}/hair_${number}_sword_2.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `hair_sword_3`,
    `/assets/player/hair/hair_${number}/hair_${number}_sword_3.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
};

export const clothesPreload = (scene: Phaser.Scene, number: number) => {
  scene.load.spritesheet(
    `clothes_front`,
    `/assets/player/clothes/clothes_${number}/clothes_${number}_front.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `clothes`,
    `/assets/player/clothes/clothes_${number}/clothes_${number}.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `clothes_sword_1`,
    `/assets/player/clothes/clothes_${number}/clothes_${number}_sword_1.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `clothes_sword_2`,
    `/assets/player/clothes/clothes_${number}/clothes_${number}_sword_2.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `clothes_sword_3`,
    `/assets/player/clothes/clothes_${number}/clothes_${number}_sword_3.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
};
