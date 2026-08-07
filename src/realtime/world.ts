import { randomColor } from "../../shared/color";
import type { PublicUser } from "../../shared/user";
import type { Actor } from "../../shared/world";
import { randomPosition } from "./helper";

export class World {
  private actors = new Map<number, Actor>();

  addActor(id: number, user: PublicUser) {
    const position = randomPosition();

    const actor: Actor = {
      id,
      x: position.x,
      y: position.y,
      color: user.color || randomColor(),
      user,
    };

    this.actors.set(id, actor);

    return actor;
  }

  updateActor(id: number, x: number, y: number) {
    const actor = this.actors.get(id);

    if (!actor) {
      return;
    }

    actor.x = x;
    actor.y = y;

    return actor;
  }

  updateColor(id: number, color: string) {
    const actor = this.actors.get(id);

    if (!actor) {
      return;
    }

    actor.color = color;

    return actor;
  }

  removeActor(id: number) {
    this.actors.delete(id);
  }

  getActor(id: number) {
    return this.actors.get(id);
  }

  getActors() {
    return Array.from(this.actors.values());
  }

  getActorByUserId(userId: number) {
    return Array.from(this.actors.values()).find(
      (actor) => actor.user.id === userId,
    );
  }
}
