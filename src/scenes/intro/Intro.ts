import WebFont from "webfontloader";

export default class IntroScene extends Phaser.Scene {
  private language: "ko" | "en" = "ko";
  private languageTitle!: Phaser.GameObjects.Text;
  private koreanText!: Phaser.GameObjects.Text;
  private englishText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;

  constructor() {
    super("intro");
  }

  preload() {
    this.load.image("background", "/assets/intro.webp");

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
      .text(centerX, centerY - 100, "WELCOME TO JIN'S WORLD", {
        fontFamily: "KoreanPixelFont",
        fontSize: "64px",
        color: "#ffe066"
      })
      .setOrigin(0.5, 0.5);

    this.languageTitle = this.add
      .text(centerX, centerY, "언어를 선택하세요", {
        fontFamily: "KoreanPixelFont",
        fontSize: "36px",
        color: "#BFFF00"
      })
      .setOrigin(0.5, 0.5);

    this.koreanText = this.add
      .text(centerX - 100, centerY + 50, "🇰🇷 한국어", {
        fontFamily: "KoreanPixelFont",
        fontSize: "36px",
        color: "#ffcc00"
      })
      .setOrigin(0.5, 0.5);

    this.englishText = this.add
      .text(centerX + 100, centerY + 50, "🇺🇸 ENGLISH", {
        fontFamily: "KoreanPixelFont",
        fontSize: "36px",
        color: "#F0F8FF	"
      })
      .setOrigin(0.5, 0.5);

    this.instructionText = this.add
      .text(centerX, centerY + 100, "스페이스바를 입력하여 진행하세요.", {
        fontFamily: "KoreanPixelFont",
        fontSize: "28px",
        color: "#BFFF00"
      })
      .setOrigin(0.5, 0.5);

    if (this.input.keyboard) {
      this.input.keyboard.on("keydown-LEFT", () => this.switchLanguage("ko"));
      this.input.keyboard.on("keydown-RIGHT", () => this.switchLanguage("en"));
      this.input.keyboard.on("keydown-SPACE", () =>
        this.startCharSelectScene()
      );
    }
  }

  switchLanguage(language: "ko" | "en") {
    this.language = language;

    if (language === "ko") {
      this.languageTitle.setText("언어를 선택하세요");
      this.koreanText.setColor("#ffcc00");
      this.englishText.setColor("#ffffff");
      this.instructionText.setText("스페이스바를 입력하여 진행하세요.");
    } else {
      this.languageTitle.setText("SELECT LANGUAGE");
      this.koreanText.setColor("#ffffff");
      this.englishText.setColor("#ffcc00");
      this.instructionText.setText("PRESS SPACE TO CONTINUE.");
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
