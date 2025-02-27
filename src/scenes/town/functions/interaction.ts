import Phaser from "phaser";
import { Monster } from "../types";
import { Player } from "../../../shared/types";

export const updateMonster = (
  monster: Monster,
  player: Player
  //   wallLayer: Phaser.Tilemaps.TilemapLayer // 🔥 벽 충돌 감지를 위해 추가
) => {
  const { sprite, chaseRange, attackRange } = monster;

  const distance = Phaser.Math.Distance.Between(
    sprite.x,
    sprite.y,
    player.x,
    player.y
  );

  const direction = getMonsterDirection(monster);

  if (distance < chaseRange && distance > attackRange) {
    chasePlayer(monster, player);
  } else if (distance <= attackRange) {
    monster.lastDirection = monster.side;
    attackPlayer(monster);
  } else {
    patrolMovement(monster);
  }

  // 🔥 벽 충돌 감지 및 반대 방향 이동
  //   checkWallCollision(monster, wallLayer);

  // 🔥 플레이어를 항상 바라보도록 설정
  //   lookAtPlayer(monster, player);

  // 🔥 몬스터의 방향 감지 후 이벤트 발생

  if (!monster.isAttack) {
    triggerMonsterEvent(monster, direction);
  }
};

/** ✅ 몬스터의 이동 방향 감지 함수 */

const getMonsterDirection = (monster: Monster): string => {
  const { velocity } = monster.sprite.body;
  const velocityX = velocity.x;
  const velocityY = velocity.y;

  // ✅ 수평 이동이 더 크면 좌우 방향, 아니면 상하 방향 반환
  const newDirection =
    Math.abs(velocityX) > Math.abs(velocityY)
      ? velocityX > 0
        ? "right"
        : "left"
      : velocityY > 0
      ? "front"
      : "back";

  return newDirection;
};

/** ✅ 몬스터의 방향에 따라 애니메이션 및 이벤트 트리거 */
const triggerMonsterEvent = (monster: Monster, direction: string) => {
  switch (direction) {
    case "back":
      monster.sprite.anims.play("orc_1_walk_back", true);
      monster.side = "back";
      break;
    case "front":
      monster.sprite.anims.play("orc_1_walk_front", true);
      monster.side = "front";
      break;
    case "left":
      monster.sprite.anims.play("orc_1_walk_left", true);
      monster.side = "left";
      break;
    case "right":
      monster.sprite.anims.play("orc_1_walk_right", true);
      monster.side = "right";
      break;
    case "idle":
      monster.sprite.anims.play("orc_1_idle_front", true);
      break;
  }
};

/** ✅ 플레이어를 바라보도록 설정 */
const lookAtPlayer = (monster: Monster, player: Player) => {
  // 플레이어의 위치에 따라 몬스터를 좌우 반전 (flipX)하여 바라보게 만듦
  if (player.x < monster.sprite.x) {
    monster.sprite.flipX = true; // 🔄 왼쪽 방향으로 회전
  } else {
    monster.sprite.flipX = false; // 🔄 오른쪽 방향으로 회전
  }
};

/** ✅ 몬스터가 플레이어를 쫓아가는 기능 */
const chasePlayer = (monster: Monster, player: Player) => {
  const angle = Phaser.Math.Angle.Between(
    monster.sprite.x,
    monster.sprite.y,
    player.x,
    player.y
  );
  monster.isAttack = false;

  monster.sprite.setVelocity(
    Math.cos(angle) * monster.speed,
    Math.sin(angle) * monster.speed
  );
};

/** ✅ 몬스터가 순찰 경로를 이동하는 기능 */
const patrolMovement = (monster: Monster) => {
  monster.isAttack = false;
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

// /** ✅ 몬스터가 벽에 충돌하면 반대 방향으로 이동 */
// const checkWallCollision = (
//   monster: Monster,
//   wallLayer: Phaser.Tilemaps.TilemapLayer
// ) => {
//   // 벽과 충돌 여부 확인
//   if (wallLayer.physics.world.collide(monster.sprite, wallLayer)) {
//     console.log("🚧 몬스터가 벽에 충돌!");

//     // 현재 이동 방향을 반대로 설정
//     const velocityX = monster.sprite.body.velocity.x;
//     const velocityY = monster.sprite.body.velocity.y;

//     if (velocityX !== 0) {
//       monster.sprite.setVelocityX(-velocityX); // 🔄 X축 방향 반전
//     }
//     if (velocityY !== 0) {
//       monster.sprite.setVelocityY(-velocityY); // 🔄 Y축 방향 반전
//     }

//     // 순찰 방향도 반대로 변경
//     monster.patrolIndex =
//       (monster.patrolIndex + monster.patrolPoints.length - 1) %
//       monster.patrolPoints.length;
//   }
// };

/** ✅ 몬스터가 플레이어를 공격하는 기능 */
const attackPlayer = (monster: Monster) => {
  monster.isAttack = true;
  monster.sprite.setVelocity(0, 0);

  monster.sprite.anims.play(
    `orc_${monster.numbering}_attack_${monster.lastDirection}`,
    true
  );

  console.log(monster.lastDirection, "last Direction~");

  monster.sprite.on(
    `animationcomplete-orc_${monster.numbering}_attack_${monster.lastDirection}`,
    () => {
      monster.sprite.anims.play(
        `orc_${monster.numbering}_idle_${monster.lastDirection}`,
        true
      );
      monster.isAttack = false;
    }
  );
};
