import { SIDES } from "../../../shared/constants/keys";

export const townPreload = (scene: Phaser.Scene): void => {
  scene.load.tilemapTiledJSON("town-map", "/api/assets/map2.json");
  scene.load.image("town-tiles", "/api/assets/map2.png");
};

export const orcPreload = (scene: Phaser.Scene, numbering: number): void => {
  SIDES.forEach((side) => {
    scene.load.spritesheet(
      `orc_${numbering}_idle_${side}`,
      `/api/assets/monsters/orc${numbering}/orc_${numbering}_idle_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    scene.load.spritesheet(
      `orc_${numbering}_death_${side}`,
      `/api/assets/monsters/orc${numbering}/orc_${numbering}_death_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    scene.load.spritesheet(
      `orc_${numbering}_hurt_${side}`,
      `/api/assets/monsters/orc${numbering}/orc_${numbering}_hurt_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    scene.load.spritesheet(
      `orc_${numbering}_walk_${side}`,
      `/api/assets/monsters/orc${numbering}/orc_${numbering}_walk_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    scene.load.spritesheet(
      `orc_${numbering}_attack_${side}`,
      `/api/assets/monsters/orc${numbering}/orc_${numbering}_attack_${side}.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  });
};
