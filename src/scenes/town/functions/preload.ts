import { SIDES } from "../../../shared/constants/keys";

export const townPreload = (scene: Phaser.Scene): void => {
  scene.load.tilemapTiledJSON("town-map", "/assets/map2.json");
  scene.load.image("town-tiles", "/assets/map2.png");
};

export const orcPreload = (scene: Phaser.Scene, numbering: number): void => {
  SIDES.forEach((side) => {
    scene.load.spritesheet(
      `orc_${numbering}_idle_${side}`,
      `/assets/monsters/orc${numbering}/orc_${numbering}_idle_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    scene.load.spritesheet(
      `orc_${numbering}_death_${side}`,
      `/assets/monsters/orc${numbering}/orc_${numbering}_death_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    scene.load.spritesheet(
      `orc_${numbering}_hurt_${side}`,
      `/assets/monsters/orc${numbering}/orc_${numbering}_hurt_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    scene.load.spritesheet(
      `orc_${numbering}_walk_${side}`,
      `/assets/monsters/orc${numbering}/orc_${numbering}_walk_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    scene.load.spritesheet(
      `orc_${numbering}_attack_${side}`,
      `/assets/monsters/orc${numbering}/orc_${numbering}_attack_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  });
};
