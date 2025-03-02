export const mainPreload = (scene: Phaser.Scene): void => {
  scene.load.image("atlas_48x", "/api/assets/tiles/atlas_48x.png");

  scene.load.image("gift-box", "/api/assets/icons/gift_box.png");
  scene.load.image("leaf", "/api/assets/icons/leaf.png");
  scene.load.image("scroll", "/api/assets/icons/scroll.png");
  scene.load.image("skill-book", "/api/assets/icons/skill_book.png");
  scene.load.image("github", "/api/assets/icons/github.png");

  scene.load.tilemapTiledJSON(
    "map",
    "/api/assets/maps/second_home_48_fix.json"
  );

  scene.load.spritesheet("octocat", "/api/assets/octocat.png", {
    frameWidth: 200,
    frameHeight: 300
  });
};
