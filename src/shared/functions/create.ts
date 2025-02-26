import {
  PLAYER_ANIMATION_KEYS,
  PLAYER_KEYS,
  PLAYER_SIDE_KEYS
} from "../constants/keys";
import { type Player } from "../types";

export const createPlayer = (scene: Phaser.Scene): Player => {
  const player = scene.physics.add
    .sprite(400, 200, PLAYER_ANIMATION_KEYS.CHAR_FRONT)
    .setName(PLAYER_KEYS.PLAYER) as Player;

  scene.data.set(PLAYER_KEYS.PLAYER_MOVE_STATE, "front");
  scene.data.set(PLAYER_KEYS.PLAYER_SIDE, PLAYER_SIDE_KEYS.FRONT);

  player.body.immovable = true;
  player.setCollideWorldBounds(true);
  player.body.offset.y = 7;
  player.scale = 2;
  scene.data.set(PLAYER_KEYS.PLAYER, player);
  scene.data.set(PLAYER_KEYS.PLAYER_WEAPON_STATUS, "hand");
  scene.data.set(PLAYER_KEYS.IS_WEAPON_DRAW, false);
  const sword = scene.physics.add
    .sprite(player.x, player.y, `sword_front`)
    .setScale(2);

  scene.data.set("sword", sword);
  sword.body.setSize(35, 30);
  sword.body.setOffset(5, 15);
  sword.setCollideWorldBounds(true);
  sword.depth = 1;
  player.depth = 2;

  return player;
};
