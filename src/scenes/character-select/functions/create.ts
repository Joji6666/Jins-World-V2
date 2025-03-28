const arrowTextStyle = {
  fontSize: "36px",
  color: "#FFFFFF",
  fontFamily: "KoreanPixelFont"
};

export const createTitleTexts = (
  scene: Phaser.Scene,
  language: string
): void => {
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
    language !== "ko" ? "space Interaction" : "SPACE 상호작용",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    350,
    language !== "ko" ? "space Interaction" : "ESC 닫기",
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
    language !== "ko" ? "space Interaction" : "P 무기 꺼내기/넣기",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    490,
    language !== "ko" ? "space Interaction" : "C 백스텝",
    arrowTextStyle
  );

  scene.add.text(
    1070,
    530,
    language !== "ko" ? "space Interaction" : "SPACE 공격",
    arrowTextStyle
  );
};
