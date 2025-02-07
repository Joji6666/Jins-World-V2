import Main from "./scenes/main/Main";

import { Game, Types } from "phaser";
import TownScene from "./scenes/town/TownScene";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1281,
  height: 749,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Main, TownScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 }
      //   debug: true,
    }
  }
};

export default new Game(config);
