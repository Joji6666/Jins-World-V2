export const townPreload = (scene: Phaser.Scene): void => {
  scene.load.tilemapTiledJSON("town-map", "/assets/map2.json");
  scene.load.image("town-tiles", "/assets/map2.png");
};

export const monsterFxPreload = (scene: Phaser.Scene): void => {
  scene.load.spritesheet(`monster_hit`, `/assets/monsters/fx/monster_hit.png`, {
    frameWidth: 34,
    frameHeight: 34
  });

  scene.load.spritesheet(
    `monster_blood`,
    `/assets/monsters/fx/monster_blood.png`,
    {
      frameWidth: 34,
      frameHeight: 34
    }
  );
};

export const orcPreload = (scene: Phaser.Scene, numbering: number): void => {
  scene.load.spritesheet(
    `orc_${numbering}_idle`,
    `/assets/monsters/orc_${numbering}/orc_${numbering}_idle.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `orc_${numbering}_attack`,
    `/assets/monsters/orc_${numbering}/orc_${numbering}_attack.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `orc_${numbering}_death`,
    `/assets/monsters/orc_${numbering}/orc_${numbering}_death.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  if (numbering < 3) {
    scene.load.spritesheet(
      `orc_${numbering}_walk`,
      `/assets/monsters/orc_${numbering}/orc_${numbering}_walk.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    if (numbering > 1) {
      scene.load.spritesheet(
        `orc_${numbering}_walk_attack`,
        `/assets/monsters/orc_${numbering}/orc_${numbering}_walk_attack.png`,
        {
          frameWidth: 64,
          frameHeight: 64
        }
      );
    }
  } else {
    scene.load.spritesheet(
      `orc_${numbering}_run`,
      `/assets/monsters/orc_${numbering}/orc_${numbering}_run.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );

    scene.load.spritesheet(
      `orc_${numbering}_run_attack`,
      `/assets/monsters/orc_${numbering}/orc_${numbering}_run_attack.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  }

  if (numbering > 1) {
    scene.load.spritesheet(
      `orc_${numbering}_hurt`,
      `/assets/monsters/orc_${numbering}/orc_${numbering}_hurt.png`,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  }
};
