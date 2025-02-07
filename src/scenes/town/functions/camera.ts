import type { Player } from "../../../shared/types";

export const initTownCamera = (
  camera: Phaser.Cameras.Scene2D.Camera,
  mapSize: {
    mapWidth: number;
    mapHeight: number;
  },
  screenSize: {
    screenWidth: number;
    screenHeight: number;
  }
) => {
  // 카메라가 맵의 경계에 도달하면 맵을 이동시킵니다.
  camera
    .setBounds(0, 0, mapSize.mapWidth * 3, mapSize.mapHeight * 3)
    .setScroll(0, 0);

  // 카메라가 맵을 벗어나지 않도록 설정합니다.
  camera.setDeadzone(
    Number(screenSize.screenWidth) * 0.5,
    Number(screenSize.screenHeight) * 0.5
  );
};

export const initTownPlayerCamera = (
  camera: Phaser.Cameras.Scene2D.Camera,
  player: Player
): void => {
  camera.centerOn(player.x, player.y);
  camera.startFollow(player, true);
};
