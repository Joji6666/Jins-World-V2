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
    "front_walk",
    "back_walk",
    "right_walk",
    "left_walk",
    "front_run",
    "back_run",
    "right_run",
    "left_run"
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
    "sword_hurt_left"
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
};

export const weaponPreload = (scene: Phaser.Scene): void => {
  const directions = ["front", "back", "right", "left"];
  const actions = ["walk", "draw", "idle", "move", "attack", "hurt", "death"];

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
