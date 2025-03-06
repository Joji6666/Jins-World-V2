export interface Player
  extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
  moveState: string;
  isDialogFinish: boolean;
  isDialogOn: boolean;
  isHit: boolean;
  hp: number;
  isBackStep: boolean;
}
