import crypto from "crypto";
import type { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

import type { TokenService } from "../types/token.type";
import { presenceManager } from "./presence-manager";
import { World } from "./world";
import { userService } from "../container";

export interface ClientSocket extends WebSocket {
  connectionId: string;
  userId?: number;
  email?: string;
}

export function createWebSocketServer(
  server: Server,
  tokenService: TokenService,
) {
  const wss = new WebSocketServer({
    server,
  });

  const world = new World();

  function broadcast(record: Record<string, unknown>) {
    const message = JSON.stringify(record);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  wss.on("connection", (socket) => {
    const client = socket as ClientSocket;
    client.connectionId = crypto.randomUUID();

    let actorId: string | null = null;
    let authenticated = false;

    socket.on("message", (raw) => {
      const message = JSON.parse(raw.toString());

      switch (message.type) {
        case "authenticate":
          {
            if (authenticated) return;

            try {
              const payload = tokenService.verify(message.token);
              const user = userService.getUserById(payload.userId);
              authenticated = true;
              actorId = crypto.randomUUID();
              const actor = world.addActor(actorId, user);

              client.userId = payload.userId;
              client.email = payload.email;

              presenceManager.add(client.connectionId, {
                userId: payload.userId,
                name: user.name,
                email: payload.email,
                connectedAt: new Date(),
              });

              // Send initial state to this client
              socket.send(
                JSON.stringify({
                  type: "welcome",
                  actor,
                  actors: world.getActors(),
                  users: presenceManager.getActiveUsers(),
                }),
              );

              // Notify everyone else
              broadcast({
                type: "presence",
                users: presenceManager.getActiveUsers(),
              });

              broadcast({
                type: "actorSpawned",
                actor,
              });
            } catch {
              socket.close(1008, "Invalid token");
            }
          }
          break;

        case "actorMoved":
          {
            if (!actorId) {
              return;
            }

            const actor = world.updateActor(actorId, message.x, message.y);

            if (actor) {
              broadcast({
                type: "actorMoved",
                actor,
              });
            }
          }
          break;

        case "actorRemoved":
          {
            if (!actorId) {
              return;
            }

            world.removeActor(actorId);

            broadcast({
              type: "actorRemoved",
              id: actorId,
            });
          }
          break;
      }
    });

    socket.on("close", () => {
      if (authenticated) {
        presenceManager.remove(client.connectionId);

        broadcast({
          type: "presence",
          users: presenceManager.getActiveUsers(),
        });
      }

      if (actorId) {
        world.removeActor(actorId);

        broadcast({
          type: "actorRemoved",
          id: actorId,
        });

        console.log(`${client.email} disconnected`);
      }
    });
  });

  return wss;
}
