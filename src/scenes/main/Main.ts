import Phaser from "phaser";

import { mainPreload } from "./functions/preload";
import {
  createOctocat,
  createIcons,
  createLayers,
  createMap,
  createTileset,
  createTitleTexts
} from "./functions/create";
import { initPlayerCollider } from "./functions/collider";
import { initPlayerCamera } from "./functions/camera";
import { createCatAnims } from "./functions/anims";

import { handleInteraction } from "./functions/interaction";
import {
  createClothesAnims,
  createHairAnims,
  createPlayerAnims,
  createWeaponAnims
} from "../../shared/functions/anims";
import { createPlayer } from "../../shared/functions/create";
import {
  hairPreload,
  playerClothesPreload,
  playerPreload,
  weaponPreload
} from "../../shared/functions/preload";
import {
  setPlayerInputs,
  setPlayerWeaponInputs
} from "../../shared/functions/keyboard_inputs";
import { orcPreload } from "../town/functions/preload";
import { createOrc } from "../town/functions/create";
import { createOrcAnims } from "../town/functions/anims";
import { updateMonster } from "../town/functions/interaction";
import { Monster } from "../town/types";

export default class GameScene extends Phaser.Scene {
  private speechBubbles!: { [key: string]: Phaser.GameObjects.Text };
  private currentBubble!: Phaser.GameObjects.Text | null;
  private isCatDistanceOn!: boolean;
  private monsters: Monster[] = [];

  constructor() {
    super("main");
  }

  init(data: { language: string }) {
    this.data.set("language", data.language);
  }

  preload() {
    mainPreload(this);
    playerPreload(this);
    weaponPreload(this);
    hairPreload(this, 2);
    playerClothesPreload(this, 1);
    orcPreload(this, 1);
  }

  create() {
    const map = createMap(this);
    const tileset = createTileset(map);
    const language = this.data.get("language");

    if (tileset) {
      const { wallLayer, wallObjectLayer } = createLayers(map, tileset, this);

      if (wallLayer && wallObjectLayer) {
        wallLayer.setCollisionByProperty({ isWall: true });
        wallObjectLayer.setCollisionByProperty({ isWall: true });

        const player = createPlayer(this);
        const octocat = createOctocat(this);
        const orc1 = createOrc(this, 1, this.monsters);
        const sword = this.data.get("sword");

        this.physics.add.collider(sword, wallLayer);
        this.physics.add.collider(sword, wallObjectLayer);

        initPlayerCollider(this, player, wallLayer);
        initPlayerCollider(this, player, wallObjectLayer);

        // ✅ 충돌이 안된다면 모든 타일 충돌 활성화
        wallLayer?.setCollisionBetween(1, 999);
        wallObjectLayer?.setCollisionBetween(1, 999);

        // this.cameras.main.startFollow(player, true);

        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        initPlayerCamera(this, { mapWidth, mapHeight }, player);

        createPlayerAnims(this);
        createCatAnims(this);
        createWeaponAnims(this);
        createClothesAnims(this);
        createHairAnims(this);
        createOrcAnims(this, 1);

        octocat.anims.play("octocat_idle");
        orc1.anims.play("orc_1_idle_front");

        const { icons, speechBubbles } = createIcons(this, language);
        icons.forEach((icon) => {
          this.physics.add.collider(player, icon);
        });

        this.speechBubbles = speechBubbles;

        if (this.input.keyboard) {
          setPlayerInputs(this, this.input.keyboard, player);
          setPlayerWeaponInputs(this, this.input.keyboard);
          this.input.keyboard?.on("keydown-SPACE", () =>
            handleInteraction(
              this,
              this.currentBubble,
              this.speechBubbles,
              this.isCatDistanceOn
            )
          );
        }
      }
    }

    createTitleTexts(this, language);
  }

  update() {
    const player = this.data.get("player");
    const sword = this.data.get("sword");
    const clothes = this.data.get("clothes");
    const hair = this.data.get("hair");
    const map = this.data.get("map");
    const octocat = this.data.get("octocat");
    const wallLayer = this.data.get("wallLayer");

    const wallObjectLayer = this.data.get("wallObjectLayer");

    if (player) {
      this.monsters.forEach((monster) => {
        updateMonster(monster, player, this, wallLayer, wallObjectLayer);
      });
    }

    sword.x = player.x;
    sword.y = player.y;

    clothes.x = player.x;
    clothes.y = player.y;

    hair.x = player.x;
    hair.y = player.y;

    // 맵의 크기를 가져옵니다.
    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;
    player.update();
    if (
      player.x < 0 ||
      player.y < 0 ||
      player.x > mapWidth ||
      player.y > mapHeight
    ) {
      this.scene.start("town-scene");
    }

    if (this.currentBubble) {
      this.currentBubble.setVisible(false);
      this.currentBubble = null;
    }

    if (octocat) {
      const distance = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        octocat.x,
        octocat.y
      );

      if (distance < 50) {
        if (!this.data.get("catBubble")) {
          const catBubble = this.add
            .text(octocat.x, octocat.y - 50, "🐱 Go GitHub!", {
              fontFamily: "PixelFont",
              fontSize: "12px",
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: { x: 8, y: 4 }
            })
            .setOrigin(0.5)
            .setDepth(15)
            .setVisible(true);

          this.isCatDistanceOn = true;
          this.data.set("catBubble", catBubble);
        } else {
          this.data.get("catBubble").setVisible(true);
        }
      } else {
        if (this.data.get("catBubble")) {
          this.isCatDistanceOn = false;
          this.data.get("catBubble").setVisible(false);
        }
      }
    }

    Object.entries(this.speechBubbles).forEach(([key, bubble]) => {
      const icon = this.data.get(key) as Phaser.GameObjects.Image;

      if (
        icon &&
        Phaser.Math.Distance.Between(player.x, player.y, icon.x, icon.y) < 50
      ) {
        bubble.setVisible(true);
        this.currentBubble = bubble;
      }
    });
  }
}
