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
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_hurt`
      },
      {
        key: `orc_${numbering}_hurt_back`,
        start: 6,
        end: 11,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_hurt`
      },
      {
        key: `orc_${numbering}_hurt_left`,
        start: 12,
        end: 17,
        frameRate: 10,
        repeat: 0,
        sourceKey: `orc_${numbering}_hurt`
      },
      {
        key: `orc_${numbering}_hurt_right`,
        start: 18,
        end: 23,
        frameRate: 10,
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
