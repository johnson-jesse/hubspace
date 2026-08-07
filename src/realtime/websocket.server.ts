import crypto from "crypto";
import type { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

import {
  directionActorPoint,
  MessageType,
  type Message,
} from "../../shared/world";
import { userService } from "../container";
import type { TokenService } from "../services/token.type";
import { World } from "./world";

export interface ClientSocket extends WebSocket {
  connectionId?: number;
  actorId?: number;
}

export function createWebSocketServer(
  server: Server,
  tokenService: TokenService,
) {
  const wss = new WebSocketServer({
    server,
  });

  const world = new World();

  function broadcast(
    record: Record<string, unknown>,
    excludeConnectionId?: number,
  ) {
    const message = JSON.stringify(record);

    wss.clients.forEach((client) => {
      const socket = client as ClientSocket;

      if (
        socket.readyState === WebSocket.OPEN &&
        socket.connectionId !== excludeConnectionId
      ) {
        socket.send(message);
      }
    });
  }

  wss.on("connection", (socket) => {
    const client = socket as ClientSocket;
    client.connectionId = crypto.randomInt(1, 100_000);

    let authenticated = false;

    socket.on("message", async (raw) => {
      const message: Message = JSON.parse(raw.toString());

      switch (message.type) {
        case MessageType.AUTHENTICATE:
          {
            if (authenticated) return;

            try {
              const payload = tokenService.verify(message.token);
              const user = await userService.getUserById(payload.userId);
              authenticated = true;

              let actor = world.getActorByUserId(user.id);

              if (actor) client.actorId = actor.id;
              else {
                client.actorId = crypto.randomInt(100_001, 200_000);
                actor = world.addActor(client.actorId, user);

                // Notify everyone else
                broadcast(
                  {
                    type: MessageType.CONNECT,
                    actor,
                  },
                  client.connectionId,
                );
              }

              // Send initial state to this client
              socket.send(
                JSON.stringify({
                  type: MessageType.WELCOME,
                  actorId: client.actorId,
                  actors: world.getActors(),
                }),
              );
            } catch {
              socket.close(1008, "Invalid token");
            }
          }
          break;

        case MessageType.MOVING:
          {
            if (!client.actorId) {
              return;
            }

            let actor = world.getActor(client.actorId);
            if (!actor) return;

            const point = directionActorPoint(message.direction, actor);
            actor = world.updateActor(client.actorId, point.x, point.y);

            broadcast(
              {
                type: MessageType.MOVED,
                actorId: client.actorId,
                x: actor?.x,
                y: actor?.y,
              },
              client.connectionId,
            );
          }
          break;

        case MessageType.COLOR:
          {
            if (!client.actorId) {
              return;
            }

            const actor = world.updateColor(client.actorId, message.color);

            if (actor) {
              broadcast({
                type: MessageType.COLOR,
                actor,
              });
            }
          }
          break;
      }
    });

    socket.on("close", () => {
      const client = socket as ClientSocket;

      if (client.actorId !== undefined) {
        world.removeActor(client.actorId);

        broadcast(
          {
            type: MessageType.DISCONNECT,
            actorId: client.actorId,
          },
          client.connectionId,
        );

        client.connectionId = undefined;
      }
    });
  });

  return wss;
}
