import type { Player } from "../../../shared/types";
import { Monster } from "../types";

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

export const createOrc = (
  scene: Phaser.Scene,
  numbering: number,
  monsters: Monster[],
  patrolPoints: { x: number; y: number }[],
  spawnPoint: { x: number; y: number },
  speed: number
): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody => {
  const orc = scene.physics.add.sprite(
    spawnPoint.x,
    spawnPoint.y,
    `orc_${numbering}_idle_front`
  );

  orc.body.immovable = true;
  orc.setCollideWorldBounds(true);
  orc.body.offset.y = 7;
  orc.scale = 2;
  scene.data.set("orc", orc);

  monsters.push({
    sprite: orc,
    speed,
    chaseRange: 200,
    attackRange: 50,
    patrolPoints,
    patrolIndex: 0,
    side: "front",
    isAttack: false,
    lastDirection: "front",
    numbering,
    isHit: false,
    hp: numbering === 1 ? 10 : numbering === 2 ? 30 : 100
  });

  return orc;
};
