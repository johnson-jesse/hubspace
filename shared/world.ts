import type { PublicUser } from "./user";

export type Actors = Map<number, Actor>;
export type ReadOnlyActors = ReadonlyMap<number, Actor>;

export const MessageType = {
  AUTHENTICATE: "authenticate",
  WELCOME: "welcome",
  CONNECT: "connected",
  DISCONNECT: "disconnected",
  MOVING: "moving",
  MOVED: "moved",
  COLOR: "color",
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export interface Actor {
  id: number;
  x: number;
  y: number;
  color: string;
  user: PublicUser;
}

export type AuthenticateMessage = {
  type: typeof MessageType.AUTHENTICATE;
  token: string;
};

export type WelcomeMessage = {
  type: typeof MessageType.WELCOME;
  actorId: number;
  actors: Actor[];
};

export type ActorMovingMessage = {
  type: typeof MessageType.MOVING;
  direction: Direction;
};

export type ActorMovedMessage = {
  type: typeof MessageType.MOVED;
  actorId: number;
  x: number;
  y: number;
};

export type ActorColorMessage = {
  type: typeof MessageType.COLOR;
  actorId: number;
  color: string;
};

export type ActorConnectedMessage = {
  type: typeof MessageType.CONNECT;
  actor: Actor;
};

export type ActorDisconnectedMessage = {
  type: typeof MessageType.DISCONNECT;
  actorId: number;
};

export type Message =
  | AuthenticateMessage
  | WelcomeMessage
  | ActorMovingMessage
  | ActorMovedMessage
  | ActorColorMessage
  | ActorConnectedMessage
  | ActorDisconnectedMessage;

export const Direction = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];

export type Point = {
  x: number;
  y: number;
};

export function directionActorPoint(direction: Direction, actor: Actor): Point {
  switch (direction) {
    case Direction.UP:
      return {
        x: actor.x,
        y: actor.y - 10,
      };

    case Direction.DOWN:
      return {
        x: actor.x,
        y: actor.y + 10,
      };

    case Direction.LEFT:
      return {
        x: actor.x - 10,
        y: actor.y,
      };

    case Direction.RIGHT:
      return {
        x: actor.x + 10,
        y: actor.y,
      };
  }
}
