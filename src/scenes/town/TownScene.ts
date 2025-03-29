import Phaser from "phaser";
import {
  bossPreload,
  monsterFxPreload,
  orcPreload,
  plantPreload,
  townPreload
} from "./functions/preload";
import {
  createBoss,
  createHouse,
  createOrc,
  createPlant,
  createTownLayers,
  createTownMap,
  createTownTileset
} from "./functions/create";
import { initTownCamera, initTownPlayerCamera } from "./functions/camera";

import {
  createClothesAnims,
  createHairAnims,
  createPlayerAnims,
  createWeaponAnims
} from "../../shared/functions/anims";
import {
  clothesPreload,
  hairPreload,
  playerPreload,
  weaponPreload
} from "../../shared/functions/preload";
import { createHPBar, createPlayer } from "../../shared/functions/create";
import { Monster, Plant } from "./types";
import { initPlayerCollider } from "../main/functions/collider";
import {
  setPlayerInputs,
  setPlayerWeaponInputs
} from "../../shared/functions/keyboard_inputs";
import { handleInteraction } from "../main/functions/interaction";
import { updateHPBarPosition, updateMonster } from "./functions/interaction";
import {
  createBossAnims,
  createHouseAnims,
  createMonsterFxAnims,
  createOrcAnims,
  createPlantAnims
} from "./functions/anims";

interface OrcSpawnData {
  numbering: number;
  spawn: { x: number; y: number };
  speed: number;
  attackRange: number;
  patrolPoints?: { x: number; y: number }[];
  initialDirection?: "left" | "right";
}

const orcSpawnList: OrcSpawnData[] = [
  {
    numbering: 1,
    spawn: { x: 800, y: 900 },
    speed: 50,
    attackRange: 50,
    initialDirection: "right"
  },
  {
    numbering: 1,
    spawn: { x: 850, y: 900 },
    speed: 50,
    attackRange: 50,
    initialDirection: "left"
  },
  { numbering: 1, spawn: { x: 825, y: 850 }, speed: 50, attackRange: 50 },
  { numbering: 1, spawn: { x: 900, y: 700 }, speed: 50, attackRange: 50 },
  {
    numbering: 1,
    spawn: { x: 1700, y: 1400 },
    speed: 50,
    attackRange: 50,
    initialDirection: "right"
  },
  {
    numbering: 1,
    spawn: { x: 1800, y: 1350 },
    speed: 50,
    attackRange: 50,
    initialDirection: "left"
  },
  { numbering: 1, spawn: { x: 1750, y: 1300 }, speed: 50, attackRange: 50 },
  { numbering: 1, spawn: { x: 1700, y: 1380 }, speed: 50, attackRange: 50 },
  { numbering: 2, spawn: { x: 900, y: 900 }, speed: 70, attackRange: 70 },
  {
    numbering: 1,
    spawn: { x: 2500, y: 1400 },
    speed: 50,
    attackRange: 50,
    initialDirection: "right"
  },
  {
    numbering: 1,
    spawn: { x: 2400, y: 1350 },
    speed: 50,
    attackRange: 50,
    initialDirection: "left"
  },
  { numbering: 1, spawn: { x: 2600, y: 1300 }, speed: 50, attackRange: 50 },
  { numbering: 1, spawn: { x: 2500, y: 1380 }, speed: 50, attackRange: 50 },
  { numbering: 2, spawn: { x: 2400, y: 1300 }, speed: 70, attackRange: 70 },
  { numbering: 3, spawn: { x: 1700, y: 900 }, speed: 100, attackRange: 100 },
  { numbering: 1, spawn: { x: 2600, y: 1600 }, speed: 50, attackRange: 50 },
  { numbering: 1, spawn: { x: 2700, y: 1680 }, speed: 50, attackRange: 50 },
  { numbering: 2, spawn: { x: 2650, y: 1640 }, speed: 70, attackRange: 70 },
  {
    numbering: 1,
    spawn: { x: 2700, y: 2150 },
    speed: 50,
    attackRange: 50,
    initialDirection: "right"
  },
  {
    numbering: 1,
    spawn: { x: 2800, y: 2200 },
    speed: 50,
    attackRange: 50,
    initialDirection: "left"
  },
  { numbering: 1, spawn: { x: 2600, y: 2050 }, speed: 50, attackRange: 50 },
  { numbering: 1, spawn: { x: 2400, y: 2050 }, speed: 50, attackRange: 50 },
  { numbering: 1, spawn: { x: 2650, y: 2100 }, speed: 50, attackRange: 50 },
  { numbering: 2, spawn: { x: 2650, y: 2100 }, speed: 70, attackRange: 70 },
  { numbering: 2, spawn: { x: 2350, y: 2000 }, speed: 70, attackRange: 70 },
  { numbering: 3, spawn: { x: 2600, y: 2100 }, speed: 100, attackRange: 100 },
  {
    numbering: 3,
    spawn: { x: 2200, y: 1600 },
    speed: 100,
    attackRange: 100,
    patrolPoints: [
      { x: 1100, y: 1100 },
      { x: 3000, y: 2100 }
    ]
  },
  {
    numbering: 3,
    spawn: { x: 900, y: 1700 },
    speed: 100,
    attackRange: 100,
    patrolPoints: [
      { x: 600, y: 800 },
      { x: 1200, y: 1300 },
      { x: 2200, y: 2300 }
    ]
  },
  {
    numbering: 3,
    spawn: { x: 2300, y: 400 },
    speed: 100,
    attackRange: 100,
    patrolPoints: [
      { x: 500, y: 800 },
      { x: 1500, y: 1600 },
      { x: 2500, y: 2700 }
    ]
  },

  {
    numbering: 3,
    spawn: { x: 800, y: 800 },
    speed: 100,
    attackRange: 100,
    patrolPoints: [
      { x: 300, y: 500 },
      { x: 1100, y: 1000 },
      { x: 2900, y: 2900 }
    ]
  }
];

export default class TownScene extends Phaser.Scene {
  private monsters: Monster[] = [];
  private plants: Plant[] = [];
  private selectedHairIndex: number = 1;
  private selectedClothesIndex: number = 1;

  constructor() {
    super("town-scene");
  }

  init(data: { language: string; hairIndex: number; clothesIndex: number }) {
    this.data.set("language", data.language);
    this.selectedHairIndex = data.hairIndex;
    this.selectedClothesIndex = data.clothesIndex;
    this.monsters = [];
  }

  preload() {
    townPreload(this);
    playerPreload(this);
    orcPreload(this, 1);
    orcPreload(this, 2);
    orcPreload(this, 3);
    bossPreload(this);
    plantPreload(this);
    monsterFxPreload(this);
    weaponPreload(this);
    hairPreload(this, this.selectedHairIndex);
    clothesPreload(this, this.selectedClothesIndex);
  }

  create() {
    const map = createTownMap(this);
    const tileset = createTownTileset(map);
    createPlayerAnims(this);

    createWeaponAnims(this);
    createClothesAnims(this);
    createHairAnims(this);
    createOrcAnims(this, 1);
    createOrcAnims(this, 2);
    createOrcAnims(this, 3);
    createMonsterFxAnims(this);
    createBossAnims(this);
    createPlantAnims(this);
    createHouseAnims(this);

    if (tileset) {
      const { treeLayer, wallLayer } = createTownLayers(map, tileset, this);

      if (wallLayer && treeLayer) {
        wallLayer.setCollisionByProperty({ colides: true });

        const player = createPlayer(this, { x: 350, y: 480 });
        createHPBar(this);
        initPlayerCollider(this, player, wallLayer);
        initPlayerCollider(this, player, treeLayer);
        const house = createHouse(this);

        this.physics.add.collider(player, house);

        wallLayer?.setCollisionBetween(1, 999);
        treeLayer?.setCollisionBetween(1, 999);

        createBoss(this, this.monsters);
        orcSpawnList.forEach((data) => {
          createOrc(
            this,
            data.numbering,
            this.monsters,
            data.patrolPoints || [],
            data.spawn,
            data.speed,
            data.attackRange,
            data.initialDirection
          );
        });

        createPlant(this, this.plants);

        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        const screenWidth = this.game.config.width;
        const screenHeight = this.game.config.height;

        initTownPlayerCamera(this.cameras.main, player);

        createPlayerAnims(this);

        initTownCamera(
          this.cameras.main,
          { mapWidth, mapHeight },
          {
            screenWidth: Number(screenWidth),
            screenHeight: Number(screenHeight)
          }
        );

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        player.setCollideWorldBounds(true);

        this.monsters.forEach((monster) => {
          this.physics.add.collider(wallLayer, monster.sprite);
          this.physics.add.collider(treeLayer, monster.sprite);
        });

        if (this.input.keyboard) {
          setPlayerInputs(this, this.input.keyboard, player);
          setPlayerWeaponInputs(this, this.input.keyboard, this.monsters);
        }
      }
    }
  }

  update(): void {
    const player = this.data.get("player");

    if (player) {
      const sword = this.data.get("sword");
      const clothes = this.data.get("clothes");
      const hair = this.data.get("hair");
      const house = this.data.get("house");

      sword.x = player.x;
      sword.y = player.y;

      clothes.x = player.x;
      clothes.y = player.y;

      hair.x = player.x;
      hair.y = player.y;

      player.update();

      if (player.y > 430 && player.x >= 325 && player.x <= 398) {
        house.anims.play("house_open");
      }

      if (
        player.x > 326 &&
        player.x < 398 &&
        player.y > 400 &&
        player.y < 410
      ) {
        this.scene.start("first-floor", {
          hairIndex: this.selectedHairIndex,
          clothesIndex: this.selectedClothesIndex,
          language: this.data.get("language"),
          insertScene: "town"
        });
      }

      if (this.monsters.length > 0) {
        this.monsters.forEach((monster) => {
          updateMonster(monster, player, this);
          updateHPBarPosition(
            monster.sprite,
            monster.hpBar,
            monster.hp,
            monster.numbering === 1
              ? 10
              : monster.numbering === 2
              ? 30
              : monster.numbering === 3
              ? 100
              : 300
          );
        });
      }
    }
  }
}
