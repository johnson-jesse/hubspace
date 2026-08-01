import {
  ACTOR_SIZE,
  SPAWN_PADDING,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "../types/world.type";

export function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
}

export function randomPosition() {
  return {
    x:
      Math.random() * (WORLD_WIDTH - ACTOR_SIZE - SPAWN_PADDING * 2) +
      SPAWN_PADDING,

    y:
      Math.random() * (WORLD_HEIGHT - ACTOR_SIZE - SPAWN_PADDING * 2) +
      SPAWN_PADDING,
  };
}
