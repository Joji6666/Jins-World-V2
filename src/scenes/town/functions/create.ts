import type { Player } from "../../../shared/types";

export const createTownMap = (scene: Phaser.Scene): Phaser.Tilemaps.Tilemap => {
  const map = scene.make.tilemap({ key: "town-map" });
  scene.data.set("town-map", map);
  return map;
};

export const createTownTileset = (
  map: Phaser.Tilemaps.Tilemap
): Phaser.Tilemaps.Tileset | null => {
  const tileset = map.addTilesetImage("tileset2", "town-tiles");

  return tileset;
};

export const createTownLayers = (
  map: Phaser.Tilemaps.Tilemap,
  titleset: Phaser.Tilemaps.Tileset
): {
  groundLayer: Phaser.Tilemaps.TilemapLayer | null;

  wallsLayer: Phaser.Tilemaps.TilemapLayer | null;
} => {
  const groundLayer = map.createLayer("Ground", titleset);

  const wallsLayer = map.createLayer("walls", titleset);

  return { groundLayer, wallsLayer };
};

export const createTownPlayer = (scene: Phaser.Scene): Player => {
  const player = scene.physics.add
    .sprite(100, 300, `jin`)
    .setName("jin") as Player;
  player.moveState = "";
  player.body.immovable = true;
  player.body.offset.y = 7;
  scene.data.set("player", player);

  return player;
};
