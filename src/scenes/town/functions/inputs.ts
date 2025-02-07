import { Player } from "../../../shared/types";

export const setTownPlayerInput = (
  keyboard: Phaser.Input.Keyboard.KeyboardPlugin,
  player: Player
) => {
  keyboard.on("keydown-LEFT", () => {
    if (!player.isDialogOn) {
      player.setVelocityX(-160);
      player.moveState = "left";
      player.setVelocityY(0);
      player.anims.play("left", true);
    }
  });

  keyboard.on("keyup-LEFT", () => {
    if (!player.isDialogOn) {
      if (player.moveState === "left") {
        player.setVelocityX(0);
        player.moveState = "idle_left";
        player.anims.play("turn_left", true);
      }
    }
  });

  keyboard.on("keydown-RIGHT", () => {
    if (!player.isDialogOn) {
      player.setVelocityX(160);
      player.moveState = "right";
      player.setVelocityY(0);
      player.anims.play("right", true);
    }
  });

  keyboard.on("keyup-RIGHT", () => {
    if (!player.isDialogOn) {
      if (player.moveState === "right") {
        player.setVelocityX(0);
        player.moveState = "idle_right";
        player.anims.play("turn_right", true);
      }
    }
  });

  keyboard.on("keydown-UP", () => {
    if (!player.isDialogOn) {
      player.setVelocityY(-160);
      player.moveState = "up";
      player.setVelocityX(0);
      player.anims.play("up", true);
    }
  });
  keyboard.on("keyup-UP", () => {
    if (!player.isDialogOn) {
      if (player.moveState === "up") {
        player.setVelocityY(0);
        player.moveState = "idle_up";
        player.anims.play("turn_up", true);
      }
    }
  });

  keyboard.on("keydown-DOWN", () => {
    if (!player.isDialogOn) {
      player.setVelocityY(160);
      player.moveState = "down";
      player.setVelocityX(0);
      player.anims.play("down", true);
    }
  });

  keyboard.on("keyup-DOWN", () => {
    if (!player.isDialogOn) {
      if (player.moveState === "down") {
        player.setVelocityY(0);
        player.moveState = "idle_down";
        player.anims.play("turn_down", true);
      }
    }
  });
};
