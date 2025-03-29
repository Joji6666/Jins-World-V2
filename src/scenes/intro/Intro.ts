import WebFont from "webfontloader";
import { downloadResume } from "../first-floor/functions/dialogue";
import { createJinAnims } from "../first-floor/functions/anims";

export default class IntroScene extends Phaser.Scene {
  private language: "ko" | "en" = "ko";
  private languageTitle!: Phaser.GameObjects.Text;
  private koreanText!: Phaser.GameObjects.Text;
  private englishText!: Phaser.GameObjects.Text;
  private instructionText!: Phaser.GameObjects.Text;
  private selectIndex = 0;

  private isMobile(): boolean {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|iphone|ipad|ipod/i.test(userAgent);
  }

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

    this.load.spritesheet("jin", "/assets/jin/char.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("jin_hair", "/assets/jin/hair.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("jin_clothes", "/assets/jin/clothes.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    WebFont.load({
      custom: {
        families: ["PixelFont", "TitlePixelFont", "KoreanPixelFont"]
      },
      active: () => {
        createJinAnims(this);
        this.createText();
      }
    });
  }

  createText() {
    if (this.isMobile()) {
      this.showMobileNotSupported();
      return;
    }

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

  private showMobileNotSupported() {
    this.cameras.main.setBackgroundColor("#000");

    const { width, height } = this.scale;

    const mainText = this.add
      .text(
        width / 2,
        height / 2 - 60,
        "📱 이 페이지는 Phaser로 만든 웹게임입니다.",
        {
          fontFamily: "KoreanPixelFont",
          fontSize: "28px",
          color: "#ffffff"
        }
      )
      .setOrigin(0.5);

    const jin = this.physics.add.staticSprite(1000, 700, "jin_mobile");

    jin.body.offset.y = 7;
    jin.scale = 2;

    jin.body.setSize(30, 30);

    jin.depth = 2;

    jin.anims.play("jin_mobile");

    jin.x = mainText.x + 350;
    jin.y = mainText.y;

    const clothes = this.physics.add
      .sprite(jin.x, jin.y, `jin_clothes_mobile`)
      .setScale(2);

    clothes.body.immovable = true;
    clothes.setCollideWorldBounds(true);
    clothes.body.offset.y = 7;
    clothes.scale = 2;
    clothes.depth = 3;

    clothes.anims.play("jin_clothes_mobile");

    const hair = this.physics.add
      .sprite(jin.x, jin.y, `jin_hair_mobile`)
      .setScale(2);

    hair.body.immovable = true;
    hair.setCollideWorldBounds(true);
    hair.body.offset.y = 7;
    hair.scale = 1.95;
    hair.depth = 4;

    hair.anims.play("jin_hair_mobile");

    this.add
      .text(
        width / 2,
        height / 2 - 20,
        "모바일은 미지원입니다. 죄송하지만 PC에서 접속해주세요!",
        {
          fontFamily: "KoreanPixelFont",
          fontSize: "24px",
          color: "#ff6666"
        }
      )
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2 + 30,
        "아래 버튼을 눌러 이력서를 다운로드할 수 있어요.",
        {
          fontFamily: "KoreanPixelFont",
          fontSize: "20px",
          color: "#aaaaaa"
        }
      )
      .setOrigin(0.5);

    const downloadText = this.add
      .text(width / 2, height / 2 + 80, "📄 이력서 다운로드", {
        fontFamily: "KoreanPixelFont",
        fontSize: "28px",
        color: "#ffcc00",
        backgroundColor: "#333",
        padding: { x: 10, y: 5 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        downloadText.setStyle({ color: "#ffff66" });
      })
      .on("pointerout", () => {
        downloadText.setStyle({ color: "#ffcc00" });
      })
      .on("pointerdown", () => {
        downloadResume("/assets/resume.pdf");
      });
  }
}
