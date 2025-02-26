import { Player } from "../../../shared/types";
import { Monster } from "../types";

export const updateMonster = (monster: Monster, player: Player) => {
  const { sprite, chaseRange, attackRange } = monster;

  const distance = Phaser.Math.Distance.Between(
    sprite.x,
    sprite.y,
    player.x,
    player.y
  );

  if (distance < chaseRange && distance > attackRange) {
    chasePlayer(monster, player);
  } else if (distance <= attackRange) {
    attackPlayer(monster);
  } else {
    patrolMovement(monster);
  }
};

const chasePlayer = (
  monster: Monster,
  player: Phaser.Physics.Arcade.Sprite
) => {
  const angle = Phaser.Math.Angle.Between(
    monster.sprite.x,
    monster.sprite.y,
    player.x,
    player.y
  );

  monster.sprite.setVelocity(
    Math.cos(angle) * monster.speed,
    Math.sin(angle) * monster.speed
  );
};

const patrolMovement = (monster: Monster) => {
  const { sprite, patrolPoints, speed } = monster;
  const target = patrolPoints[monster.patrolIndex];
  const distance = Phaser.Math.Distance.Between(
    sprite.x,
    sprite.y,
    target.x,
    target.y
  );

  if (distance < 10) {
    monster.patrolIndex = (monster.patrolIndex + 1) % patrolPoints.length;
  }

  const angle = Phaser.Math.Angle.Between(
    sprite.x,
    sprite.y,
    target.x,
    target.y
  );
  sprite.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
};

const attackPlayer = (monster: Monster) => {
  monster.sprite.setVelocity(0, 0);
  console.log("🔥 몬스터가 플레이어를 공격!");
};
