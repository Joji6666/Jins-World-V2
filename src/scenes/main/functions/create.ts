import type { Player } from "../../../shared/types";

const arrowTextStyle = {
  fontFamily: "Arial",
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
    .sprite(300, 300, `jin`)
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
  scene.add.text(100, 50, "Introduce", {
    fontFamily: "Arial",
    fontSize: "24px",
    color: "#000000",
    align: "center"
  });

  scene.add.text(1050, 100, language !== "ko" ? "How To Move" : "조작 방법", {
    fontFamily: "Arial",
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
};
