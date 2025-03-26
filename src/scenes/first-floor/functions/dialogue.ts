import Phaser from "phaser";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

interface DialogConfig {
  margin?: number;
  height?: number;
}

/**
 * RexUI가 scene.rexUI로 접근 가능하도록 Scene을 확장
 */
export interface RexUIScene extends Phaser.Scene {
  rexUI: RexUIPlugin;
}

/**
 * 대화창을 생성한다
 */
export const createTextBox = (
  scene: RexUIScene,
  config: DialogConfig = {}
): any => {
  const margin = config.margin ?? 40;
  const width = scene.scale.width - margin * 2;
  const height = config.height ?? 150;

  const background = scene.rexUI.add
    .roundRectangle(0, 0, 0, 0, 20, 0xf5f0e6, 0.8)
    .setStrokeStyle(3, 0x8b5e3c);
  const text = scene.add.text(0, 0, "", {
    fontSize: "24px",
    wordWrap: { width: width - 60 },
    color: "#4b382a"
  });
  const action = scene.add.text(0, 0, "▶", {
    fontSize: "22px",
    color: "#4b382a"
  });

  return scene.rexUI.add
    .textBox({
      x: scene.scale.width / 2,
      y: scene.scale.height - height / 2 - 20,
      background,
      text,
      action,
      space: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        text: 10
      },
      align: { text: "left" }
    })
    .layout();
};

/**
 * 타이핑 효과로 텍스트를 출력한다
 */
export const startDialog = (
  textBox: any,
  dialogLines: string[] = [],
  speed: number = 50
): Promise<void> => {
  return new Promise((resolve) => {
    const lines = [...dialogLines];

    const typeNextLine = () => {
      const line = lines.shift();
      if (!line) {
        resolve();
        return;
      }

      textBox.start(line, speed).once("complete", () => {
        textBox.scene.input.keyboard.once("keydown-SPACE", typeNextLine);
      });
    };

    typeNextLine();
  });
};

/**
 * 버튼 생성 유틸리티
 */
export const createOptionButton = (
  scene: RexUIScene,
  label: string,
  onClick: (label: string) => void = () => {}
): any => {
  const button = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x1565c0),
    text: scene.add.text(0, 0, label, {
      fontSize: "20px",
      color: "#ffffff"
    }),
    space: { left: 10, right: 10, top: 10, bottom: 10 }
  });

  button.setInteractive().on("pointerup", () => onClick(label));

  return button;
};

/**
 * 선택지 UI 생성 (텍스트박스 오른쪽 위에 표시, 위/아래 화살표로 이동 가능)
 */
export const showOptions = (
  scene: RexUIScene,
  options: string[] = [],
  onSelect: (label: string) => void = () => {}
): any => {
  const buttons = options.map((label) => createOptionButton(scene, label));

  const optionGroup = scene.rexUI.add
    .fixWidthButtons({
      x: scene.scale.width - 200,
      y: scene.scale.height - 220,
      width: 180,
      height: buttons.length * 50 + 20,
      // @ts-ignore
      orientation: 1,
      buttons,
      space: {
        top: 10,
        item: 10,
        bottom: 10
      }
    })
    .layout();

  let selectedIndex = 0;
  highlightButton(buttons[selectedIndex]);

  if (scene.input.keyboard) {
    const inputKeys = scene.input.keyboard.createCursorKeys();

    const navigate = () => {
      unhighlightButton(buttons[selectedIndex]);

      if (inputKeys.up.isDown) {
        selectedIndex = (selectedIndex - 1 + buttons.length) % buttons.length;
      } else if (inputKeys.down.isDown) {
        selectedIndex = (selectedIndex + 1) % buttons.length;
      }

      highlightButton(buttons[selectedIndex]);
    };

    scene.input.keyboard.on("keydown-UP", navigate);
    scene.input.keyboard.on("keydown-DOWN", navigate);
    scene.input.keyboard.on("keydown-ENTER", () => {
      const selected = buttons[selectedIndex];
      onSelect(selected.getElement("text").text);
      optionGroup.setVisible(false);
    });
  }

  return optionGroup;
};

const highlightButton = (button: any) => {
  button.getElement("background").setStrokeStyle(3, 0xffcc00);
};

const unhighlightButton = (button: any) => {
  button.getElement("background").setStrokeStyle(1, 0x8b5e3c);
};

export const openHtmlDialog = (url: string): void => {
  const popup = window.open(url, "_blank", "width=600,height=800");
  if (!popup) alert("팝업이 차단되었어요!");
};

export const downloadResume = (url: string): void => {
  const a = document.createElement("a");
  a.href = url;
  a.download = "이력서.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const showModalWithIframe = (
  title: string,
  url: string,
  scene: Phaser.Scene
): void => {
  const modalBackground = scene.add.graphics();
  modalBackground.fillStyle(0x000000, 0.7);
  modalBackground.fillRect(
    0,
    0,
    scene.cameras.main.width,
    scene.cameras.main.height + 300
  );
  modalBackground.setDepth(10);

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.width = `80%`;
  iframe.style.height = `80%`;
  iframe.style.border = "none";
  iframe.style.position = "absolute";
  iframe.style.top = `50%`;
  iframe.style.left = `50%`;
  iframe.style.zIndex = "1000";
  iframe.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(iframe);

  scene.input.keyboard?.once("keydown-ESC", () => {
    modalBackground.destroy();
    iframe.remove();
  });
};
