import type { Player } from "../../../shared/types";

export const initPlayerCamera = (
  scene: Phaser.Scene,
  mapSize: { mapWidth: number; mapHeight: number },
  player: Player
) => {
  scene.cameras.main.setBounds(0, 0, mapSize.mapWidth, mapSize.mapHeight);

  scene.cameras.main.centerToBounds();

  scene.cameras.main.startFollow(player, true);
};
