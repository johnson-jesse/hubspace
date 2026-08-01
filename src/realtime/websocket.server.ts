import crypto from "crypto";
import type { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

import type { TokenService } from "../types/token.type";
import { World } from "./world";

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

  wss.on("connection", (socket, request) => {
    const url = new URL(request.url!, "http://localhost");

    const token = url.searchParams.get("token");

    if (!token) {
      socket.close(1008, "Missing token");
      return;
    }

    let payload;

    try {
      payload = tokenService.verify(token);
    } catch {
      socket.close(1008, "Invalid token");
      return;
    }

    console.log("Authenticated:", payload.email);
    const actorId = crypto.randomUUID();
    const actor = world.addActor(actorId, payload);
    console.log("Actor connected:", actorId);

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

    socket.on("message", (raw) => {
      const message = JSON.parse(raw.toString());

      switch (message.type) {
        case "actorMoved":
          {
            const actor = world.updateActor(actorId, message.x, message.y);

            if (actor) {
              broadcast({
                type: "actorMoved",
                actor,
              });
            }
          }
          break;
      }
    });

    socket.on("close", () => {
      world.removeActor(actorId);

      broadcast({
        type: "actorRemoved",
        id: actorId,
      });

      console.log("Actor disconnected:", actorId);
    });
  });

  return wss;
}
