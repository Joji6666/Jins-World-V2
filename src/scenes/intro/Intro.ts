import WebFont from "webfontloader";
import {
  downloadPortfolio,
  downloadResume
} from "../first-floor/functions/dialogue";
import { isMobileGameboyMode } from "../../shared/mobile/mobileGameboyController";

const PORTFOLIO_DOWNLOAD_URL =
  "/assets/kimjin_portfoilo.pptx";

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
    const isMobile = isMobileGameboyMode();
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

    const menuY = isMobile ? centerY + 24 : centerY + 50;
    const menuFontSize = isMobile ? "30px" : "32px";
    const menuItems = [
      {
        label: "게임시작",
        x: isMobile ? centerX : centerX - 310,
        y: menuY,
        action: () => this.startCharSelectScene()
      },
      {
        label: "이력서 다운로드",
        x: isMobile ? centerX : centerX,
        y: isMobile ? menuY + 54 : menuY,
        action: () => downloadResume("/assets/kimjin_resume.pdf")
      },
      {
        label: "포트폴리오 다운로드",
        x: isMobile ? centerX : centerX + 340,
        y: isMobile ? menuY + 108 : menuY,
        action: () => downloadPortfolio(PORTFOLIO_DOWNLOAD_URL)
      }
    ];

    const menuTexts = menuItems.map((item, index) =>
      this.add
        .text(item.x, item.y, item.label, {
          fontFamily: "KoreanPixelFont",
          fontSize: menuFontSize,
          color: index === this.selectIndex ? "#ffcc00" : "#F0F8FF"
        })
        .setOrigin(0.5, 0.5)
    );

    const updateSelectedMenu = () => {
      menuTexts.forEach((text, index) => {
        text.setColor(index === this.selectIndex ? "#ffcc00" : "#F0F8FF");
      });
    };

    this.instructionText = this.add
      .text(
        centerX,
        isMobile ? centerY + 210 : centerY + 150,
        isMobile
          ? "십자키로 선택하고 A 버튼으로 진행하세요."
          : "스페이스바를 입력하여 진행하세요.",
        {
          fontFamily: "KoreanPixelFont",
          fontSize: "36px",
          color: "#BFFF00"
        }
      )
      .setOrigin(0.5, 0.5);

    if (this.input.keyboard) {
      const selectPrevious = () => {
        this.selectIndex =
          (this.selectIndex - 1 + menuItems.length) % menuItems.length;
        updateSelectedMenu();
      };

      const selectNext = () => {
        this.selectIndex = (this.selectIndex + 1) % menuItems.length;
        updateSelectedMenu();
      };

      this.input.keyboard.on("keydown-LEFT", selectPrevious);
      this.input.keyboard.on("keydown-UP", selectPrevious);

      this.input.keyboard.on("keydown-RIGHT", selectNext);
      this.input.keyboard.on("keydown-DOWN", selectNext);

      menuTexts.forEach((text, index) => {
        text.setInteractive({ useHandCursor: true });
        text.on("pointerover", () => {
          this.selectIndex = index;
          updateSelectedMenu();
        });
        text.on("pointerdown", () => {
          this.selectIndex = index;
          menuItems[this.selectIndex].action();
        });
      });

      this.input.keyboard.on("keydown-SPACE", () => {
        menuItems[this.selectIndex].action();
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
