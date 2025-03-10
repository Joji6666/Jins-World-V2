export const PLAYER_KEYS = {
  PLAYER: "player",
  PLAYER_SIDE: "playerSide",
  PLAYER_WEAPON_STATUS: "playerWeaponStatus",
  PLAYER_MOVE_STATE: "playerMoveState",
  IS_RUN_ON: "isRunOn",
  IS_WEAPON_DRAW: "isWeaponDraw"
} as const;

export const PLAYER_SIDE_KEYS = {
  BACK: "back",
  FRONT: "front",
  RIGHT: "right",
  LEFT: "left"
} as const;

export const PLAYER_MOVE_STATE_KEYS = {
  BACK_RUN: "back_run",
  BACK_WALK: "back_walk",

  FRONT_RUN: "front_run",
  FRONT_WALK: "front_walk",

  RIGHT_RUN: "right_run",
  RIGHT_WALK: "right_walk",

  LEFT_RUN: "left_run",
  LEFT_WALK: "left_walk",

  BACK_IDLE: "back_idle",
  FRONT_IDLE: "front_idle",
  RIGHT_IDLE: "right_idle",
  LEFT_IDLE: "left_idle"
} as const;

export const PLAYER_ANIMATION_KEYS = {
  CHAR_BACK_RUN: "char_run_back",
  CHAR_BACK_WALK: "char_walk_back",
  CHAR_FRONT_RUN: "char_run_front",
  CHAR_FRONT_WALK: "char_walk_front",
  CHAR_RIGHT_RUN: "char_run_right",
  CHAR_RIGHT_WALK: "char_walk_right",
  CHAR_LEFT_RUN: "char_run_left",
  CHAR_LEFT_WALK: "char_walk_left",
  CHAR_BACK: "char_back",
  CHAR_FRONT: "char_front",
  CHAR_RIGHT: "char_right",
  CHAR_LEFT: "char_left"
} as const;

export const SIDES = ["front", "back", "right", "left"];
