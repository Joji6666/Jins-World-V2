const arrowTextStyle = {
  fontFamily: "KoreanPixelFont",
  fontSize: "20px",
  color: "#000000"
};

export const createMap = (scene: Phaser.Scene): Phaser.Tilemaps.Tilemap => {
  const map = scene.make.tilemap({ key: "map" });
  scene.data.set("map", map);

  return map;
};

export const createTileset = (
  map: Phaser.Tilemaps.Tilemap
): Phaser.Tilemaps.Tileset | null => {
  const tileset = map.addTilesetImage("atlas_48x", "atlas_48x");

  return tileset;
};

export const createLayers = (
  map: Phaser.Tilemaps.Tilemap,
  titleset: Phaser.Tilemaps.Tileset,
  scene: Phaser.Scene
): {
  bgLayer: Phaser.Tilemaps.TilemapLayer | null;
  firstFloorLayer: Phaser.Tilemaps.TilemapLayer | null;
  secondFloorLayer: Phaser.Tilemaps.TilemapLayer | null;
  wallLayer: Phaser.Tilemaps.TilemapLayer | null;
  wallObjectLayer: Phaser.Tilemaps.TilemapLayer | null;
  objectLayer: Phaser.Tilemaps.TilemapLayer | null;
  secondObjectLayer: Phaser.Tilemaps.TilemapLayer | null;
} => {
  const bgLayer = map.createLayer("bg", titleset);
  const firstFloorLayer = map.createLayer("floor_1", titleset);
  const secondFloorLayer = map.createLayer("floor_2", titleset);
  const wallLayer = map.createLayer("wall", titleset);
  const wallObjectLayer = map.createLayer("object_wall", titleset);
  const objectLayer = map.createLayer("object", titleset);
  const secondObjectLayer = map.createLayer("object_2", titleset);

  scene.data.set("wallLayer", wallLayer);

  scene.data.set("wallObjectLayer", wallObjectLayer);

  return {
    bgLayer,
    firstFloorLayer,
    secondFloorLayer,
    wallLayer,
    wallObjectLayer,

    objectLayer,
    secondObjectLayer
  };
};

export const createOctocat = (
  scene: Phaser.Scene
): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody => {
  const octocat = scene.physics.add
    .sprite(300, 500, `octocat`)
    .setName("octocat");

  octocat.body.immovable = true;
  octocat.body.offset.y = 7;
  octocat.scale = 0.25;
  scene.data.set("octocat", octocat);
  octocat.depth = 20;

  const githubIcon = scene.physics.add
    .image(octocat.x, octocat.y - 50, "github")
    .setOrigin(0.5, 0.5);

  githubIcon.body.setAllowGravity(false);
  githubIcon.depth = 30;
  githubIcon.scale = 0.025;

  scene.tweens.add({
    targets: [githubIcon],
    y: "+=8",
    duration: 1000,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut"
  });

  return octocat;
};

export const createTitleTexts = (
  scene: Phaser.Scene,
  language: string
): void => {
  scene.add.text(1050, 100, language !== "ko" ? "How To Move" : "조작 방법", {
    fontFamily: "KoreanPixelFont",
    fontSize: "24px",
    color: "#000000",
    align: "center"
  });

  scene.add.text(
    1070,
    140,
    language !== "ko" ? "↑ Move Up" : "↑ 위로 이동",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    170,
    language !== "ko" ? "↓ Move Down" : "↓ 아래로 이동",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    200,
    language !== "ko" ? "← Move Left" : "← 왼쪽으로 이동",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    230,
    language !== "ko" ? "→ Move Right" : "→ 오른쪽으로 이동",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    260,
    language !== "ko" ? "space Interaction" : "space 상호작용",
    arrowTextStyle
  );
};

export const createIcons = (scene: Phaser.Scene, language: string) => {
  const icons: Phaser.Physics.Arcade.Image[] = [];
  const speechBubbles: { [key: string]: Phaser.GameObjects.Text } = {};

  const items = [
    {
      key: "my_topster",
      x: 985,
      y: 500,
      koreanText: "MyTopster",
      englishText: "MyTopster"
    },

    {
      key: "bullet_samurai",
      x: 985,
      y: 600,
      koreanText: "BulletSamurai",
      englishText: "BulletSamurai"
    }
  ];

  items.forEach((item) => {
    const shadow = scene.add.graphics();
    shadow.fillStyle(0x000000, 0.3);
    shadow.fillEllipse(0, 0, 50, 20);
    shadow.setPosition(item.x, item.y + 20);

    const icon = scene.physics.add.image(item.x, item.y, item.key);

    if (item.key === "my_topster") {
      icon.setScale(0.085);
    }

    if (item.key === "bullet_samurai") {
      icon.setScale(0.9);
    }

    icon.body.setAllowGravity(false);
    icons.push(icon);
    scene.data.set(item.key, icon);

    const text = scene.add
      .text(
        icon.x + 5,
        icon.y - 50,
        language !== "ko" ? item.englishText : item.koreanText,
        { ...arrowTextStyle, color: "#FFFFFF" }
      )
      .setOrigin(0.5, 0.5);

    text.setStroke("#000000", 3);

    scene.tweens.add({
      targets: [icon, text],
      y: "+=8",
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

    scene.tweens.add({
      targets: [icon, shadow],
      y: "+=8",
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

    scene.tweens.add({
      targets: shadow,
      scaleX: 1.1,
      scaleY: 0.9,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

    const speechBubble = scene.add
      .text(item.x, item.y - 50, "PRESS SPACE", {
        fontFamily: "PixelFont",
        fontSize: "12px",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 4, y: 4 }
      })
      .setOrigin(0.5)
      .setVisible(false);

    speechBubbles[item.key] = speechBubble;
  });

  return { icons, speechBubbles };
};
