export const mainPreload = (scene: Phaser.Scene): void => {
  scene.load.image("tiles", "/assets/tiles.png");

  scene.load.image("gift-box", "/assets/icons/gift_box.png");
  scene.load.image("leaf", "/assets/icons/leaf.png");
  scene.load.image("scroll", "/assets/icons/scroll.png");
  scene.load.image("skill-book", "/assets/icons/skill_book.png");

  scene.load.tilemapTiledJSON("map", "/assets/map.json");

  scene.load.spritesheet("jin", "/assets/jin.png", {
    frameWidth: 50,
    frameHeight: 74
  });
};
