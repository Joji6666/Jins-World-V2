import type { Player } from "../../../shared/types";
import { Monster, Plant } from "../types";
import { updateHPBar, updateHPBarPosition } from "./interaction";

export const createTownMap = (scene: Phaser.Scene): Phaser.Tilemaps.Tilemap => {
  const map = scene.make.tilemap({ key: "town-map" });
  scene.data.set("town-map", map);
  return map;
};

export const createTownTileset = (
  map: Phaser.Tilemaps.Tilemap
): Phaser.Tilemaps.Tileset | null => {
  const tileset = map.addTilesetImage(
    "gentle forest (48x48 resize) v01",
    "gentle forest (48x48 resize) v01"
  );

  return tileset;
};

export const createTownLayers = (
  map: Phaser.Tilemaps.Tilemap,
  titleset: Phaser.Tilemaps.Tileset,
  scene: Phaser.Scene
): {
  treeLayer: Phaser.Tilemaps.TilemapLayer | null;
  wallLayer: Phaser.Tilemaps.TilemapLayer | null;
} => {
  const floorLayer = map.createLayer("floor", titleset);
  const floorChildLayer = map.createLayer("floor_child", titleset);
  const treeLayer = map.createLayer("tree", titleset);
  const treeTopChildLayer = map.createLayer("tree-top-child", titleset);
  const treeTopLayer = map.createLayer("tree_top", titleset);
  const wallLayer = map.createLayer("wall", titleset);

  scene.data.set("wallLayer", wallLayer);

  scene.data.set("treeLayer", treeLayer);

  console.log(treeTopLayer, "treeTopLayer");
  console.log(treeTopChildLayer, "treeTopChildLayer");
  if (treeTopLayer && treeTopChildLayer) {
    treeTopLayer.setDepth(100);
    treeTopChildLayer.setDepth(100);

    console.log(treeTopChildLayer.depth);
  }

  return { treeLayer, wallLayer };
};

export const createHouse = (
  scene: Phaser.Scene
): Phaser.Types.Physics.Arcade.SpriteWithStaticBody => {
  const house = scene.physics.add.staticSprite(350, 250, `house`);
  house.anims.play("house_stop");

  house.setScale(3.75);
  house.setOrigin(0.5, 0.5);
  house.refreshBody();

  house.body.setSize(310, 220);

  house.body.setOffset(
    house.displayWidth / 2 - 155,
    house.displayHeight / 2 - 110
  );

  scene.data.set("house", house);

  return house;
};

export const createOrc = (
  scene: Phaser.Scene,
  numbering: number,
  monsters: Monster[],
  patrolPoints: { x: number; y: number }[],
  spawnPoint: { x: number; y: number },
  speed: number,
  attackRange: number
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

  const monsterName = scene.add
    .text(
      orc.x,
      orc.y - 50,
      numbering === 1 ? "404_Orc" : numbering === 2 ? "403_Orc" : "400_orc",
      {
        fontSize: "12px",
        color: "#FFFFFF",
        fontStyle: "bold",
        fontFamily: "KoreanPixelFont"
      }
    )
    .setOrigin(0.5, 0.5);

  const hpBar = scene.add.graphics();
  hpBar.setDepth(70);

  const x = orc.x - 25;
  const y = orc.y - 40;
  const width = 50;
  const height = 6;

  hpBar.fillStyle(0x000000);
  hpBar.fillRect(x - 1, y - 1, width + 2, height + 2);

  hpBar.fillStyle(0xff0000);
  hpBar.fillRect(x, y, width, height);

  scene.time.addEvent({
    delay: 16,
    loop: true,
    callback: () => {
      monsterName.setPosition(orc.x, orc.y - 50);
    }
  });

  monsters.push({
    sprite: orc,
    speed,
    chaseRange: 300,
    attackRange,
    patrolPoints,
    patrolIndex: 0,
    side: "front",
    isAttack: false,
    lastDirection: "front",
    numbering,
    isHit: false,
    hp: numbering === 1 ? 10 : numbering === 2 ? 30 : 100,
    monsterName,
    hpBar
  });

  return orc;
};

export const createBoss = (
  scene: Phaser.Scene,
  monsters: Monster[]
): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody => {
  const boss = scene.physics.add.sprite(1200, 400, `boss_idle_left`);

  boss.body.immovable = true;
  boss.setCollideWorldBounds(true);
  boss.body.offset.y = 7;
  boss.scale = 2;
  scene.data.set("boss", boss);

  const monsterName = scene.add
    .text(boss.x, boss.y - 70, "500_Boss", {
      fontSize: "14px",
      color: "#FFFFFF",
      fontStyle: "bold",
      fontFamily: "KoreanPixelFont"
    })
    .setOrigin(0.5, 0.5);

  scene.time.addEvent({
    delay: 16,
    loop: true,
    callback: () => {
      monsterName.setPosition(boss.x, boss.y - 70);
    }
  });

  const hpBar = scene.add.graphics();
  hpBar.setDepth(70);

  monsters.push({
    sprite: boss,
    speed: 120,
    chaseRange: 300,
    attackRange: 550,
    patrolPoints: [],
    patrolIndex: 0,
    side: "right",
    isAttack: false,
    lastDirection: "right",
    numbering: 10,
    isHit: false,
    hp: 300,
    monsterName,
    hpBar
  });

  return boss;
};

export const createPlant = (
  scene: Phaser.Scene,
  plants: Plant[]
): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody => {
  const plant = scene.physics.add.sprite(900, 700, `plant_idle_left`);

  plant.body.immovable = true;
  plant.setCollideWorldBounds(true);
  plant.body.offset.y = 7;
  plant.scale = 2;

  plant.anims.play("plant_idle_front");

  plants.push({
    sprite: plant,

    side: "front",
    isAttack: false,
    lastDirection: "front"
  });

  return plant;
};
