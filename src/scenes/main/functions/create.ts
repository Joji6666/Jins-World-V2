import type { Player } from "../../../shared/types";

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
