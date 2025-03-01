import Phaser from "phaser";
import { Monster } from "../types";
import { Player } from "../../../shared/types";

export const updateMonster = (
  monster: Monster,
  player: Player,
  scene: Phaser.Scene,
  wallLayer: Phaser.Tilemaps.TilemapLayer,
  wallObjectLayer: Phaser.Tilemaps.TilemapLayer
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

    if (player.isHit || monster.isAttack) return;

    attackPlayer(monster, player, scene);
  } else {
    patrolMovement(monster);
  }

  // 🔥 벽 충돌 감지 및 반대 방향 이동
  checkWallCollision(monster, wallLayer, wallObjectLayer, scene);

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

const checkWallCollision = (
  monster: Monster,
  wallLayer: Phaser.Tilemaps.TilemapLayer,
  wallObjectLayer: Phaser.Tilemaps.TilemapLayer,
  scene: Phaser.Scene
) => {
  const { sprite, patrolPoints } = monster;

  // 1️⃣ 벽과 충돌 감지
  if (scene.physics.world.collide(sprite, wallLayer || wallObjectLayer)) {
    console.log("🚧 몬스터가 벽에 충돌!");

    reverseMonsterDirection(monster);
    updatePatrolRange(monster);
  }

  // 2️⃣ 씬의 가장자리(경계) 충돌 감지
  if (
    sprite.x <= 0 ||
    sprite.x >= scene.scale.width ||
    sprite.y <= 0 ||
    sprite.y >= scene.scale.height
  ) {
    console.log("🌍 씬의 가장자리에 충돌!");

    reverseMonsterDirection(monster);
    updatePatrolRange(monster);
  }
};

/** 🔄 몬스터 이동 방향 반전 */
const reverseMonsterDirection = (monster: Monster) => {
  const { sprite } = monster;
  const velocityX = sprite.body.velocity.x;
  const velocityY = sprite.body.velocity.y;

  if (velocityX !== 0) {
    sprite.setVelocityX(-velocityX);
  }
  if (velocityY !== 0) {
    sprite.setVelocityY(-velocityY);
  }
};

/** 🔄 패트롤 범위 업데이트 */
const updatePatrolRange = (monster: Monster) => {
  console.log("🔄 패트롤 경로 업데이트");

  // 패트롤 범위를 줄이거나 랜덤하게 재설정
  const newPatrolIndex = Math.floor(
    Math.random() * monster.patrolPoints.length
  );
  monster.patrolIndex = newPatrolIndex;
};

/** ✅ 몬스터가 플레이어를 공격하는 기능 */

const attackPlayer = (
  monster: Monster,
  player: Player,
  scene: Phaser.Scene
) => {
  if (player.isHit) return;
  monster.isAttack = true;
  monster.sprite.setVelocity(0, 0);

  const attackAnimationKey = `orc_${monster.numbering}_attack_${monster.lastDirection}`;
  const idleAnimationKey = `orc_${monster.numbering}_idle_${monster.lastDirection}`;

  monster.sprite.anims.play(attackAnimationKey, true);

  // 🔥 특정 프레임에서 공격 판정
  monster.sprite.on(
    "animationupdate",
    (
      anim: Phaser.Animations.Animation,
      frame: Phaser.Animations.AnimationFrame
    ) => {
      if (
        anim.key === attackAnimationKey &&
        (frame.index === 4 || frame.index === 5)
      ) {
        if (isPlayerInAttackRange(monster, player) && !player.isHit) {
          triggerAttackEvent(monster, player, scene);
        }
      }
    }
  );

  // ✅ 공격 애니메이션이 끝나면 idle 애니메이션으로 전환
  monster.sprite.on(`animationcomplete-${attackAnimationKey}`, () => {
    monster.sprite.anims.play(idleAnimationKey, true);
    monster.isAttack = false;
  });
};

/** ✅ 플레이어가 몬스터의 공격 범위 안에 있는지 체크 */
const isPlayerInAttackRange = (monster: Monster, player: Player): boolean => {
  const attackRange = 50; // 공격 범위 (픽셀 단위)
  const distance = Phaser.Math.Distance.Between(
    monster.sprite.x,
    monster.sprite.y,
    player.x,
    player.y
  );

  return distance <= attackRange;
};

/** ✅ 공격 이벤트 트리거 (데미지 적용 등) */
const triggerAttackEvent = (
  monster: Monster,
  player: Player,
  scene: Phaser.Scene
) => {
  if (player.isHit) return; // 이미 맞고 있는 상태라면 중복 실행 방지

  const sword: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
    scene.data.get("sword");

  const clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
    scene.data.get("clothes");

  player.isHit = true;
  sword.visible = false;
  player.anims.play(`char_sword_hurt_${monster.lastDirection}`);
  clothes.anims.play(`clothes_hurt_${monster.lastDirection}`);

  // 🔥 1️⃣ 플레이어가 lastDirection 방향으로 밀려나도록 설정
  const knockbackDistance = 35; // 뒤로 밀려나는 거리
  let knockbackX = 0;
  let knockbackY = 0;

  switch (monster.lastDirection) {
    case "back":
      knockbackY = -knockbackDistance;
      break;
    case "front":
      knockbackY = knockbackDistance;
      break;
    case "left":
      knockbackX = -knockbackDistance;
      break;
    case "right":
      knockbackX = knockbackDistance;
      break;
  }

  scene.tweens.add({
    targets: player,
    x: player.x + knockbackX,
    y: player.y + knockbackY,
    duration: 200, // 0.2초 동안 밀려남
    ease: "Power2",
    onComplete: () => {
      // 밀려난 후 제자리 복귀
      scene.tweens.add({
        targets: player,
        x: player.x,
        y: player.y,
        duration: 200,
        ease: "Power2"
      });
    }
  });

  // 🔥 2️⃣ 피격 시 번쩍이는 효과 (깜빡임)
  scene.tweens.add({
    targets: player,
    alpha: 0, // 투명도 0 (사라짐)
    duration: 100,
    yoyo: true, // 다시 원래대로 복귀
    repeat: 4 // 4번 깜빡임
  });

  // 🔥 2️⃣ 피격 시 번쩍이는 효과 (깜빡임)
  scene.tweens.add({
    targets: clothes,
    alpha: 0, // 투명도 0 (사라짐)
    duration: 100,
    yoyo: true, // 다시 원래대로 복귀
    repeat: 4 // 4번 깜빡임
  });

  scene.time.delayedCall(600, () => {
    player.anims.play(`char_${monster.lastDirection}`, true);
    clothes.anims.play(`clothes_${monster.lastDirection}`, true);
    sword.anims.play(`sword_${monster.lastDirection}`, true);
    if (player.hp - 10 === 0) {
      handleGameOver(scene, player, monster.lastDirection);
      return;
    }
    player.hp = player.hp - 10;
    player.isHit = false;
    sword.visible = true;
  });
};

const handleGameOver = (
  scene: Phaser.Scene,
  player: Player,
  direction: string
) => {
  if (scene.input.keyboard) {
    scene.input.keyboard.enabled = false;

    // 플레이어 사망 애니메이션 실행
    player.anims.play(`char_death_${direction}`);

    const clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("clothes");

    clothes.anims.play(`clothes_death_${direction}`);

    // 게임 오버 텍스트 추가
    const gameOverText = scene.add
      .text(
        scene.cameras.main.width / 2,
        scene.cameras.main.height / 2,
        "Game Over\nPress SPACE to Restart",
        {
          fontSize: "32px",
          fontFamily: "Arial",
          color: "#ff0000",
          align: "center"
        }
      )
      .setOrigin(0.5);

    scene.time.delayedCall(2000, () => {
      // Space 키 입력 시 메인 씬 다시 실행

      if (scene.input.keyboard) {
        scene.input.keyboard.once("keydown-SPACE", () => {
          scene.cameras.main.fadeIn(1000, 0, 0, 0);
          scene.scene.start("intro"); // "main" 씬 다시 실행
        });

        // 입력 활성화 (Space 키만)
        scene.input.keyboard.enabled = true;
      }
    });
  }
};
