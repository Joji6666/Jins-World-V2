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
import type { Player } from "../../shared/types";
import { setTownPlayerInput } from "./functions/inputs";
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
import { updateMonster } from "./functions/interaction";
import {
  createBossAnims,
  createHouseAnims,
  createMonsterFxAnims,
  createOrcAnims,
  createPlantAnims
} from "./functions/anims";

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
        createOrc(
          this,
          1,
          this.monsters,
          [
            { x: 600, y: 400 },
            { x: 600, y: 500 },
            { x: 800, y: 600 },
            { x: 800, y: 700 }
          ],
          { x: 800, y: 900 },
          50,
          50
        );
        createOrc(
          this,
          1,
          this.monsters,
          [
            { x: 450, y: -300 },
            { x: 300, y: 200 },
            { x: 400, y: 400 },
            { x: 600, y: 300 }
          ],
          { x: 900, y: 700 },
          50,
          50
        );

        createOrc(
          this,
          2,
          this.monsters,
          [
            { x: 550, y: -400 },
            { x: 700, y: 200 },
            { x: 600, y: 400 },
            { x: 700, y: 300 }
          ],
          { x: 900, y: 900 },
          70,
          70
        );

        createOrc(
          this,
          3,
          this.monsters,
          [
            { x: 650, y: -400 },
            { x: 600, y: 800 },
            { x: 600, y: 900 },
            { x: 800, y: 800 }
          ],
          { x: 950, y: 700 },
          100,
          100
        );

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
        const wallLayer = this.data.get("wallLayer");

        const treeLayer = this.data.get("treeLayer");

        this.monsters.forEach((monster) => {
          updateMonster(monster, player, this, wallLayer, treeLayer);
        });
      }
    }
  }
}
