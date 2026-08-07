import { useEffect, useRef } from "react";
import type { ReadOnlyActors } from "../../../shared/world";

export function World(props: { actors: ReadOnlyActors }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { actors } = props;

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!actors) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Clear old frame
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw world background FIRST
    ctx.fillStyle = "#4b5563";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (const actor of actors.values()) {
      ctx.fillStyle = actor.color;
      ctx.fillRect(actor.x, actor.y, 30, 30);

      ctx.strokeStyle = "rgba(255,255,255,0.75)";
      ctx.lineWidth = 1;
      ctx.strokeRect(actor.x, actor.y, 30, 30);

      ctx.fillStyle = "#ffffff";
      ctx.font = "12px sans-serif";

      // Actor label
      ctx.fillText(actor.user.name, actor.x, actor.y - 5);
    }
  }, [actors]);

  return <canvas ref={canvasRef} width="600" height="400"></canvas>;
}
