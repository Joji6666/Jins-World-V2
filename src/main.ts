import Main from "./scenes/main/Main";

import { Game, Types } from "phaser";
import TownScene from "./scenes/town/TownScene";
import IntroScene from "./scenes/intro/Intro";
import CharacterSelectScene from "./scenes/character-select/CharacterSelectScene";
import FirstFloorScene from "./scenes/first-floor/FirstFloorScene";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1440,
  height: 960,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [IntroScene, CharacterSelectScene, Main, FirstFloorScene, TownScene],

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: true
    }
  }
};

export default new Game(config);
