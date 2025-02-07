import Phaser from "phaser";

import { mainPreload } from "./functions/preload";
import {
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

export default class GameScene extends Phaser.Scene {
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

        if (this.input.keyboard) {
          setPlayerInputs(this.input.keyboard, player);
        }
      }
    }

    createTitleTexts(this, language);

    // 플레이어,타일 영역 디버그용

    // const debugGraphics = this.add.graphics().setAlpha(0.7);
    // wallsLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 243, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 27, 255),
    // });

    // this.physics.add.collider(player, cat);
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
  }
}
