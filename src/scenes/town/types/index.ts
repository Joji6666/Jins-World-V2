export interface Monster {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  speed: number;
  chaseRange: number;
  attackRange: number;
  patrolPoints: { x: number; y: number }[];
  patrolIndex: number;
  side: string;
  isAttack: boolean;
  isHit: boolean;
  lastDirection: string;
  numbering: number;
  hp: number;
  monsterName: Phaser.GameObjects.Text;
  hpBar: Phaser.GameObjects.Graphics;
  isChase: boolean;
}

export interface Plant {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  side: string;
  isAttack: boolean;
  lastDirection: string;
}
