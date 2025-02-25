import { Player } from "../types";

export const createPlayer = (scene: Phaser.Scene): Player => {
  const player = scene.physics.add
    .sprite(400, 200, `char_front`)
    .setName("player") as Player;

  scene.data.set("playerMoveState", "front");
  scene.data.set("playerSide", "front");

  player.body.immovable = true;
  player.setCollideWorldBounds(true);
  player.body.offset.y = 7;
  player.scale = 2;
  scene.data.set("player", player);

  return player;
};
