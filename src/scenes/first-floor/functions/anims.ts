export const createJinAnims = (scene: Phaser.Scene): void => {
  const animationConfig = [
    {
      key: `jin_hair_front`,
      start: 32,
      end: 32,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_hair"
    },
    {
      key: `jin_hair_back`,
      start: 40,
      end: 40,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_hair"
    },
    {
      key: `jin_hair_right`,
      start: 48,
      end: 48,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_hair"
    },
    {
      key: `jin_hair_left`,
      start: 56,
      end: 56,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_hair"
    },
    {
      key: `jin_clothes_front`,
      start: 32,
      end: 32,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_clothes"
    },
    {
      key: `jin_clothes_back`,
      start: 40,
      end: 40,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_clothes"
    },
    {
      key: `jin_clothes_right`,
      start: 48,
      end: 48,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_clothes"
    },
    {
      key: `jin_clothes_left`,
      start: 56,
      end: 56,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_clothes"
    },

    {
      key: `jin_front`,
      start: 32,
      end: 32,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin"
    },
    {
      key: `jin_back`,
      start: 40,
      end: 40,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin"
    },
    {
      key: `jin_right`,
      start: 48,
      end: 48,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin"
    },
    {
      key: `jin_left`,
      start: 56,
      end: 56,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin"
    },

    {
      key: `jin_mobile`,
      start: 24,
      end: 24,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin"
    },

    {
      key: `jin_hair_mobile`,
      start: 24,
      end: 24,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_hair"
    },

    {
      key: `jin_clothes_mobile`,
      start: 24,
      end: 24,
      frameRate: 60,
      repeat: 0,
      sourceKey: "jin_clothes"
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
