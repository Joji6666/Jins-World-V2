export interface Monster {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  speed: number;
  chaseRange: number;
  attackRange: number;
  patrolPoints: { x: number; y: number }[];
  patrolIndex: number;
}
