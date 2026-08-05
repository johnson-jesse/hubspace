import type { PublicUser } from "../repositories/model";
import type { Actor } from "./actor.type";
import { randomActorColor, randomPosition } from "./helper";

export class World {
  private actors = new Map<string, Actor>();

  addActor(id: string, user: PublicUser) {
    const position = randomPosition();

    const actor: Actor = {
      id,
      x: position.x,
      y: position.y,
      color: user.color || randomActorColor(),
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

  updateColor(id: string, color: string) {
    const actor = this.actors.get(id);

    if (!actor) {
      return;
    }

    actor.color = color;

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
