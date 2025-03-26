import type { RexUIScene } from "./functions/dialogue";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import { createPlayer } from "../../shared/functions/create";
import { setPlayerInputs } from "../../shared/functions/keyboard_inputs";
import {
  clothesPreload,
  hairPreload,
  playerPreload,
  weaponPreload
} from "../../shared/functions/preload";
import { initPlayerCollider } from "../main/functions/collider";
import { createJinAnims } from "./functions/anims";
import {
  createJin,
  createLayers,
  createMap,
  createTileset
} from "./functions/create";
import {
  createTextBox,
  downloadResume,
  openHtmlDialog,
  showModalWithIframe,
  showOptions,
  startDialog
} from "./functions/dialogue";
import { firstFloorPreload } from "./functions/preload";

export default class FirstFloorScene
  extends Phaser.Scene
  implements RexUIScene
{
  private language: "ko" | "en" = "ko";
  private selectedHairIndex: number = 1;
  private selectedClothesIndex: number = 1;
  private insertScene: string = "main";
  rexUI!: RexUIPlugin;

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
    createJinAnims(this);

    const jin = createJin(this);

    const map = createMap(this);
    const tileset = createTileset(map);

    this.physics.add.collider(player, jin, () => {
      if (this.data.get("isTalking")) return;

      this.data.set("isTalking", true);

      const textBox = createTextBox(this);

      startDialog(textBox, [
        "안녕하세요. 저는 개발자 진입니다.",
        "제 경력에 대해 궁금하신가요?"
      ]).then(() => {
        showOptions(
          this,
          [
            "자기소개 보기",
            "회사 이력 보기",
            "프로젝트 경험 보기",
            "이력서 다운로드",
            "떠나기"
          ],
          (choice) => {
            switch (choice) {
              case "자기소개 보기":
                showModalWithIframe(
                  "자기소개",
                  "/assets/htmls/about_me.html",
                  this
                );
                break;
              case "회사 이력 보기":
                openHtmlDialog("career.html");
                break;
              case "프로젝트 경험 보기":
                openHtmlDialog("project.html");
                break;
              case "이력서 다운로드":
                downloadResume("resume.pdf");
                break;
              case "떠나기":
                textBox.setVisible(false);
                break;
            }

            this.data.set("isTalking", false);
          }
        );
      });
    });

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
