export const townPreload = (scene: Phaser.Scene): void => {
  scene.load.tilemapTiledJSON("town-map", "/assets/maps/town.json");
  scene.load.image(
    "gentle forest (48x48 resize) v01",
    "/assets/tiles/gentle forest (48x48 resize) v01.png"
  );
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

  scene.load.spritesheet(
    `boss_particle_hit`,
    `/assets/monsters/fx/boss_particle_hit.png`,
    {
      frameWidth: 152,
      frameHeight: 166
    }
  );

  scene.load.spritesheet(
    `boss_attack_particle`,
    `/assets/monsters/fx/boss_attack_particle.png`,
    {
      frameWidth: 320,
      frameHeight: 320
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

export const bossPreload = (scene: Phaser.Scene): void => {
  scene.load.spritesheet(`boss_idle`, `/assets/monsters/boss/boss_idle.png`, {
    frameWidth: 64,
    frameHeight: 64
  });

  scene.load.spritesheet(`boss_run`, `/assets/monsters/boss/boss_run.png`, {
    frameWidth: 64,
    frameHeight: 64
  });

  scene.load.spritesheet(`boss_hurt`, `/assets/monsters/boss/boss_hurt.png`, {
    frameWidth: 64,
    frameHeight: 64
  });

  scene.load.spritesheet(`boss_death`, `/assets/monsters/boss/boss_death.png`, {
    frameWidth: 64,
    frameHeight: 64
  });

  scene.load.spritesheet(
    `boss_attack`,
    `/assets/monsters/boss/boss_attack.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
};

export const plantPreload = (scene: Phaser.Scene): void => {
  scene.load.spritesheet(
    `plant_idle`,
    `/assets/monsters/plant/plant_idle.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );

  scene.load.spritesheet(
    `plant_attack`,
    `/assets/monsters/plant/plant_attack.png`,
    {
      frameWidth: 64,
      frameHeight: 64
    }
  );
};
