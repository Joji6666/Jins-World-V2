import { Player } from "../types";

export const createPlayer = (scene: Phaser.Scene): Player => {
  const player = scene.physics.add
    .sprite(1050, 325, `player_idle_front`)
    .setName("player") as Player;
  player.moveState = "";
  player.body.immovable = true;
  player.body.offset.y = 7;
  player.scale = 2.5;
  scene.data.set("player", player);

  return player;
};
