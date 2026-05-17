import type Phaser from "phaser";

type VirtualKey = {
  code: string;
  key: string;
  keyCode: number;
  phaserName: string;
};

const VIRTUAL_KEYS = {
  up: { code: "ArrowUp", key: "ArrowUp", keyCode: 38, phaserName: "UP" },
  down: {
    code: "ArrowDown",
    key: "ArrowDown",
    keyCode: 40,
    phaserName: "DOWN"
  },
  left: {
    code: "ArrowLeft",
    key: "ArrowLeft",
    keyCode: 37,
    phaserName: "LEFT"
  },
  right: {
    code: "ArrowRight",
    key: "ArrowRight",
    keyCode: 39,
    phaserName: "RIGHT"
  },
  space: { code: "Space", key: " ", keyCode: 32, phaserName: "SPACE" },
  enter: { code: "Enter", key: "Enter", keyCode: 13, phaserName: "ENTER" },
  escape: {
    code: "Escape",
    key: "Escape",
    keyCode: 27,
    phaserName: "ESC"
  },
  weapon: { code: "KeyP", key: "p", keyCode: 80, phaserName: "P" },
  backstep: { code: "KeyC", key: "c", keyCode: 67, phaserName: "C" }
} satisfies Record<string, VirtualKey>;

const isCoarsePointer = (): boolean =>
  window.matchMedia?.("(pointer: coarse)").matches ?? false;

export const isMobileGameboyMode = (): boolean => {
  if (typeof window === "undefined") return false;

  return (
    isCoarsePointer() ||
    window.matchMedia?.("(max-width: 860px)").matches ||
    /android|iphone|ipad|ipod/i.test(navigator.userAgent)
  );
};

export const getMobileViewportHeight = (): number =>
  window.visualViewport?.height ?? window.innerHeight;

export const getMobileControllerHeight = (): number => {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--mobile-controller-height");
  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) ? parsed : 220;
};

export const getMobileGameAreaHeight = (): number =>
  Math.max(0, getMobileViewportHeight() - getMobileControllerHeight());

const createKeyboardEvent = (
  type: "keydown" | "keyup",
  virtualKey: VirtualKey
): KeyboardEvent => {
  const event = new KeyboardEvent(type, {
    bubbles: true,
    cancelable: true,
    code: virtualKey.code,
    key: virtualKey.key
  });

  Object.defineProperties(event, {
    keyCode: { get: () => virtualKey.keyCode },
    which: { get: () => virtualKey.keyCode }
  });

  return event;
};

const emitToActiveScenes = (
  game: Phaser.Game,
  type: "keydown" | "keyup",
  virtualKey: VirtualKey
): void => {
  const scenes = game.scene.getScenes(true);
  const event = createKeyboardEvent(type, virtualKey);

  scenes.forEach((scene) => {
    const keyboard = scene.input.keyboard;

    if (!keyboard || !keyboard.enabled) return;

    keyboard.emit(type, event);
    keyboard.emit(`${type}-${virtualKey.phaserName}`, event);
  });
};

const createButton = (
  className: string,
  label: string,
  description: string,
  virtualKey: VirtualKey,
  game: Phaser.Game,
  activeKeys: Set<string>
): HTMLButtonElement => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.setAttribute("aria-label", description);
  button.dataset.key = virtualKey.code;
  button.innerHTML = `<span>${label}</span>`;

  const press = (event: PointerEvent) => {
    event.preventDefault();
    button.setPointerCapture?.(event.pointerId);

    if (activeKeys.has(virtualKey.code)) return;

    activeKeys.add(virtualKey.code);
    button.classList.add("is-pressed");
    emitToActiveScenes(game, "keydown", virtualKey);
  };

  const release = (event: PointerEvent) => {
    event.preventDefault();

    if (!activeKeys.has(virtualKey.code)) return;

    activeKeys.delete(virtualKey.code);
    button.classList.remove("is-pressed");
    emitToActiveScenes(game, "keyup", virtualKey);
  };

  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("pointerleave", release);

  return button;
};

const releaseAllKeys = (game: Phaser.Game, activeKeys: Set<string>): void => {
  Object.values(VIRTUAL_KEYS).forEach((virtualKey) => {
    if (!activeKeys.has(virtualKey.code)) return;

    activeKeys.delete(virtualKey.code);
    emitToActiveScenes(game, "keyup", virtualKey);
  });
};

export const mountMobileGameboyController = (game: Phaser.Game): void => {
  if (!isMobileGameboyMode()) return;
  if (document.getElementById("mobile-gameboy-controller")) return;

  document.documentElement.classList.add("mobile-gameboy-mode");

  const syncViewportHeight = () => {
    document.documentElement.style.setProperty(
      "--mobile-viewport-height",
      `${getMobileViewportHeight()}px`
    );
  };

  syncViewportHeight();

  const activeKeys = new Set<string>();
  const controller = document.createElement("section");
  controller.id = "mobile-gameboy-controller";
  controller.className = "mobile-gameboy-controller";
  controller.setAttribute("aria-label", "모바일 게임보이 컨트롤러");

  const header = document.createElement("div");
  header.className = "mobile-gameboy-header";
  header.innerHTML =
    "<span>A 상호작용/공격 · B 백스텝 · △ 결정 · □ 닫기 · 검 무기</span>";

  const controls = document.createElement("div");
  controls.className = "mobile-gameboy-controls";

  const dpad = document.createElement("div");
  dpad.className = "mobile-dpad";
  dpad.setAttribute("aria-label", "이동 및 선택 방향키");
  dpad.append(
    createButton(
      "mobile-key dpad-key dpad-up",
      "↑",
      "위로 이동 또는 이전 항목 선택",
      VIRTUAL_KEYS.up,
      game,
      activeKeys
    ),
    createButton(
      "mobile-key dpad-key dpad-left",
      "←",
      "왼쪽으로 이동 또는 이전 값 선택",
      VIRTUAL_KEYS.left,
      game,
      activeKeys
    ),
    createButton(
      "mobile-key dpad-key dpad-center",
      "",
      "방향키 중앙",
      VIRTUAL_KEYS.enter,
      game,
      activeKeys
    ),
    createButton(
      "mobile-key dpad-key dpad-right",
      "→",
      "오른쪽으로 이동 또는 다음 값 선택",
      VIRTUAL_KEYS.right,
      game,
      activeKeys
    ),
    createButton(
      "mobile-key dpad-key dpad-down",
      "↓",
      "아래로 이동 또는 다음 항목 선택",
      VIRTUAL_KEYS.down,
      game,
      activeKeys
    )
  );

  const actionPad = document.createElement("div");
  actionPad.className = "mobile-action-pad";
  actionPad.append(
    createButton(
      "mobile-key action-key action-escape",
      "□",
      "모달 닫기",
      VIRTUAL_KEYS.escape,
      game,
      activeKeys
    ),
    createButton(
      "mobile-key action-key action-enter",
      "△",
      "선택 결정",
      VIRTUAL_KEYS.enter,
      game,
      activeKeys
    ),
    createButton(
      "mobile-key action-key action-space",
      "A",
      "상호작용, 진행, 공격",
      VIRTUAL_KEYS.space,
      game,
      activeKeys
    ),
    createButton(
      "mobile-key action-key action-backstep",
      "B",
      "백스텝",
      VIRTUAL_KEYS.backstep,
      game,
      activeKeys
    ),
    createButton(
      "mobile-key weapon-key",
      "검",
      "무기 꺼내기 또는 넣기",
      VIRTUAL_KEYS.weapon,
      game,
      activeKeys
    )
  );

  controls.append(dpad, actionPad);
  controller.append(header, controls);
  document.body.appendChild(controller);

  window.visualViewport?.addEventListener("resize", syncViewportHeight);
  window.addEventListener("resize", syncViewportHeight);
  window.addEventListener("blur", () => releaseAllKeys(game, activeKeys));
  window.addEventListener("contextmenu", (event) => {
    if (controller.contains(event.target as Node)) {
      event.preventDefault();
    }
  });
};
