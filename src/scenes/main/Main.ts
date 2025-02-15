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
import { createPlayerAnims } from "../../shared/functions/anims";
import { createPlayer } from "../../shared/functions/create";
import { playerPreload } from "../../shared/functions/preload";
import { setPlayerInputs } from "../../shared/functions/keyboard_inputs";

export default class GameScene extends Phaser.Scene {
  private speechBubbles!: { [key: string]: Phaser.GameObjects.Text };
  private currentBubble!: Phaser.GameObjects.Text | null;
  private isCatDistanceOn!: boolean;

  constructor() {
    super("main");
  }

  init(data: { language: string }) {
    this.data.set("language", data.language);
  }

  preload() {
    mainPreload(this);
    playerPreload(this);
  }

  create() {
    const map = createMap(this);
    const tileset = createTileset(map);
    const language = this.data.get("language");

    if (tileset) {
      const { etcLayer, wallsLayer } = createLayers(map, tileset);

      if (etcLayer && wallsLayer) {
        wallsLayer.setCollisionByProperty({ colides: true });
        etcLayer.setCollisionByProperty({ colides: true });

        const player = createPlayer(this);
        const octocat = createOctocat(this);

        initPlayerCollider(this, player, wallsLayer);
        initPlayerCollider(this, player, etcLayer);

        // this.cameras.main.startFollow(player, true);

        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        initPlayerCamera(this, { mapWidth, mapHeight }, player);

        createPlayerAnims(this);
        createCatAnims(this);

        player.anims.play("player_idle_front");
        octocat.anims.play("octocat_idle");

        const { icons, speechBubbles } = createIcons(this, language);
        icons.forEach((icon) => {
          this.physics.add.collider(player, icon);
        });

        this.speechBubbles = speechBubbles;

        if (this.input.keyboard) {
          setPlayerInputs(this.input.keyboard, player);
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
    const map = this.data.get("map");
    const octocat = this.data.get("octocat");

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
