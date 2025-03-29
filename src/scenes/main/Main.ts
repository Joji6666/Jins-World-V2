import Phaser from "phaser";

import { mainPreload } from "./functions/preload";
import {
  createOctocat,
  createIcons,
  createLayers,
  createMap,
  createTileset
} from "./functions/create";
import { initPlayerCollider } from "./functions/collider";
import { initPlayerCamera } from "./functions/camera";
import { createCatAnims } from "./functions/anims";

import { handleInteraction } from "./functions/interaction";
import {
  createArrowAnims,
  createClothesAnims,
  createHairAnims,
  createLightEffectAnims,
  createPlayerAnims,
  createWeaponAnims
} from "../../shared/functions/anims";
import {
  createArrow,
  createLightEffect,
  createMuteToggleButton,
  createPlayer
} from "../../shared/functions/create";
import {
  hairPreload,
  clothesPreload,
  playerPreload,
  weaponPreload,
  sharedFxPreload,
  arrowPreload
} from "../../shared/functions/preload";
import { setPlayerInputs } from "../../shared/functions/keyboard_inputs";
import {
  createTextBox,
  RexUIScene,
  showModalWithIframe,
  showModalWithImage,
  startDialog
} from "../first-floor/functions/dialogue";
import type RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

export default class GameScene extends Phaser.Scene implements RexUIScene {
  rexUI!: RexUIPlugin;
  private speechBubbles!: { [key: string]: Phaser.GameObjects.Text };
  private currentBubble!: Phaser.GameObjects.Text | null;
  private isCatDistanceOn!: boolean;

  private selectedHairIndex: number = 1;
  private selectedClothesIndex: number = 1;
  private insertScene: string = "intro";

  constructor() {
    super("main");
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
    mainPreload(this);
    playerPreload(this);
    weaponPreload(this);
    hairPreload(this, this.selectedHairIndex);
    clothesPreload(this, this.selectedClothesIndex);
    sharedFxPreload(this);
    arrowPreload(this);
  }

  create() {
    const map = createMap(this);
    const tileset = createTileset(map);
    const language = this.data.get("language");
    createMuteToggleButton(this);

    const bgm = this.sound.add("main_bgm", {
      volume: 0.35,
      loop: true
    });

    if (this.insertScene === "intro") {
      bgm.play();
    }

    this.data.set("mainBgm", bgm);

    const flapSound = this.sound.add("flap", {
      volume: 0.9,
      loop: false
    });

    this.data.set("flapSound", flapSound);

    createPlayerAnims(this);
    createArrowAnims(this);
    createWeaponAnims(this);
    createClothesAnims(this);
    createHairAnims(this);
    createLightEffectAnims(this);

    const arrow = createArrow(this, { x: 915, y: 220 });

    const macbook = this.physics.add.image(540, 470, "macbook");
    macbook.depth = 30;
    macbook.setScale(0.06);

    const macbookLightEffect = createLightEffect(this, {
      x: macbook.x,
      y: macbook.y
    });
    this.data.set("macbookLightEffect", macbookLightEffect);

    if (tileset) {
      const { wallLayer, wallObjectLayer } = createLayers(map, tileset, this);

      if (wallLayer && wallObjectLayer) {
        wallLayer.setCollisionByProperty({ isWall: true });
        wallObjectLayer.setCollisionByProperty({ isWall: true });

        const player = createPlayer(this, {
          x: this.insertScene === "intro" ? 500 : 850,
          y: this.insertScene === "intro" ? 600 : 300
        });
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

          this.input.keyboard?.on("keydown-SPACE", () => {
            const booksBubble = this.data.get("booksBubble");

            if (booksBubble) {
              if (this.data.get("isTalking")) return;

              this.data.set("isTalking", true);

              const textBox = createTextBox(this);

              startDialog(textBox, [
                "여러 책들이 보인다.",
                "집주인이 읽은 책들인가 보다."
              ]).then(() => {
                showModalWithImage(
                  "/assets/books.jpg",

                  this,
                  textBox
                );
              });
            }

            const macbookBubble = this.data.get("macbookBubble");

            if (macbookBubble) {
              if (this.data.get("isTalking")) return;

              this.data.set("isTalking", true);

              const textBox = createTextBox(this);

              startDialog(textBox, [
                "오래된 구형 맥북이다.",
                "이 맥북으로 개발을 시작했나보다."
              ]).then(() => {
                showModalWithImage(
                  "/assets/macbook.jpg",

                  this,
                  textBox
                );
              });
            }

            handleInteraction(
              this,
              this.currentBubble,
              this.speechBubbles,
              this.isCatDistanceOn
            );
          });
        }
      }
    }
  }

  update() {
    const player = this.data.get("player");
    const sword = this.data.get("sword");
    const clothes = this.data.get("clothes");
    const hair = this.data.get("hair");
    const booksLightEffect = this.data.get("booksLightEffect");
    const macbookLightEffect = this.data.get("macbookLightEffect");

    sword.x = player.x;
    sword.y = player.y;

    clothes.x = player.x;
    clothes.y = player.y;

    hair.x = player.x;
    hair.y = player.y;

    player.update();
    if (player.x > 881 && player.x < 883 && player.y > 317 && player.y < 319) {
      const bgm:
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound
        | Phaser.Sound.WebAudioSound = this.data.get("mainBgm");

      const flapSound:
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound
        | Phaser.Sound.WebAudioSound = this.data.get("flapSound");

      flapSound.play();
      this.scene.start("first-floor", {
        hairIndex: this.selectedHairIndex,
        clothesIndex: this.selectedClothesIndex,
        language: this.data.get("language"),
        insertScene: "main",
        bgm,
        flapSound
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
            .text(
              booksLightEffect.x,
              booksLightEffect.y - 50,
              "스페이스바를 눌러보세요!",
              {
                fontFamily: "KoreanPixelFont",
                fontSize: "20px",
                color: "#ffffff",
                backgroundColor: "#000000",
                padding: { x: 8, y: 4 }
              }
            )
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

    if (macbookLightEffect) {
      const distance = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        macbookLightEffect.x,
        macbookLightEffect.y
      );

      if (distance < 90) {
        if (!this.data.get("macbookBubble")) {
          const macbookBubble = this.add
            .text(
              macbookLightEffect.x,
              macbookLightEffect.y - 50,
              "스페이스바를 눌러보세요!",
              {
                fontFamily: "KoreanPixelFont",
                fontSize: "20px",
                color: "#ffffff",
                backgroundColor: "#000000",
                padding: { x: 8, y: 4 }
              }
            )
            .setOrigin(0.5)
            .setDepth(15)
            .setVisible(true);

          this.data.set("macbookBubble", macbookBubble);
        }
      } else {
        const macbookBubble: Phaser.GameObjects.Text =
          this.data.get("macbookBubble");

        if (macbookBubble) {
          macbookBubble.setVisible(false);
          macbookBubble.destroy();
          this.data.set("macbookBubble", null);
        }
      }
    }
  }
}
