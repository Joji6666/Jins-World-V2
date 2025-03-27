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
import { PLAYER_KEYS } from "../../shared/constants/keys";
import { createCatAnims } from "../main/functions/anims";
import { createOctocat } from "../main/functions/create";
import { handleInteraction } from "../main/functions/interaction";
import FixWidthButtons from "phaser3-rex-plugins/templates/ui/fixwidthbuttons/FixWidthButtons";

export default class FirstFloorScene
  extends Phaser.Scene
  implements RexUIScene
{
  private speechBubbles!: { [key: string]: Phaser.GameObjects.Text };
  private currentBubble!: Phaser.GameObjects.Text | null;
  private isCatDistanceOn!: boolean;
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
    createCatAnims(this);

    const octocat = createOctocat(this);
    octocat.anims.play("octocat_idle");

    console.log(octocat, "octocat@#@#");

    const { jin, jinClothes, jinHair } = createJin(this);

    const map = createMap(this);
    const tileset = createTileset(map);

    this.physics.add.collider(player, jin, () => {
      if (this.data.get("isTalking")) return;

      this.data.set("isTalking", true);
      const playerSide = this.data.get(PLAYER_KEYS.PLAYER_SIDE);

      const side =
        playerSide === "front"
          ? "back"
          : playerSide === "back"
          ? "front"
          : playerSide === "right"
          ? "left"
          : playerSide === "left"
          ? "right"
          : "right";

      jin.anims.play(`jin_${side}`);
      jinHair.anims.play(`jin_hair_${side}`);
      jinClothes.anims.play(`jin_clothes_${side}`);

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
            "프로젝트들 보기",
            "이력서 다운로드",
            "떠나기"
          ],
          (choice) => {
            switch (choice) {
              case "자기소개 보기":
                showModalWithIframe(
                  "자기소개",
                  "/assets/htmls/about_me.html",
                  this,
                  textBox
                );
                break;
              case "회사 이력 보기":
                showModalWithIframe(
                  "이력",
                  "/assets/htmls/work_history.html",
                  this,
                  textBox
                );
                break;
              case "프로젝트들 보기":
                showModalWithIframe(
                  "프로젝트",
                  "/assets/htmls/project.html",
                  this,
                  textBox
                );
                break;
              case "이력서 다운로드":
                downloadResume("/assets/resume.pdf");
                break;
              case "떠나기":
                textBox.setVisible(false);

                const optionGroup: FixWidthButtons =
                  this.data.get("optionGroup");
                const tipText: Phaser.GameObjects.Text | undefined =
                  this.data.get("tipText");

                if (tipText) {
                  tipText.destroy();
                }
                this.data.set("isTalking", false);
                optionGroup.setVisible(false);

                break;
            }
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

  update() {
    const player = this.data.get("player");
    const sword = this.data.get("sword");
    const clothes = this.data.get("clothes");
    const hair = this.data.get("hair");
    const octocat = this.data.get("octocat");
    sword.x = player.x;
    sword.y = player.y;

    clothes.x = player.x;
    clothes.y = player.y;

    hair.x = player.x;
    hair.y = player.y;

    if (player.y > 907) {
      this.scene.start("town-scene");
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
  }
}
