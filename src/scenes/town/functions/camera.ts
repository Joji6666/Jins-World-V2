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
  camera.setBounds(0, 0, mapSize.mapWidth, mapSize.mapHeight).setScroll(0, 0);

  camera.setDeadzone(
    Number(screenSize.screenWidth) * 0.3,
    Number(screenSize.screenHeight) * 0.3
  );
};

export const initTownPlayerCamera = (
  camera: Phaser.Cameras.Scene2D.Camera,
  player: Player
): void => {
  camera.centerOn(player.x, player.y);
  camera.startFollow(player, true);
};
