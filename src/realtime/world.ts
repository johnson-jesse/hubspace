import type { Actor } from "../types/actor.type.js";
import type { TokenPayload } from "../types/token.type.js";
import { randomColor, randomPosition } from "./helper.js";

export class World {
  private actors = new Map<string, Actor>();

  addActor(id: string, token: TokenPayload) {
    const position = randomPosition();

    const actor: Actor = {
      id,
      x: position.x,
      y: position.y,
      color: randomColor(),
      token,
    };

    this.actors.set(id, actor);

    return actor;
  }

  updateActor(id: string, x: number, y: number) {
    const actor = this.actors.get(id);

    if (!actor) {
      return;
    }

    actor.x = x;
    actor.y = y;

    return actor;
  }

  removeActor(id: string) {
    this.actors.delete(id);
  }

  getActor(id: string) {
    return this.actors.get(id);
  }

  getActors() {
    return Array.from(this.actors.values());
  }
}
