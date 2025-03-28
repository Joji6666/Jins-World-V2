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
  createLightEffectAnims,
  createPlayerAnims,
  createWeaponAnims
} from "../../shared/functions/anims";
import { createLightEffect, createPlayer } from "../../shared/functions/create";
import {
  hairPreload,
  clothesPreload,
  playerPreload,
  weaponPreload,
  sharedFxPreload
} from "../../shared/functions/preload";
import { setPlayerInputs } from "../../shared/functions/keyboard_inputs";

export default class GameScene extends Phaser.Scene {
  private speechBubbles!: { [key: string]: Phaser.GameObjects.Text };
  private currentBubble!: Phaser.GameObjects.Text | null;
  private isCatDistanceOn!: boolean;

  private selectedHairIndex: number = 1;
  private selectedClothesIndex: number = 1;

  constructor() {
    super("main");
  }

  init(data: { language: string; hairIndex: number; clothesIndex: number }) {
    this.data.set("language", data.language);
    this.selectedHairIndex = data.hairIndex;
    this.selectedClothesIndex = data.clothesIndex;
  }

  preload() {
    mainPreload(this);
    playerPreload(this);
    weaponPreload(this);
    hairPreload(this, this.selectedHairIndex);
    clothesPreload(this, this.selectedClothesIndex);
    sharedFxPreload(this);
  }

  create() {
    const map = createMap(this);
    const tileset = createTileset(map);
    const language = this.data.get("language");
    createPlayerAnims(this);

    createWeaponAnims(this);
    createClothesAnims(this);
    createHairAnims(this);
    createLightEffectAnims(this);

    if (tileset) {
      const { wallLayer, wallObjectLayer } = createLayers(map, tileset, this);

      if (wallLayer && wallObjectLayer) {
        wallLayer.setCollisionByProperty({ isWall: true });
        wallObjectLayer.setCollisionByProperty({ isWall: true });

        const player = createPlayer(this, { x: 800, y: 700 });
        const booksLightEffect = createLightEffect(this, { x: 577, y: 295 });
        const sword = this.data.get("sword");
        this.data.set("booksLightEffect", booksLightEffect);

        this.physics.add.collider(sword, wallLayer);
        this.physics.add.collider(sword, wallObjectLayer);

        initPlayerCollider(this, player, wallLayer);
        initPlayerCollider(this, player, wallObjectLayer);

        wallLayer?.setCollisionBetween(1, 999);
        wallObjectLayer?.setCollisionBetween(1, 999);

        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        initPlayerCamera(this, { mapWidth, mapHeight }, player);

        const { icons, speechBubbles } = createIcons(this, language);

        this.speechBubbles = speechBubbles;

        if (this.input.keyboard) {
          setPlayerInputs(this, this.input.keyboard, player);

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
    const booksLightEffect = this.data.get("booksLightEffect");

    sword.x = player.x;
    sword.y = player.y;

    clothes.x = player.x;
    clothes.y = player.y;

    hair.x = player.x;
    hair.y = player.y;

    player.update();
    if (player.x > 881 && player.x < 883 && player.y > 317 && player.y < 319) {
      this.scene.start("first-floor", {
        hairIndex: this.selectedHairIndex,
        clothesIndex: this.selectedClothesIndex,
        language: this.data.get("language"),
        insertScene: "main"
      });
    }

    if (this.currentBubble) {
      this.currentBubble.setVisible(false);
      this.currentBubble = null;
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

    if (booksLightEffect) {
      const distance = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        booksLightEffect.x,
        booksLightEffect.y
      );

      if (distance < 90) {
        if (!this.data.get("booksBubble")) {
          const booksBubble = this.add
            .text(booksLightEffect.x, booksLightEffect.y - 50, "PRESS SPACE", {
              fontFamily: "KoreanPixelFont",
              fontSize: "20px",
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: { x: 8, y: 4 }
            })
            .setOrigin(0.5)
            .setDepth(15)
            .setVisible(true);

          this.data.set("booksBubble", booksBubble);
        }
      } else {
        const booksBubble: Phaser.GameObjects.Text =
          this.data.get("booksBubble");

        if (booksBubble) {
          booksBubble.setVisible(false);
          booksBubble.destroy();
          this.data.set("booksBubble", null);
        }
      }
    }
  }
}
