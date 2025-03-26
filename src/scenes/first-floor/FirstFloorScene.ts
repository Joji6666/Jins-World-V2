import {
  createClothesAnims,
  createHairAnims,
  createPlayerAnims,
  createWeaponAnims
} from "../../shared/functions/anims";
import { createHPBar, createPlayer } from "../../shared/functions/create";
import { setPlayerInputs } from "../../shared/functions/keyboard_inputs";
import {
  clothesPreload,
  hairPreload,
  playerPreload,
  weaponPreload
} from "../../shared/functions/preload";
import { initPlayerCollider } from "../main/functions/collider";
import { createLayers, createMap, createTileset } from "./functions/create";
import { firstFloorPreload } from "./functions/preload";

export default class FirstFloorScene extends Phaser.Scene {
  private language: "ko" | "en" = "ko";
  private selectedHairIndex: number = 1;
  private selectedClothesIndex: number = 1;
  private insertScene: string = "main";

  constructor() {
    super("first-floor");
  }
  init(data: {
    language: string;
    hairIndex: number;
    clothesIndex: number;
    insertScene: string;
  }) {
    this.data.set("language", data.language);
    this.selectedHairIndex = data.hairIndex;
    this.selectedClothesIndex = data.clothesIndex;
    this.insertScene = data.insertScene;
  }

  preload() {
    firstFloorPreload(this);
    playerPreload(this);
    weaponPreload(this);
    hairPreload(this, this.selectedHairIndex);
    clothesPreload(this, this.selectedClothesIndex);
  }

  create() {
    const player = createPlayer(this, {
      x: this.insertScene === "town" ? 700 : 850,
      y: this.insertScene === "town" ? 880 : 200
    });

    const map = createMap(this);
    const tileset = createTileset(map);

    if (tileset) {
      const { wallLayer, wallObjectLayer, secondWallObjectLayer } =
        createLayers(map, tileset, this);

      if (wallLayer && wallObjectLayer && secondWallObjectLayer) {
        wallLayer.setCollisionByProperty({ isWall: true });
        wallObjectLayer.setCollisionByProperty({ isWall: true });
        secondWallObjectLayer.setCollisionByProperty({ isWall: true });

        initPlayerCollider(this, player, wallLayer);
        initPlayerCollider(this, player, wallObjectLayer);
        initPlayerCollider(this, player, secondWallObjectLayer);

        wallLayer.setCollisionBetween(1, 999);
        wallObjectLayer.setCollisionBetween(1, 999);
        secondWallObjectLayer.setCollisionBetween(1, 999);
      }
    }

    if (this.input.keyboard) {
      setPlayerInputs(this, this.input.keyboard, player);
    }
  }

  update() {
    const player = this.data.get("player");
    const sword = this.data.get("sword");
    const clothes = this.data.get("clothes");
    const hair = this.data.get("hair");
    sword.x = player.x;
    sword.y = player.y;

    clothes.x = player.x;
    clothes.y = player.y;

    hair.x = player.x;
    hair.y = player.y;

    if (player.y > 907) {
      this.scene.start("town-scene");
    }
  }
}
