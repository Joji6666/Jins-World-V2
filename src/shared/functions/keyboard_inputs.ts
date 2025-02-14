import { Player } from "../types";

export const setPlayerInputs = (
  keyboard: Phaser.Input.Keyboard.KeyboardPlugin,
  player: Player
): void => {
  keyboard.on("keydown-LEFT", () => {
    player.setVelocityX(-160);
    player.moveState = "left";
    player.setVelocityY(0);
    player.anims.play("player_run_left", true);
  });

  keyboard.on("keyup-LEFT", () => {
    if (player.moveState === "left") {
      player.setVelocityX(0);
      player.moveState = "idle_left";
      player.anims.play("player_idle_left", true);
    }
  });

  keyboard.on("keydown-RIGHT", () => {
    player.setVelocityX(160);
    player.moveState = "right";
    player.setVelocityY(0);
    player.anims.play("player_run_right", true);
  });

  keyboard.on("keyup-RIGHT", () => {
    if (player.moveState === "right") {
      player.setVelocityX(0);
      player.moveState = "idle_right";
      player.anims.play("player_idle_right", true);
    }
  });

  keyboard.on("keydown-UP", () => {
    player.setVelocityY(-160);
    player.moveState = "up";
    player.setVelocityX(0);
    player.anims.play("player_run_back", true);
  });

  keyboard.on("keyup-UP", () => {
    if (player.moveState === "up") {
      player.setVelocityY(0);
      player.moveState = "idle_up";
      player.anims.play("player_idle_back", true);
    }
  });

  keyboard.on("keydown-DOWN", () => {
    player.setVelocityY(160);
    player.moveState = "down";
    player.setVelocityX(0);
    player.anims.play("player_run_front", true);
  });

  keyboard.on("keyup-DOWN", () => {
    if (player.moveState === "down") {
      player.setVelocityY(0);
      player.moveState = "idle_down";
      player.anims.play("player_idle_front", true);
    }
  });
};
