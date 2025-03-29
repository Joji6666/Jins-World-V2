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
  if (monster.isHit) return;

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

  checkWallCollision(monster, wallLayer, wallObjectLayer, scene);

  if (!monster.isAttack) {
    if (monster.numbering < 7) {
      triggerMonsterEvent(monster, direction);
    }

    if (monster.numbering === 10) {
      triggerBossMonsterEvent(monster, direction);
    }
  }
};

const getMonsterDirection = (monster: Monster): string => {
  const { velocity } = monster.sprite.body;
  const velocityX = velocity.x;
  const velocityY = velocity.y;

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

const triggerMonsterEvent = (monster: Monster, direction: string) => {
  switch (direction) {
    case "back":
      if (monster.numbering === 3) {
        monster.sprite.anims.play("orc_3_run_back", true);
      } else {
        monster.sprite.anims.play(`orc_${monster.numbering}_walk_back`, true);
      }

      monster.side = "back";
      break;
    case "front":
      if (monster.numbering === 3) {
        monster.sprite.anims.play("orc_3_run_front", true);
      } else {
        monster.sprite.anims.play(`orc_${monster.numbering}_walk_front`, true);
      }

      monster.side = "front";
      break;
    case "left":
      if (monster.numbering === 3) {
        monster.sprite.anims.play("orc_3_run_left", true);
      } else {
        monster.sprite.anims.play(`orc_${monster.numbering}_walk_left`, true);
      }

      monster.side = "left";
      break;
    case "right":
      if (monster.numbering === 3) {
        monster.sprite.anims.play("orc_3_run_right", true);
      } else {
        monster.sprite.anims.play(`orc_${monster.numbering}_walk_right`, true);
      }

      monster.side = "right";
      break;
    case "idle":
      monster.sprite.anims.play(`orc_${monster.numbering}_idle_front`, true);
      break;
  }
};

const triggerBossMonsterEvent = (monster: Monster, direction: string) => {
  switch (direction) {
    case "back":
      monster.sprite.anims.play(`boss_run_back`, true);

      monster.side = "back";
      break;
    case "front":
      monster.sprite.anims.play(`boss_run_front`, true);

      monster.side = "front";
      break;
    case "left":
      monster.sprite.anims.play(`boss_run_left`, true);

      monster.side = "left";
      break;
    case "right":
      monster.sprite.anims.play(`boss_run_right`, true);

      monster.side = "right";
      break;
    case "idle":
      monster.sprite.anims.play(`boss_idle_front`, true);
      break;
  }
};

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

const patrolMovement = (monster: Monster) => {
  if (monster.numbering > 7) return;
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

  if (scene.physics.world.collide(sprite, wallLayer || wallObjectLayer)) {
    reverseMonsterDirection(monster);
    updatePatrolRange(monster);
  }

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

const updatePatrolRange = (monster: Monster) => {
  const newPatrolIndex = Math.floor(
    Math.random() * monster.patrolPoints.length
  );
  monster.patrolIndex = newPatrolIndex;
};

const attackPlayer = (
  monster: Monster,
  player: Player,
  scene: Phaser.Scene
) => {
  if (player.isHit) return;
  monster.isAttack = true;

  let attackAnimationKey = `orc_${monster.numbering}_attack_${monster.lastDirection}`;
  let idleAnimationKey = `orc_${monster.numbering}_idle_${monster.lastDirection}`;

  if (monster.numbering === 1 || monster.numbering === 10) {
    monster.sprite.setVelocity(0, 0);
  }

  if (monster.numbering === 2) {
    attackAnimationKey = `orc_${monster.numbering}_walk_attack_${monster.lastDirection}`;
  }

  if (monster.numbering === 3) {
    attackAnimationKey = `orc_${monster.numbering}_run_attack_${monster.lastDirection}`;
  }

  if (monster.numbering === 10) {
    const direction = getAttackDirection(monster, player);

    attackAnimationKey = `boss_attack_${direction}`;
    idleAnimationKey = `boss_idle_${direction}`;
  }

  monster.sprite.anims.play(attackAnimationKey, true);

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
        if (
          isPlayerInAttackRange(monster, player) &&
          !player.isHit &&
          monster.numbering !== 10
        ) {
          triggerAttackEvent(monster, player, scene);
        }
      }
    }
  );

  monster.sprite.on(`animationcomplete-${attackAnimationKey}`, () => {
    monster.sprite.anims.play(idleAnimationKey, true);

    scene.time.delayedCall(750, () => {
      monster.isAttack = false;
    });

    if (monster.numbering === 10) {
      createBossAttackParticle(scene, monster, player);
    }
  });
};

const getAttackDirection = (monster: Monster, player: Player): string => {
  const angle = Phaser.Math.Angle.Between(
    monster.sprite.x,
    monster.sprite.y,
    player.x,
    player.y
  );

  if (angle >= -Math.PI / 4 && angle <= Math.PI / 4) {
    return "right";
  } else if (angle >= Math.PI / 4 && angle <= (3 * Math.PI) / 4) {
    return "front";
  } else if (angle >= (-3 * Math.PI) / 4 && angle <= -Math.PI / 4) {
    return "back";
  } else {
    return "left";
  }
};

const isPlayerInAttackRange = (monster: Monster, player: Player): boolean => {
  const attackRange = monster.numbering === 1 ? 50 : 70;
  const distance = Phaser.Math.Distance.Between(
    monster.sprite.x,
    monster.sprite.y,
    player.x,
    player.y
  );

  return distance <= attackRange;
};

const createBossAttackParticle = (
  scene: Phaser.Scene,
  boss: Monster,
  player: Player
) => {
  const particle = scene.physics.add
    .sprite(boss.sprite.x, boss.sprite.y, "boss_attack_particle")
    .setScale(0.15);

  particle.anims.play("boss_attack_particle");

  const angle = Phaser.Math.Angle.Between(
    boss.sprite.x,
    boss.sprite.y,
    player.x,
    player.y
  );

  const speed = 200;
  particle.setRotation(angle);
  const velocityX = Math.cos(angle) * speed;
  const velocityY = Math.sin(angle) * speed;

  particle.setVelocity(velocityX, velocityY);

  scene.physics.add.overlap(player, particle, () => {
    triggerAttackEvent(boss, player, scene);
    particle.destroy();

    const hitParticle = scene.physics.add
      .sprite(player.x, player.y + 10, "boss_particle_hit")
      .setScale(0.45);

    hitParticle.anims.play("boss_particle_hit");
    hitParticle.on(`animationcomplete-boss_particle_hit`, () => {
      hitParticle.destroy();
    });
  });

  particle.setCollideWorldBounds(true);
  particle.body.onWorldBounds = true;
  scene.physics.world.on("worldbounds", (body: Phaser.Physics.Arcade.Body) => {
    if (body.gameObject === particle) {
      particle.destroy();
    }
  });
};

const triggerAttackEvent = (
  monster: Monster,
  player: Player,
  scene: Phaser.Scene
) => {
  if (player.isHit) return;

  const sword: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
    scene.data.get("sword");

  const clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
    scene.data.get("clothes");

  const hair: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
    scene.data.get("hair");

  const hearts: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] =
    scene.data.get("hearts");

  player.isHit = true;
  sword.visible = false;
  player.anims.play(`char_sword_hurt_${monster.lastDirection}`);
  clothes.anims.play(`clothes_hurt_${monster.lastDirection}`);
  hair.anims.play(`hair_hurt_${monster.lastDirection}`);

  const hitParticle = scene.physics.add
    .sprite(player.x, player.y - 10, `char_hit`)
    .setScale(2);

  hitParticle.anims.play("char_hit");
  hitParticle.on(`animationcomplete-char_hit`, () => {
    hitParticle.destroy();
  });

  const knockbackDistance = 35;
  let knockbackX = 0;
  let knockbackY = 0;

  scene.cameras.main.flash(200, 150, 0, 0);

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
    duration: 200,
    ease: "Power2",
    onComplete: () => {
      scene.tweens.add({
        targets: player,
        x: player.x,
        y: player.y,
        duration: 200,
        ease: "Power2"
      });
    }
  });

  scene.time.delayedCall(350, () => {
    player.anims.play(`char_${getPlayerPosition(monster.lastDirection)}`, true);
    clothes.anims.play(
      `clothes_${getPlayerPosition(monster.lastDirection)}`,
      true
    );
    sword.anims.play(`sword_${getPlayerPosition(monster.lastDirection)}`, true);
    hair.anims.play(`hair_${getPlayerPosition(monster.lastDirection)}`);
    if (player.hp - 10 === 0) {
      updateHP(hearts, player.hp - 10);
      handleGameOver(scene, player, getPlayerPosition(monster.lastDirection));
      return;
    }
    player.hp = player.hp - 10;
    updateHP(hearts, player.hp);
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

    player.anims.play(`char_death_${direction}`);

    const clothes: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("clothes");

    const hair: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody =
      scene.data.get("hair");

    clothes.anims.play(`clothes_death_${direction}`);
    hair.anims.play(`hair_death_${direction}`);

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
      .setOrigin(0.5)
      .setScrollFactor(0);

    scene.time.delayedCall(2000, () => {
      if (scene.input.keyboard) {
        scene.input.keyboard.once("keydown-SPACE", () => {
          scene.cameras.main.fadeIn(1000, 0, 0, 0);
          scene.scene.start("intro");
        });

        scene.input.keyboard.enabled = true;
      }
    });
  }
};

const getPlayerPosition = (direction: string): string => {
  let position = "";

  switch (direction) {
    case "back":
      position = "front";

      break;
    case "front":
      position = "back";

      break;
    case "left":
      position = "right";

      break;
    case "right":
      position = "left";

      break;
  }

  return position;
};

const updateHP = (
  hearts: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[],
  newHP: number
) => {
  let heartsToFill = Math.floor(newHP / 20);
  let isHalfHeart = newHP % 20 === 10;

  hearts.forEach((heart, index) => {
    heart.removeAllListeners();

    if (index < heartsToFill) {
      heart.anims.play("heart_idle");
    } else if (index === heartsToFill && isHalfHeart) {
      heart.anims.play("broken_heart_idle");
    } else {
      heart.anims.play("empty_heart");
    }
  });
};

export const updateHPBarPosition = (
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  hpBar: Phaser.GameObjects.Graphics,
  currentHP: number,
  maxHP: number = 100
) => {
  const x = sprite.x - 25;
  const y = sprite.y - 40;
  const width = 50;
  const height = 6;
  const percentage = Phaser.Math.Clamp(currentHP / maxHP, 0, 1);

  hpBar.clear();
  hpBar.fillStyle(0x000000);
  hpBar.fillRect(x - 1, y - 1, width + 2, height + 2);

  hpBar.fillStyle(0xff0000);
  hpBar.fillRect(x, y, width * percentage, height);
};

export const updateHPBar = (
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  hpBar: Phaser.GameObjects.Graphics,
  currentHP: number,
  maxHP: number = 100
) => {
  const x = sprite.x - 25;
  const y = sprite.y - 40;
  const width = 50;
  const height = 6;
  const percentage = Phaser.Math.Clamp(currentHP / maxHP, 0, 1);

  hpBar.clear();
  hpBar.fillStyle(0x000000);
  hpBar.fillRect(x - 1, y - 1, width + 2, height + 2);

  hpBar.fillStyle(0xff0000);
  hpBar.fillRect(x, y, width * percentage, height);
};
