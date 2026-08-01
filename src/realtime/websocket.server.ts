import crypto from "crypto";
import type { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

import type { TokenService } from "../types/token.type.js";
import { World } from "./world.js";

export function createWebSocketServer(
  server: Server,
  tokenService: TokenService,
) {
  const wss = new WebSocketServer({
    server,
  });

  const world = new World();

  function broadcast(message: unknown) {
    const payload = JSON.stringify(message);

    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    }
  }

  wss.on("connection", (socket) => {
    let actorId: string | null = null;

    socket.on("message", (raw) => {
      const message = JSON.parse(raw.toString());

      switch (message.type) {
        case "authenticate":
          {
            try {
              const payload = tokenService.verify(message.token);

              actorId = crypto.randomUUID();

              const actor = world.addActor(actorId, payload);

              socket.send(
                JSON.stringify({
                  type: "welcome",
                  actor,
                  actors: world.getActors(),
                }),
              );

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
      if (actorId) {
        world.removeActor(actorId);

        broadcast({
          type: "actorRemoved",
          id: actorId,
        });

        broadcast({
          type: "actorRemoved",
          id: actorId,
        });

        console.log("Actor disconnected:", actorId);
      }
    });
  });

  return wss;
}
