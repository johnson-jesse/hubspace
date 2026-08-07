import { useCallback, useEffect, useRef, useState } from "react";
import {
  Direction,
  directionActorPoint,
  MessageType,
  type Actor,
  type Message,
} from "../../../shared/world";

export function useWorldSocket() {
  const [myActorId, setMyActorId] = useState<number>(0);
  const [actors, setActors] = useState(() => new Map<number, Actor>());
  const socketRef = useRef<WebSocket | null>(null);

  const move = useCallback((direction: Direction) => {
    setActors((previous) => {
      const next = new Map(previous);
      const actor = next.get(myActorId);

      if (!actor) {
        return previous;
      }

      next.set(myActorId, {
        ...actor,
        ...directionActorPoint(direction, actor)
      });

      return next;
    });
    socketRef.current?.send(
      JSON.stringify({
        type: MessageType.MOVING,
        direction,
      }),
    );
  }, [myActorId]);

  const disconnect = useCallback(() => {
    sessionStorage.removeItem("token");
    socketRef.current?.close();
  }, []);

  useEffect(() => {
    // todo move token to other place
    const token = sessionStorage.getItem("token");
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socketHost = import.meta.env.VITE_WS_URL ?? window.location.host;
    const socket = new WebSocket(`${protocol}://${socketHost}?token=${token}`);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");

      socket.send(
        JSON.stringify({
          type: MessageType.AUTHENTICATE,
          token,
        }),
      );
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    socket.onmessage = (event) => {
      console.count("onmessage");
      const message: Message = JSON.parse(event.data);

      switch (message.type) {
        case MessageType.WELCOME:
          console.log("WELCOME", message);
          setMyActorId(message.actorId);
          setActors(new Map(message.actors.map((actor) => [actor.id, actor])));
          break;

        case MessageType.DISCONNECT:
          console.log("DISCONNECT", message);
          setActors((previous) => {
            const next = new Map(previous);
            next.delete(message.actorId);
            return next;
          });
          break;

        case MessageType.CONNECT:
          console.log("CONNECT", message);
          setActors((previous) => {
            const next = new Map(previous);
            next.set(message.actor.id, message.actor);
            return next;
          });
          break;

        case MessageType.MOVED:
          setActors((previous) => {
            const next = new Map(previous);
            const actor = next.get(message.actorId);
            if (!actor) {
              console.warn(
                "actorMoved: but actor not found. message: ",
                message,
              );
              return previous;
            }
            actor.x = message.x;
            actor.y = message.y;
            next.set(message.actorId, actor);
            return next;
          });
          break;

        case MessageType.COLOR:
          setActors((previous) => {
            const next = new Map(previous);
            const actor = next.get(message.actorId);
            if (!actor) {
              console.warn(
                "actorMoved: but actor not found. message: ",
                message,
              );
              return previous;
            }
            actor.color = message.color;
            next.set(message.actorId, actor);
            return next;
          });
          break;
      }
    };

    return () => socket.close();
  }, []);

  return {
    actors: actors as ReadonlyMap<number, Actor>,
    myActorId,
    move,
    me: actors.get(myActorId),
    disconnect,
  };
}
