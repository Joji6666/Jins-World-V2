export const firstFloorPreload = (scene: Phaser.Scene): void => {
  scene.load.image("atlas_48x", "/assets/tiles/atlas_48x.png");

  scene.load.tilemapTiledJSON("first_home", "/assets/maps/first_home.json");

  scene.load.spritesheet("octocat", "/assets/octocat.png", {
    frameWidth: 200,
    frameHeight: 300
  });
};
