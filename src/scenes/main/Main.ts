import Phaser from "phaser";

import { mainPreload } from "./functions/preload";
import {
  createIcons,
  createLayers,
  createMap,
  createPlayer,
  createTileset,
  createTitleTexts
} from "./functions/create";
import { initPlayerCollider } from "./functions/collider";
import { initPlayerCamera } from "./functions/camera";
import { createPlayerAnims } from "./functions/anims";
import { setPlayerInputs } from "./functions/inputs";

import { handleInteraction } from "./functions/interaction";

export default class GameScene extends Phaser.Scene {
  private speechBubbles!: { [key: string]: Phaser.GameObjects.Text };
  private currentBubble!: Phaser.GameObjects.Text | null;

  constructor() {
    super("main");
  }

  init(data: { language: string }) {
    this.data.set("language", data.language);
  }

  preload() {
    mainPreload(this);
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

        initPlayerCollider(this, player, wallsLayer);
        initPlayerCollider(this, player, etcLayer);

        // this.cameras.main.startFollow(player, true);

        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        initPlayerCamera(this, { mapWidth, mapHeight }, player);

        createPlayerAnims(this);

        const { icons, speechBubbles } = createIcons(this, language);
        icons.forEach((icon) => {
          this.physics.add.collider(player, icon);
        });

        this.speechBubbles = speechBubbles;

        if (this.input.keyboard) {
          setPlayerInputs(this.input.keyboard, player);
          this.input.keyboard?.on("keydown-SPACE", () =>
            handleInteraction(this, this.currentBubble, this.speechBubbles)
          );
        }
      }
    }

    createTitleTexts(this, language);
  }

  update() {
    const player = this.data.get("player");
    const map = this.data.get("map");

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
