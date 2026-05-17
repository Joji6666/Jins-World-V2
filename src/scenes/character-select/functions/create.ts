import { isMobileGameboyMode } from "../../../shared/mobile/mobileGameboyController";

const arrowTextStyle = {
  fontSize: "36px",
  color: "#FFFFFF",
  fontFamily: "KoreanPixelFont"
};

export const createTitleTexts = (
  scene: Phaser.Scene,
  language: string
): void => {
  const isMobile = isMobileGameboyMode();

  scene.add.text(1050, 100, language !== "ko" ? "How To Move" : "조작 방법", {
    fontFamily: "KoreanPixelFont",
    fontSize: "36px",
    color: "#FFFFFF",
    align: "center"
  });

  scene.add.text(
    1070,
    150,
    language !== "ko" ? "↑ Move Up" : "↑ 위로 이동",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    190,
    language !== "ko" ? "↓ Move Down" : "↓ 아래로 이동",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    230,
    language !== "ko" ? "← Move Left" : "← 왼쪽으로 이동",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    270,
    language !== "ko" ? "→ Move Right" : "→ 오른쪽으로 이동",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    310,
    isMobile
      ? "A 상호작용/공격"
      : language !== "ko"
      ? "space Interaction"
      : "SPACE 상호작용",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    350,
    isMobile ? "□ 닫기" : language !== "ko" ? "ESC Close" : "ESC 닫기",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    410,
    language !== "ko" ? "space Interaction" : "전투",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    450,
    isMobile
      ? "검 무기 꺼내기/넣기"
      : language !== "ko"
      ? "P Weapon"
      : "P 무기 꺼내기/넣기",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    490,
    isMobile ? "B 백스텝" : language !== "ko" ? "C Backstep" : "C 백스텝",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    530,
    isMobile ? "A 공격" : language !== "ko" ? "SPACE Attack" : "SPACE 공격",
    arrowTextStyle
  );
};
