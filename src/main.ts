import Phaser from "phaser";

(window as any).Phaser = Phaser;

// @ts-ignore
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

import { Game, Types } from "phaser";

import Main from "./scenes/main/Main";
import TownScene from "./scenes/town/TownScene";
import IntroScene from "./scenes/intro/Intro";
import CharacterSelectScene from "./scenes/character-select/CharacterSelectScene";
import FirstFloorScene from "./scenes/first-floor/FirstFloorScene";

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
      gravity: { y: 0, x: 0 }
    }
  },
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: UIPlugin,
        mapping: "rexUI"
      }
    ]
  }
};

export default new Game(config);
