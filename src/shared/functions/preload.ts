export const playerPreload = (scene: Phaser.Scene): void => {
  scene.load.spritesheet(
    "player_idle_front",
    "/assets/player/player_idle_front.png",
    {
      frameWidth: 32,
      frameHeight: 32
    }
  );

  scene.load.spritesheet(
    "player_idle_back",
    "/assets/player/player_idle_back.png",
    {
      frameWidth: 32,
      frameHeight: 32
    }
  );

  scene.load.spritesheet(
    "player_idle_right",
    "/assets/player/player_idle_right.png",
    {
      frameWidth: 32,
      frameHeight: 32
    }
  );
  scene.load.spritesheet(
    "player_idle_left",
    "/assets/player/player_idle_left.png",
    {
      frameWidth: 32,
      frameHeight: 32
    }
  );
  scene.load.spritesheet(
    "player_run_front",
    "/assets/player/player_run_front.png",
    {
      frameWidth: 32,
      frameHeight: 32
    }
  );

  scene.load.spritesheet(
    "player_run_back",
    "/assets/player/player_run_back.png",
    {
      frameWidth: 32,
      frameHeight: 32
    }
  );

  scene.load.spritesheet(
    "player_run_right",
    "/assets/player/player_run_right.png",
    {
      frameWidth: 32,
      frameHeight: 32
    }
  );

  scene.load.spritesheet(
    "player_run_left",
    "/assets/player/player_run_left.png",
    {
      frameWidth: 32,
      frameHeight: 32
    }
  );
};
