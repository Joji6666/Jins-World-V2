import WebFont from "webfontloader";
import { downloadResume } from "../first-floor/functions/dialogue";

export default class IntroScene extends Phaser.Scene {
  private language: "ko" | "en" = "ko";
  private languageTitle!: Phaser.GameObjects.Text;
  private koreanText!: Phaser.GameObjects.Text;
  private englishText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;
  private selectIndex = 0;

  constructor() {
    super("intro");
  }

  preload() {
    this.load.image("background", "/assets/intro.webp");
    this.load.audio("main_bgm", "assets/sounds/main_bgm.mp3");
    this.load.audio("boss_bgm", "assets/sounds/boss_bgm.mp3");
    this.load.audio("town_bgm", "assets/sounds/town_bgm.mp3");
    this.load.audio("hurt", "assets/sounds/hurt.wav");
    this.load.audio("select", "assets/sounds/select.wav");
    this.load.audio("sword_swing", "assets/sounds/sword_swing.wav");
    this.load.audio("sword_hit", "assets/sounds/sword_hit.wav");

    this.load.audio("textbox", "assets/sounds/textbox.wav");
    this.load.audio("death", "assets/sounds/death.wav");

    this.load.audio("boss_attack", "assets/sounds/boss_attack.wav");

    this.load.audio("door", "assets/sounds/door.mp3");

    this.load.audio("flap", "assets/sounds/walk.wav");

    this.load.audio("sweep", "assets/sounds/sweep.wav");

    WebFont.load({
      custom: {
        families: ["PixelFont", "TitlePixelFont", "KoreanPixelFont"]
      },
      active: () => {
        this.createText();
      }
    });
  }

  createText() {
    this.cameras.main.setBackgroundColor("#000000");
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const { width, height } = this.scale;

    const bg = this.add.image(0, 0, "background").setOrigin(0, 0);
    bg.setDisplaySize(width, height);
    bg.setAlpha(0.7);

    this.add
      .text(centerX, centerY - 50, "WELCOME TO JIN'S WORLD", {
        fontFamily: "KoreanPixelFont",
        fontSize: "64px",
        color: "#ffe066"
      })
      .setOrigin(0.5, 0.5);

    const gameStartText = this.add
      .text(centerX - 150, centerY + 50, "게임시작", {
        fontFamily: "KoreanPixelFont",
        fontSize: "36px",
        color: "#ffcc00"
      })
      .setOrigin(0.5, 0.5);

    const resumeText = this.add
      .text(centerX + 100, centerY + 50, "이력서 다운로드", {
        fontFamily: "KoreanPixelFont",
        fontSize: "36px",
        color: "#F0F8FF	"
      })
      .setOrigin(0.5, 0.5);

    this.instructionText = this.add
      .text(centerX, centerY + 150, "스페이스바를 입력하여 진행하세요.", {
        fontFamily: "KoreanPixelFont",
        fontSize: "36px",
        color: "#BFFF00"
      })
      .setOrigin(0.5, 0.5);

    if (this.input.keyboard) {
      this.input.keyboard.on("keydown-LEFT", () => {
        this.selectIndex = 0;
        gameStartText.setColor("#ffcc00");
        resumeText.setColor("#F0F8FF");
      });

      this.input.keyboard.on("keydown-RIGHT", () => {
        this.selectIndex = 1;
        resumeText.setColor("#ffcc00");
        gameStartText.setColor("#F0F8FF");
      });
      this.input.keyboard.on("keydown-SPACE", () => {
        if (this.selectIndex === 1) {
          downloadResume("/assets/resume.pdf");
        } else {
          this.startCharSelectScene();
        }
      });
    }
  }

  startCharSelectScene() {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start("character-select-scene", { language: this.language });
      }
    );
  }
}
