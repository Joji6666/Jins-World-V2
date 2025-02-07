import type { Player } from "../../../shared/types";

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
  const tileset = map.addTilesetImage("tileset", "tiles");

  return tileset;
};

export const createLayers = (
  map: Phaser.Tilemaps.Tilemap,
  titleset: Phaser.Tilemaps.Tileset
): {
  groundLayer: Phaser.Tilemaps.TilemapLayer | null;
  etcLayer: Phaser.Tilemaps.TilemapLayer | null;
  wallsLayer: Phaser.Tilemaps.TilemapLayer | null;
} => {
  const groundLayer = map.createLayer("Ground", titleset);
  const etcLayer = map.createLayer("etc", titleset);
  const wallsLayer = map.createLayer("walls", titleset);

  return { groundLayer, etcLayer, wallsLayer };
};

export const createPlayer = (scene: Phaser.Scene): Player => {
  const player = scene.physics.add
    .sprite(1050, 325, `jin`)
    .setName("jin") as Player;
  player.moveState = "";
  player.body.immovable = true;
  player.body.offset.y = 7;
  scene.data.set("player", player);

  return player;
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
      key: "leaf",
      x: 200,
      y: 450,
      koreanText: "자기소개",
      englishText: "Introduce"
    },

    {
      key: "gift-box",
      x: 650,
      y: 450,
      koreanText: "프로젝트",
      englishText: "Projects"
    }
  ];

  items.forEach((item) => {
    const shadow = scene.add.graphics();
    shadow.fillStyle(0x000000, 0.3);
    shadow.fillEllipse(0, 0, 50, 20);
    shadow.setPosition(item.x, item.y + 20);

    const icon = scene.physics.add.image(item.x, item.y, item.key);
    icon.setImmovable(true);

    icon.body.setAllowGravity(false);
    icons.push(icon);
    scene.data.set(item.key, icon);

    const text = scene.add
      .text(
        icon.x,
        icon.y - 50,
        language !== "ko" ? item.englishText : item.koreanText,
        arrowTextStyle
      )
      .setOrigin(0.5, 0.5);

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
      .text(item.x, item.y - 50, "SPACE", {
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
