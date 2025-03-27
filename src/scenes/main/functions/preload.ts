export const mainPreload = (scene: Phaser.Scene): void => {
  scene.load.image("atlas_48x", "/assets/tiles/atlas_48x.png");

  scene.load.image("gift-box", "/assets/icons/gift_box.png");
  scene.load.image("my_topster", "/assets/icons/my_topster.png");
  scene.load.image("leaf", "/assets/icons/leaf.png");
  scene.load.image("scroll", "/assets/icons/scroll.png");
  scene.load.image("skill-book", "/assets/icons/skill_book.png");
  scene.load.image("github", "/assets/icons/github.png");

  scene.load.tilemapTiledJSON("map", "/assets/maps/second_home.json");
};
