import type { Player } from "../../../shared/types";

export const initPlayerCollider = (
  scene: Phaser.Scene,
  player: Player,
  layer: Phaser.Tilemaps.TilemapLayer
) => {
  scene.physics.add.collider(player, layer);
};
