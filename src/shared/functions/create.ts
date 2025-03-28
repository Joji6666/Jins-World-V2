import {
  PLAYER_ANIMATION_KEYS,
  PLAYER_KEYS,
  PLAYER_SIDE_KEYS
} from "../constants/keys";
import { type Player } from "../types";

export const createPlayer = (
  scene: Phaser.Scene,
  position: { x: number; y: number }
): Player => {
  const player = scene.physics.add
    .sprite(position.x, position.y, PLAYER_ANIMATION_KEYS.CHAR_FRONT)
    .setName(PLAYER_KEYS.PLAYER) as Player;

  scene.data.set(PLAYER_KEYS.PLAYER_MOVE_STATE, "front");
  scene.data.set(PLAYER_KEYS.PLAYER_SIDE, PLAYER_SIDE_KEYS.FRONT);

  player.setCollideWorldBounds(true);
  player.body.offset.y = 7;
  player.scale = 2;
  player.hp = 100;
  player.isAttackReady = true;
  player.body.setSize(30, 30);

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

  const clothes = scene.physics.add
    .sprite(player.x, player.y, `clothes_front`)
    .setScale(2);

  scene.data.set("clothes", clothes);
  clothes.body.immovable = true;
  clothes.setCollideWorldBounds(true);
  clothes.body.offset.y = 7;
  clothes.scale = 2;
  clothes.depth = 3;

  const hair = scene.physics.add
    .sprite(player.x, player.y, `hair_front`)
    .setScale(2);

  scene.data.set("hair", hair);
  hair.body.immovable = true;
  hair.setCollideWorldBounds(true);
  hair.body.offset.y = 7;
  hair.scale = 2;
  hair.depth = 4;

  return player;
};

export const createHPBar = (
  scene: Phaser.Scene
): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] => {
  const hearts: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
  const heartXStart = 50;
  const heartSpacing = 40;

  for (let i = 0; i < 5; i++) {
    const heart = scene.physics.add.sprite(
      heartXStart + i * heartSpacing,
      50,
      "heart_idle"
    );

    heart.setScrollFactor(0);

    heart.anims.play("heart_idle");

    hearts.push(heart);
  }

  scene.data.set("hearts", hearts);

  return hearts;
};

export const createLightEffect = (
  scene: Phaser.Scene,
  position: { x: number; y: number }
): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody => {
  const lightFx = scene.physics.add.sprite(position.x, position.y, "light_fx");
  lightFx.setScale(1.25);
  lightFx.depth = 100;

  lightFx.anims.play("light_fx");

  return lightFx;
};
