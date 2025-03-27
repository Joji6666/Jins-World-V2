export const firstFloorPreload = (scene: Phaser.Scene): void => {
  scene.load.image("atlas_48x", "/assets/tiles/atlas_48x.png");
  scene.load.image("github", "/assets/icons/github.png");
  scene.load.image("board", "/assets/board.png");

  scene.load.tilemapTiledJSON("first_home", "/assets/maps/first_home.json");

  scene.load.spritesheet("octocat", "/assets/octocat.png", {
    frameWidth: 200,
    frameHeight: 300
  });

  scene.load.spritesheet("jin", "/assets/jin/char.png", {
    frameWidth: 64,
    frameHeight: 64
  });

  scene.load.spritesheet("jin_hair", "/assets/jin/hair.png", {
    frameWidth: 64,
    frameHeight: 64
  });

  scene.load.spritesheet("jin_clothes", "/assets/jin/clothes.png", {
    frameWidth: 64,
    frameHeight: 64
  });
};
