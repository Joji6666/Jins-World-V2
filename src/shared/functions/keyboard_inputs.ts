import {
  PLAYER_ANIMATION_KEYS,
  PLAYER_KEYS,
  PLAYER_MOVE_STATE_KEYS,
  PLAYER_SIDE_KEYS
} from "../constants/keys";
import { Player } from "../types";

export const setPlayerInputs = (
  scene: Phaser.Scene,
  keyboard: Phaser.Input.Keyboard.KeyboardPlugin,
  player: Player
): void => {
  if (player.isHit) return;
  const keysPressed = new Set<string>();

  keyboard.on("keydown", (event: KeyboardEvent) => {
    const currentPlayer: Player = scene.data.get("player");
    if (currentPlayer.isHit) return;
    keysPressed.add(event.code);

    const isRunOn: boolean = scene.data.get(PLAYER_KEYS.IS_RUN_ON) || false;

    const playerWeaponStatus: string = scene.data.get(
      PLAYER_KEYS.PLAYER_WEAPON_STATUS
    );
    const sword: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("sword");

    const clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("clothes");

    const hair: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("hair");

    const isWeaponDraw: boolean = scene.data.get(PLAYER_KEYS.IS_WEAPON_DRAW);
    setPlayerAndWeaponDepth(isWeaponDraw, player, sword, clothes, event.code);

    switch (event.code) {
      case "ArrowUp":
        scene.data.set(PLAYER_KEYS.PLAYER_SIDE, PLAYER_SIDE_KEYS.BACK);
        player.setVelocityY(isRunOn ? -200 : -160);
        player.setVelocityX(0);

        scene.data.set(
          PLAYER_KEYS.PLAYER_MOVE_STATE,
          isRunOn
            ? PLAYER_MOVE_STATE_KEYS.BACK_RUN
            : PLAYER_MOVE_STATE_KEYS.BACK_WALK
        );
        player.anims.play(
          isRunOn
            ? PLAYER_ANIMATION_KEYS.CHAR_BACK_RUN
            : isWeaponDraw
            ? `char_${playerWeaponStatus}_move_back`
            : PLAYER_ANIMATION_KEYS.CHAR_BACK_WALK,
          true
        );

        break;
      case "ArrowDown":
        scene.data.set(PLAYER_KEYS.PLAYER_SIDE, PLAYER_SIDE_KEYS.FRONT);
        player.setVelocityY(isRunOn ? 200 : 160);
        player.setVelocityX(0);

        scene.data.set(
          PLAYER_KEYS.PLAYER_MOVE_STATE,
          isRunOn
            ? PLAYER_MOVE_STATE_KEYS.FRONT_RUN
            : PLAYER_MOVE_STATE_KEYS.FRONT_WALK
        );
        player.anims.play(
          isRunOn
            ? PLAYER_ANIMATION_KEYS.CHAR_FRONT_RUN
            : isWeaponDraw
            ? `char_${playerWeaponStatus}_move_front`
            : PLAYER_ANIMATION_KEYS.CHAR_FRONT_WALK,
          true
        );
        break;
      case "ArrowRight":
        scene.data.set(PLAYER_KEYS.PLAYER_SIDE, PLAYER_SIDE_KEYS.RIGHT);
        player.setVelocityX(isRunOn ? 200 : 160);
        player.setVelocityY(0);

        scene.data.set(
          PLAYER_KEYS.PLAYER_MOVE_STATE,
          isRunOn
            ? PLAYER_MOVE_STATE_KEYS.RIGHT_RUN
            : PLAYER_MOVE_STATE_KEYS.RIGHT_WALK
        );
        player.anims.play(
          isRunOn
            ? PLAYER_ANIMATION_KEYS.CHAR_RIGHT_RUN
            : isWeaponDraw
            ? `char_${playerWeaponStatus}_move_right`
            : PLAYER_ANIMATION_KEYS.CHAR_RIGHT_WALK,
          true
        );
        break;
      case "ArrowLeft":
        scene.data.set(PLAYER_KEYS.PLAYER_SIDE, PLAYER_SIDE_KEYS.LEFT);
        player.setVelocityX(isRunOn ? -200 : -160);
        player.setVelocityY(0);

        scene.data.set(
          PLAYER_KEYS.PLAYER_MOVE_STATE,
          isRunOn
            ? PLAYER_MOVE_STATE_KEYS.LEFT_RUN
            : PLAYER_MOVE_STATE_KEYS.LEFT_WALK
        );
        player.anims.play(
          isRunOn
            ? PLAYER_ANIMATION_KEYS.CHAR_LEFT_RUN
            : isWeaponDraw
            ? `char_${playerWeaponStatus}_move_left`
            : PLAYER_ANIMATION_KEYS.CHAR_LEFT_WALK,
          true
        );
        break;
      // case "ShiftLeft":
      // case "ShiftRight":
      //   scene.data.set(PLAYER_KEYS.IS_RUN_ON, !isRunOn);
      //   break;
    }

    const playerAnim = player.anims.currentAnim;

    if (playerAnim && playerWeaponStatus === "hand") {
      const animationName = playerAnim.key.replace("char", "");

      hair.anims.play(`hair${animationName}`, true);
      clothes.anims.play(`clothes${animationName}`, true);
      sword.anims.play(`sword${animationName}`, true);
    }

    if (playerAnim && playerWeaponStatus !== "hand" && event.code !== "KeyP") {
      let animationName = playerAnim.key.replace("char", "");

      if (animationName.includes(playerWeaponStatus)) {
        animationName = playerAnim.key.replace(
          `char_${playerWeaponStatus}`,
          ""
        );
      }
      hair.anims.play(`hair_${playerWeaponStatus}${animationName}`, true);
      clothes.anims.play(`clothes_${playerWeaponStatus}${animationName}`, true);
      sword.anims.play(`${playerWeaponStatus}${animationName}`, true);
    }
  });

  keyboard.on("keyup", (event: KeyboardEvent) => {
    keysPressed.delete(event.code);

    const playerWeaponStatus = scene.data.get(PLAYER_KEYS.PLAYER_WEAPON_STATUS);
    const sword: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("sword");
    const clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("clothes");

    const hair: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("hair");

    const isWeaponDraw = scene.data.get(PLAYER_KEYS.IS_WEAPON_DRAW);
    setPlayerAndWeaponDepth(isWeaponDraw, player, sword, clothes, event.code);
    if (
      keysPressed.has("ArrowUp") ||
      keysPressed.has("ArrowDown") ||
      keysPressed.has("ArrowLeft") ||
      keysPressed.has("ArrowRight")
    ) {
      return;
    }

    switch (event.code) {
      case "ArrowUp":
        scene.data.set(
          PLAYER_KEYS.PLAYER_MOVE_STATE,
          PLAYER_MOVE_STATE_KEYS.BACK_IDLE
        );
        player.setVelocityY(0);

        player.anims.play(
          isWeaponDraw
            ? `char_${playerWeaponStatus}_idle_back`
            : PLAYER_ANIMATION_KEYS.CHAR_BACK,
          true
        );
        break;
      case "ArrowDown":
        scene.data.set(
          PLAYER_KEYS.PLAYER_MOVE_STATE,
          PLAYER_MOVE_STATE_KEYS.FRONT_IDLE
        );
        player.setVelocityY(0);

        player.anims.play(
          isWeaponDraw
            ? `char_${playerWeaponStatus}_idle_front`
            : PLAYER_ANIMATION_KEYS.CHAR_FRONT,
          true
        );
        break;
      case "ArrowRight":
        scene.data.set(
          PLAYER_KEYS.PLAYER_MOVE_STATE,
          PLAYER_MOVE_STATE_KEYS.RIGHT_IDLE
        );
        player.setVelocityX(0);

        player.anims.play(
          isWeaponDraw
            ? `char_${playerWeaponStatus}_idle_right`
            : PLAYER_ANIMATION_KEYS.CHAR_RIGHT,
          true
        );
        break;
      case "ArrowLeft":
        scene.data.set(
          PLAYER_KEYS.PLAYER_MOVE_STATE,
          PLAYER_MOVE_STATE_KEYS.LEFT_IDLE
        );
        player.setVelocityX(0);

        player.anims.play(
          isWeaponDraw
            ? `char_${playerWeaponStatus}_idle_left`
            : PLAYER_ANIMATION_KEYS.CHAR_LEFT,
          true
        );
        break;
    }

    const playerAnim = player.anims.currentAnim;

    if (playerAnim && playerWeaponStatus === "hand") {
      const animationName = playerAnim.key.replace("char", "");

      clothes.anims.play(`clothes${animationName}`, true);
      sword.anims.play(`sword${animationName}`, true);
      hair.anims.play(`hair${animationName}`, true);
    }

    if (
      playerAnim &&
      playerWeaponStatus !== "hand" &&
      event.code !== "KeyP" &&
      event.code !== "Space"
    ) {
      let animationName = playerAnim.key.replace("char", "");

      if (animationName.includes(playerWeaponStatus)) {
        animationName = playerAnim.key.replace(
          `char_${playerWeaponStatus}`,
          ""
        );
      }

      hair.anims.play(`hair_${playerWeaponStatus}${animationName}`, true);
      clothes.anims.play(`clothes_${playerWeaponStatus}${animationName}`, true);
      sword.anims.play(`${playerWeaponStatus}${animationName}`, true);
    }
  });
};

export const setPlayerWeaponInputs = (
  scene: Phaser.Scene,
  keyboard: Phaser.Input.Keyboard.KeyboardPlugin
): void => {
  keyboard.on("keydown-P", () => {
    const player: Player = scene.data.get(PLAYER_KEYS.PLAYER);

    if (player.isHit) return;

    const playerSide = scene.data.get(PLAYER_KEYS.PLAYER_SIDE);

    const playerWeaponStatus = scene.data.get(PLAYER_KEYS.PLAYER_WEAPON_STATUS);
    const isWeaponDraw = scene.data.get(PLAYER_KEYS.IS_WEAPON_DRAW);

    if (isWeaponDraw) {
      scene.data.set(PLAYER_KEYS.PLAYER_WEAPON_STATUS, "hand");
      player.anims.play(`char_${playerSide}`, true);
      const sword: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
        scene.data.get("sword");
      const clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
        scene.data.get("clothes");

      const hair: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
        scene.data.get("hair");

      hair.anims.play(`hair_${playerSide}`, true);
      clothes.anims.play(`clothes_${playerSide}`, true);
      sword.anims.play(`sword_${playerSide}`, true);
      scene.data.set(PLAYER_KEYS.IS_WEAPON_DRAW, false);
      player.depth = 2;
      sword.depth = 1;
    } else {
      const sword: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
        scene.data.get("sword");
      const clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
        scene.data.get("clothes");

      const hair: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
        scene.data.get("hair");

      hair.anims.play(`hair_sword_draw_${playerSide}`, true);

      clothes.anims.play(`clothes_sword_draw_${playerSide}`, true);
      sword.anims.play(`sword_draw_${playerSide}`, true);
      player.anims.play(`char_sword_draw_${playerSide}`, true);

      player.on(`animationcomplete-char_sword_draw_${playerSide}`, () => {
        player.anims.play(`char_sword_idle_${playerSide}`, true);
      });

      sword.on(`animationcomplete-sword_draw_${playerSide}`, () => {
        sword.anims.play(`sword_idle_${playerSide}`, true);
      });

      clothes.on(`animationcomplete-clothes_sword_draw_${playerSide}`, () => {
        clothes.anims.play(`clothes_sword_idle_${playerSide}`, true);
      });

      hair.on(`animationcomplete-hair_sword_draw_${playerSide}`, () => {
        hair.anims.play(`hair_sword_idle_${playerSide}`, true);
      });

      sword.depth = 3;
      clothes.depth = 2;
      player.depth = 1;
      if (playerWeaponStatus === "hand") {
        scene.data.set(PLAYER_KEYS.PLAYER_WEAPON_STATUS, "sword");
      }
      scene.data.set(PLAYER_KEYS.IS_WEAPON_DRAW, true);
    }
  });

  keyboard.on("keydown-SPACE", () => {
    const player: Player = scene.data.get(PLAYER_KEYS.PLAYER);

    if (player.isHit) return;

    playerAttack(scene);
  });
};

const setPlayerAndWeaponDepth = (
  isWeaponDraw: boolean,
  player: Player,
  sword: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  pressedKey: string
): void => {
  switch (pressedKey) {
    case "ArrowUp":
      {
        if (isWeaponDraw) {
          player.depth = 2;
          clothes.depth = 3;
          sword.depth = 1;
        } else {
          clothes.depth = 2;
          player.depth = 1;
          sword.depth = 3;
        }
      }

      break;
    case "ArrowDown":
      {
        if (isWeaponDraw) {
          player.depth = 1;
          sword.depth = 3;
          clothes.depth = 2;
        } else {
          clothes.depth = 3;
          player.depth = 2;
          sword.depth = 1;
        }
      }

      break;

    case "ArrowRight":
      {
        if (isWeaponDraw) {
          clothes.depth = 2;
          player.depth = 1;
          sword.depth = 3;
        } else {
          clothes.depth = 3;
          player.depth = 2;
          sword.depth = 1;
        }
      }

      break;

    case "ArrowLeft":
      {
        if (isWeaponDraw) {
          clothes.depth = 2;
          player.depth = 1;
          sword.depth = 3;
        } else {
          clothes.depth = 3;
          player.depth = 2;
          sword.depth = 1;
        }
      }

      break;
  }
};

const playerAttack = (scene: Phaser.Scene) => {
  const player = scene.data.get(PLAYER_KEYS.PLAYER);
  const playerSide = scene.data.get(PLAYER_KEYS.PLAYER_SIDE);
  const playerWeaponStatus = scene.data.get(PLAYER_KEYS.PLAYER_WEAPON_STATUS);
  const isWeaponDraw = scene.data.get(PLAYER_KEYS.IS_WEAPON_DRAW);

  if (playerWeaponStatus !== "hand" && isWeaponDraw) {
    const sword: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("sword");

    const clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("clothes");
    const hair: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("hair");

    hair.anims.play(`hair_sword_attack_${playerSide}`, true);
    sword.anims.play(`sword_attack_${playerSide}`, true);
    player.anims.play(`char_sword_attack_${playerSide}`, true);
    clothes.anims.play(`clothes_sword_attack_${playerSide}`, true);

    player.on(`animationcomplete-char_sword_attack_${playerSide}`, () => {
      player.anims.play(`char_sword_idle_${playerSide}`, true);
    });

    sword.on(`animationcomplete-sword_attack_${playerSide}`, () => {
      sword.anims.play(`sword_idle_${playerSide}`, true);
    });

    clothes.on(`animationcomplete-clothes_sword_attack_${playerSide}`, () => {
      clothes.anims.play(`clothes_sword_idle_${playerSide}`, true);
    });

    hair.on(`animationcomplete-hair_sword_attack_${playerSide}`, () => {
      hair.anims.play(`hair_sword_idle_${playerSide}`, true);
    });
  }
};
