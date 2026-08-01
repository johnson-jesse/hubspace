import type { Actor } from "../types/actor.type";
import type { User } from "../types/user.type";
import { randomColor, randomPosition } from "./helper";

export class World {
  private actors = new Map<string, Actor>();

  addActor(id: string, user: User) {
    const position = randomPosition();

    const actor: Actor = {
      id,
      x: position.x,
      y: position.y,
      color: randomColor(),
      user,
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
