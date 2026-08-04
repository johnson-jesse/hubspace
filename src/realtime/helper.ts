import {
  ACTOR_COLORS,
  ACTOR_SIZE,
  SPAWN_PADDING,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "./world.type";

export function randomActorColor(): string {
  return (
    ACTOR_COLORS[Math.floor(Math.random() * ACTOR_COLORS.length)] || "white"
  );
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
