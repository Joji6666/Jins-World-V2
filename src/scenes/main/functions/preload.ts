export const mainPreload = (scene: Phaser.Scene): void => {
  scene.load.image("tiles", "/assets/tiles.png");
  scene.load.tilemapTiledJSON("map", "/assets/map.json");

  scene.load.spritesheet("jin", "/assets/jin.png", {
    frameWidth: 50,
    frameHeight: 74
  });
};
