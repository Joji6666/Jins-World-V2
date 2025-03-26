export const createOrcAnims = (
  scene: Phaser.Scene,
  numbering: number
): void => {
  const animationConfig = [
    {
      key: `orc_${numbering}_idle_front`,
      start: 0,
      end: 3,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_idle`
    },
    {
      key: `orc_${numbering}_idle_back`,
      start: 4,
      end: 7,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_idle`
    },
    {
      key: `orc_${numbering}_idle_left`,
      start: 8,
      end: 11,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_idle`
    },
    {
      key: `orc_${numbering}_idle_right`,
      start: 12,
      end: 15,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_idle`
    },

    {
      key: `orc_${numbering}_attack_front`,
      start: 0,
      end: 7,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_attack`
    },
    {
      key: `orc_${numbering}_attack_back`,
      start: 8,
      end: 15,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_attack`
    },
    {
      key: `orc_${numbering}_attack_left`,
      start: 16,
      end: 23,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_attack`
    },
    {
      key: `orc_${numbering}_attack_right`,
      start: 24,
      end: 31,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_attack`
    },

    {
      key: `orc_${numbering}_death_front`,
      start: 0,
      end: 7,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_death`
    },
    {
      key: `orc_${numbering}_death_back`,
      start: 8,
      end: 15,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_death`
    },
    {
      key: `orc_${numbering}_death_left`,
      start: 16,
      end: 23,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_death`
    },
    {
      key: `orc_${numbering}_death_right`,
      start: 24,
      end: 31,
      frameRate: 10,
      repeat: 0,
      sourceKey: `orc_${numbering}_death`
    }
  ];

  if (numbering < 3) {
    animationConfig.push(
      {
        key: `orc_${numbering}_walk_front`,
        start: 0,
        end: 5,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_walk`
      },
      {
        key: `orc_${numbering}_walk_back`,
        start: 6,
        end: 11,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_walk`
      },
      {
        key: `orc_${numbering}_walk_left`,
        start: 12,
        end: 17,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_walk`
      },
      {
        key: `orc_${numbering}_walk_right`,
        start: 18,
        end: 23,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_walk`
      }
    );

    if (numbering === 2) {
      animationConfig.push(
        {
          key: `orc_${numbering}_walk_attack_front`,
          start: 0,
          end: 5,
          frameRate: 10,
          repeat: 0,
          sourceKey: `orc_${numbering}_walk_attack`
        },
        {
          key: `orc_${numbering}_walk_attack_back`,
          start: 6,
          end: 11,
          frameRate: 10,
          repeat: 0,
          sourceKey: `orc_${numbering}_walk_attack`
        },
        {
          key: `orc_${numbering}_walk_attack_left`,
          start: 12,
          end: 17,
          frameRate: 10,
          repeat: 0,
          sourceKey: `orc_${numbering}_walk_attack`
        },
        {
          key: `orc_${numbering}_walk_attack_right`,
          start: 18,
          end: 23,
          frameRate: 10,
          repeat: 0,
          sourceKey: `orc_${numbering}_walk_attack`
        }
      );
    }
  } else {
    animationConfig.push(
      {
        key: `orc_${numbering}_run_front`,
        start: 0,
        end: 7,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_run`
      },
      {
        key: `orc_${numbering}_run_back`,
        start: 8,
        end: 15,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_run`
      },
      {
        key: `orc_${numbering}_run_left`,
        start: 16,
        end: 23,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_run`
      },
      {
        key: `orc_${numbering}_run_right`,
        start: 24,
        end: 31,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_run`
      },
      {
        key: `orc_${numbering}_run_attack_front`,
        start: 0,
        end: 7,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_run_attack`
      },
      {
        key: `orc_${numbering}_run_attack_back`,
        start: 8,
        end: 15,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_run_attack`
      },
      {
        key: `orc_${numbering}_run_attack_left`,
        start: 16,
        end: 23,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_run_attack`
      },
      {
        key: `orc_${numbering}_run_attack_right`,
        start: 24,
        end: 31,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_run_attack`
      }
    );
  }

  if (numbering > 1) {
    animationConfig.push(
      {
        key: `orc_${numbering}_hurt_front`,
        start: 0,
        end: 5,
        frameRate: 20,
        repeat: 0,
        sourceKey: `orc_${numbering}_hurt`
      },
      {
        key: `orc_${numbering}_hurt_back`,
        start: 6,
        end: 11,
        frameRate: 20,
        repeat: 0,
        sourceKey: `orc_${numbering}_hurt`
      },
      {
        key: `orc_${numbering}_hurt_left`,
        start: 12,
        end: 17,
        frameRate: 20,
        repeat: 0,
        sourceKey: `orc_${numbering}_hurt`
      },
      {
        key: `orc_${numbering}_hurt_right`,
        start: 18,
        end: 23,
        frameRate: 20,
        repeat: 0,
        sourceKey: `orc_${numbering}_hurt`
      }
    );
  }

  animationConfig.forEach(
    ({ key, start, end, frameRate, repeat, sourceKey }) => {
      scene.anims.create({
        key: `${key}`,
        frames: scene.anims.generateFrameNumbers(sourceKey, {
          start,
          end
        }),
        frameRate,
        repeat
      });
    }
  );
};

export const createMonsterFxAnims = (scene: Phaser.Scene): void => {
  scene.anims.create({
    key: `monster_hit`,
    frames: scene.anims.generateFrameNumbers("monster_hit", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: 0
  });

  scene.anims.create({
    key: `monster_blood`,
    frames: scene.anims.generateFrameNumbers("monster_blood", {
      start: 0,
      end: 48
    }),
    frameRate: 50,
    repeat: 0
  });
};

export const createBossAnims = (scene: Phaser.Scene): void => {
  const animationConfig = [
    {
      key: `boss_idle_front`,
      start: 0,
      end: 3,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_idle`
    },
    {
      key: `boss_idle_back`,
      start: 4,
      end: 7,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_idle`
    },
    {
      key: `boss_idle_left`,
      start: 8,
      end: 11,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_idle`
    },
    {
      key: `boss_idle_right`,
      start: 12,
      end: 15,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_idle`
    },

    {
      key: `boss_run_front`,
      start: 0,
      end: 7,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_run`
    },
    {
      key: `boss_run_back`,
      start: 8,
      end: 15,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_run`
    },
    {
      key: `boss_run_left`,
      start: 16,
      end: 23,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_run`
    },
    {
      key: `boss_run_right`,
      start: 24,
      end: 31,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_run`
    },

    {
      key: `boss_hurt_front`,
      start: 0,
      end: 3,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_hurt`
    },
    {
      key: `boss_hurt_back`,
      start: 4,
      end: 7,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_hurt`
    },
    {
      key: `boss_hurt_left`,
      start: 8,
      end: 11,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_hurt`
    },
    {
      key: `boss_hurt_right`,
      start: 12,
      end: 15,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_hurt`
    },

    {
      key: `boss_death_front`,
      start: 0,
      end: 9,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_death`
    },
    {
      key: `boss_death_back`,
      start: 10,
      end: 19,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_death`
    },

    {
      key: `boss_death_left`,
      start: 20,
      end: 29,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_death`
    },

    {
      key: `boss_death_right`,
      start: 30,
      end: 39,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_death`
    },

    {
      key: `boss_attack_front`,
      start: 0,
      end: 11,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_attack`
    },
    {
      key: `boss_attack_back`,
      start: 12,
      end: 23,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_attack`
    },

    {
      key: `boss_attack_left`,
      start: 24,
      end: 35,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_attack`
    },

    {
      key: `boss_attack_right`,
      start: 36,
      end: 47,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_attack`
    },

    {
      key: `boss_attack_particle`,
      start: 0,
      end: 6,
      frameRate: 10,
      repeat: -1,
      sourceKey: `boss_attack_particle`
    },

    {
      key: `boss_particle_hit`,
      start: 0,
      end: 10,
      frameRate: 10,
      repeat: 0,
      sourceKey: `boss_particle_hit`
    }
  ];

  animationConfig.forEach(
    ({ key, start, end, frameRate, repeat, sourceKey }) => {
      scene.anims.create({
        key: `${key}`,
        frames: scene.anims.generateFrameNumbers(sourceKey, {
          start,
          end
        }),
        frameRate,
        repeat
      });
    }
  );
};

export const createPlantAnims = (scene: Phaser.Scene): void => {
  const animationConfig = [
    {
      key: `plant_idle_front`,
      start: 0,
      end: 3,
      frameRate: 10,
      repeat: -1,
      sourceKey: `plant_idle`
    },
    {
      key: `plant_idle_back`,
      start: 4,
      end: 7,
      frameRate: 10,
      repeat: -1,
      sourceKey: `plant_idle`
    },
    {
      key: `plant_idle_left`,
      start: 8,
      end: 11,
      frameRate: 10,
      repeat: -1,
      sourceKey: `plant_idle`
    },

    {
      key: `plant_idle_right`,
      start: 8,
      end: 11,
      frameRate: 10,
      repeat: -1,
      sourceKey: `plant_idle`
    },

    {
      key: `plant_attack_front`,
      start: 0,
      end: 6,
      frameRate: 10,
      repeat: 0,
      sourceKey: `plant_attack`
    },
    {
      key: `plant_attack_back`,
      start: 7,
      end: 13,
      frameRate: 10,
      repeat: 0,
      sourceKey: `plant_attack`
    },
    {
      key: `plant_attack_left`,
      start: 14,
      end: 20,
      frameRate: 10,
      repeat: 0,
      sourceKey: `plant_attack`
    },

    {
      key: `plant_attack_right`,
      start: 21,
      end: 27,
      frameRate: 10,
      repeat: 0,
      sourceKey: `plant_attack`
    }
  ];

  animationConfig.forEach(
    ({ key, start, end, frameRate, repeat, sourceKey }) => {
      scene.anims.create({
        key: `${key}`,
        frames: scene.anims.generateFrameNumbers(sourceKey, {
          start,
          end
        }),
        frameRate,
        repeat
      });
    }
  );
};

export const createHouseAnims = (scene: Phaser.Scene): void => {
  scene.anims.create({
    key: "house_stop",

    frames: scene.anims.generateFrameNumbers("house", {
      start: 0,
      end: 0
    }),

    frameRate: 1,

    repeat: 0
  });

  scene.anims.create({
    key: "house_open",

    frames: scene.anims.generateFrameNumbers("house", {
      start: 0,
      end: 7
    }),

    frameRate: 30,

    repeat: 0
  });

  scene.anims.create({
    key: "house_close",

    frames: scene.anims.generateFrameNumbers("house", {
      start: 8,
      end: 14
    }),

    frameRate: 30,

    repeat: 0
  });
};
