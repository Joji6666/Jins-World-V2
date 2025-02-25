import { Player } from "../types";

export const setPlayerInputs = (
  scene: Phaser.Scene,
  keyboard: Phaser.Input.Keyboard.KeyboardPlugin,
  player: Player
): void => {
  const keysPressed = new Set<string>();

  keyboard.on("keydown", (event: KeyboardEvent) => {
    keysPressed.add(event.code);

    const isRunOn = scene.data.get("isRunOn") || false;

    switch (event.code) {
      case "ArrowUp":
        scene.data.set("playerSide", "back");
        player.setVelocityY(isRunOn ? -200 : -160);
        player.setVelocityX(0);
        scene.data.set("playerMoveState", isRunOn ? "back_run" : "back_walk");
        player.anims.play(isRunOn ? "char_back_run" : "char_back_walk", true);
        break;
      case "ArrowDown":
        scene.data.set("playerSide", "front");
        player.setVelocityY(isRunOn ? 200 : 160);
        player.setVelocityX(0);
        scene.data.set("playerMoveState", isRunOn ? "front_run" : "front_walk");
        player.anims.play(isRunOn ? "char_front_run" : "char_front_walk", true);
        break;
      case "ArrowRight":
        scene.data.set("playerSide", "right");
        player.setVelocityX(isRunOn ? 200 : 160);
        player.setVelocityY(0);
        scene.data.set("playerMoveState", isRunOn ? "right_run" : "right_walk");
        player.anims.play(isRunOn ? "char_right_run" : "char_right_walk", true);
        break;
      case "ArrowLeft":
        scene.data.set("playerSide", "left");
        player.setVelocityX(isRunOn ? -200 : -160);
        player.setVelocityY(0);
        scene.data.set("playerMoveState", isRunOn ? "left_run" : "left_walk");
        player.anims.play(isRunOn ? "char_left_run" : "char_left_walk", true);
        break;
      case "ShiftLeft":
      case "ShiftRight":
        scene.data.set("isRunOn", !isRunOn);
        break;
    }
  });

  keyboard.on("keyup", (event: KeyboardEvent) => {
    keysPressed.delete(event.code);

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
        scene.data.set("playerMoveState", "back_idle");
        player.setVelocityY(0);
        player.anims.play("char_back", true);
        break;
      case "ArrowDown":
        scene.data.set("playerMoveState", "front_idle");
        player.setVelocityY(0);
        player.anims.play("char_front", true);
        break;
      case "ArrowRight":
        scene.data.set("playerMoveState", "right_idle");
        player.setVelocityX(0);
        player.anims.play("char_right", true);
        break;
      case "ArrowLeft":
        scene.data.set("playerMoveState", "left_idle");
        player.setVelocityX(0);
        player.anims.play("char_left", true);
        break;
    }
  });
};
