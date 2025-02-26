import { SIDES } from "../../../shared/constants/keys";

export const createOrcAnims = (
  scene: Phaser.Scene,
  numbering: number
): void => {
  const animationConfig = [
    {
      name: "idle",
      startFrame: 0,
      endFrame: 3
    },
    {
      name: "attack",
      startFrame: 0,
      endFrame: 7
    },
    {
      name: "death",
      startFrame: 0,
      endFrame: 7
    },
    {
      name: "hurt",
      startFrame: 0,
      endFrame: 5
    },
    {
      name: "walk",
      startFrame: 0,
      endFrame: 5
    }
  ];

  animationConfig.forEach((config) => {
    SIDES.forEach((side) => {
      scene.anims.create({
        key: `orc_${numbering}_${config.name}_${side}`,

        frames: scene.anims.generateFrameNumbers(
          `orc_${numbering}_${config.name}_${side}`,
          {
            start: config.startFrame,
            end: config.endFrame
          }
        ),

        frameRate: 10,

        repeat: -1
      });
    });
  });
};
