export const townPreload = (scene: Phaser.Scene): void => {
  scene.load.tilemapTiledJSON("town-map", "/assets/map2.json");
  scene.load.image("town-tiles", "/assets/map2.png");
};
