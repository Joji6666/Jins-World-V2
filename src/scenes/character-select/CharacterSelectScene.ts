import { createTitleTexts } from "./functions/create";
import {
  allClothesPreload,
  allHairPreload,
  playerFrontPreload
} from "./functions/preload";

export default class CharacterSelectScene extends Phaser.Scene {
  private hair!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private clothes!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private selectedHairIndex: number = 1;
  private selectedClothesIndex: number = 1;
  private isSelectingHair: boolean = true;

  private hairText!: Phaser.GameObjects.Text;
  private clothesText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;
  private selectionIndicator!: Phaser.GameObjects.Text;

  constructor() {
    super("character-select-scene");
  }

  init(data: { language: string }) {
    this.data.set("language", data.language);
  }

  preload() {
    playerFrontPreload(this);
    allHairPreload(this);
    allClothesPreload(this);
    this.load.image("lobby", "/assets/lobby.webp");
  }

  create() {
    const language = this.data.get("language");
    this.cameras.main.setBackgroundColor("#000000");
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const { width, height } = this.scale;

    const bg = this.add.image(0, 0, "lobby").setOrigin(0, 0);
    bg.setDisplaySize(width, height);
    bg.setAlpha(0.6);

    const player = this.physics.add.sprite(400, 450, "char_front");

    player.body.immovable = true;
    player.body.offset.y = 7;
    player.scale = 3;

    this.hair = this.physics.add.sprite(
      player.x,
      player.y,
      `hair_${this.selectedHairIndex}_front`
    );

    this.hair.body.offset.y = 7;
    this.hair.scale = 3;

    this.clothes = this.physics.add.sprite(
      player.x,
      player.y,
      `clothes_${this.selectedClothesIndex}_front`
    );

    this.clothes.body.offset.y = 7;
    this.clothes.scale = 3;

    this.selectionIndicator = this.add.text(500, 400, "▶", {
      fontSize: "24px",
      color: "#FFFFFF",
      fontStyle: "bold",
      fontFamily: "KoreanPixelFont"
    });

    this.instructionText = this.add
      .text(
        centerX,
        centerY + 200,
        this.data.get("language") === "ko"
          ? "스페이스바를 입력하여 진행하세요."
          : "PRESS SPACE TO CONTINUE.",
        {
          fontFamily: "KoreanPixelFont",
          fontSize: "28px",
          color: "#BFFF00"
        }
      )
      .setOrigin(0.5, 0.5);

    this.hairText = this.add.text(
      530,
      400,
      `< Hair_${this.selectedHairIndex} >`,
      {
        fontSize: "24px",
        color: "#FFFFFF",
        fontFamily: "KoreanPixelFont"
      }
    );

    this.clothesText = this.add.text(
      530,
      450,
      `< Clothes_${this.selectedClothesIndex} >`,
      {
        fontSize: "24px",
        color: "#AAAAAA",
        fontFamily: "KoreanPixelFont"
      }
    );

    // 키 입력 설정
    this.input.keyboard?.on("keydown-UP", () => this.switchSelection(true));
    this.input.keyboard?.on("keydown-DOWN", () => this.switchSelection(false));
    this.input.keyboard?.on("keydown-LEFT", () => this.changeItem(-1));
    this.input.keyboard?.on("keydown-RIGHT", () => this.changeItem(1));
    this.input.keyboard?.on("keydown-SPACE", () => this.startMainScene());

    this.updateUI();

    createTitleTexts(this, language);
  }

  switchSelection(isHair: boolean) {
    this.isSelectingHair = isHair;
    this.updateUI();
  }

  changeItem(direction: number) {
    if (this.isSelectingHair) {
      this.selectedHairIndex = Phaser.Math.Clamp(
        this.selectedHairIndex + direction,
        1,
        2
      );
      this.hair.setTexture(`hair_${this.selectedHairIndex}_front`);
    } else {
      this.selectedClothesIndex = Phaser.Math.Clamp(
        this.selectedClothesIndex + direction,
        1,
        5
      );
      this.clothes.setTexture(`clothes_${this.selectedClothesIndex}_front`);
    }

    this.updateUI();
  }

  updateUI() {
    this.hairText.setText(`< Hair_${this.selectedHairIndex} >`);
    this.clothesText.setText(`< Clothes_${this.selectedClothesIndex} >`);

    if (this.isSelectingHair) {
      this.selectionIndicator.setY(400);
      this.hairText.setColor("#FFFFFF");
      this.clothesText.setColor("#AAAAAA");
    } else {
      this.selectionIndicator.setY(450);
      this.hairText.setColor("#AAAAAA");
      this.clothesText.setColor("#FFFFFF");
    }
  }

  startMainScene() {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start("main", {
          hairIndex: this.selectedHairIndex,
          clothesIndex: this.selectedClothesIndex,
          language: this.data.get("language"),
          insertScene: "intro"
        });
      }
    );
  }
}
