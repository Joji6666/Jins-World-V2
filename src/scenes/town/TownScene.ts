import Phaser from "phaser";
import { townPreload } from "./functions/preload";
import {
  createTownLayers,
  createTownMap,
  createTownTileset
} from "./functions/create";
import { initTownCamera, initTownPlayerCamera } from "./functions/camera";
import type { Player } from "../../shared/types";
import { setTownPlayerInput } from "./functions/inputs";
import { createPlayerAnims } from "../../shared/functions/anims";
import { playerPreload } from "../../shared/functions/preload";
import { createPlayer } from "../../shared/functions/create";

export default class TownScene extends Phaser.Scene {
  
  constructor() {
    super("town-scene");
  }

  preload() {
    townPreload(this);
    playerPreload(this);
  }

  create() {
    const map = createTownMap(this);
    const tileset = createTownTileset(map);

    if (tileset) {
      const { wallsLayer } = createTownLayers(map, tileset);

      if (wallsLayer) {
        wallsLayer.setCollisionByProperty({ colides: true });

        const player = createPlayer(this);

        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        const screenWidth = this.game.config.width;
        const screenHeight = this.game.config.height;

        initTownPlayerCamera(this.cameras.main, player);

        createPlayerAnims(this);

        initTownCamera(
          this.cameras.main,
          { mapWidth, mapHeight },
          {
            screenWidth: Number(screenWidth),
            screenHeight: Number(screenHeight)
          }
        );

        if (this.input.keyboard) {
          setTownPlayerInput(this.input.keyboard, player);
        }
      }

      //   this.physics.add.collider(
      //     player,
      //     jin,
      //     this.handleDialogInteraction,
      //     null,
      //     this
      //   );
    }
  }

  handleDialogInteraction(player: Player) {
    if (!player.isDialogOn && !player.isDialogFinish) {
      player.isDialogOn = true; // 대화 처리 중인지 확인하기 위한 플래그 변수
      player.setVelocityX(0); // 플레이어 움직임 정지
      player.anims.play("turn_right", true);

      // 대화 텍스트 배열
      const dialogTexts = [
        "안녕 보미!",
        "보미야 생일 축하해!!",
        "요즘 참 다사다난 했지",
        "앞으론 좋은일만 있을거야",
        "보미가 갖고있는 고민들!!",
        "전부 폭발시켜버렸어!",
        "이제 걱정하지마",
        "이제 행복한 일만 있을거야!",
        "보미 앞날에 행운만 가득하길 빌어줄게",
        "그러니까 이제 걱정거리를 내려놓고",
        "그저 생일을 즐기면 된다구!",
        "이쁜 보미 생일 너무 축하하고",
        "꼭 행복하자!! 사랑해!!"
      ];

      let currentIndex = 0; // 현재 대화 인덱스

      // 텍스트 스타일 설정
      const style = {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#000000"
      };

      const pressSpaceBarTextStyle = {
        fontFamily: "Arial",
        fontSize: "12px",
        color: "#000000"
      };

      // 대화 텍스트 생성
      const dialogText = this.add.text(
        player.x,
        player.y - 100,
        dialogTexts[currentIndex],
        style
      );
      dialogText.setOrigin(0.5);

      const pressSpaceBarText = this.add.text(
        dialogText.x,
        dialogText.y + 20,
        "스페이스바를 눌러봐",
        pressSpaceBarTextStyle
      );
      dialogText.setOrigin(0.5);

      // spacebar 키 입력 감지
      if (this.input.keyboard) {
        const spacebar = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        // spacebar 이벤트 핸들링
        spacebar.on("down", () => {
          currentIndex++; // 다음 대화로 전환

          if (currentIndex < dialogTexts.length) {
            dialogText.setText(dialogTexts[currentIndex]);
          } else {
            // 대화가 모두 종료된 경우 대화창 삭제 및 대화 처리 완료
            player.isDialogFinish = true;
            dialogText.destroy();
            pressSpaceBarText.destroy();

            dialogText.setOrigin(0.5);
            player.isDialogOn = false;

            if (this.input.keyboard) {
              this.input.keyboard.removeKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
              );
            }
          }
        });
      }
    }
  }
}
