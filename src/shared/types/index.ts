export interface Player
  extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
  moveState: string;
  isDialogFinish: boolean;
  isDialogOn: boolean;
}
