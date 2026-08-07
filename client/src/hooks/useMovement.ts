import { useEffect } from "react";
import { Direction } from "../../../shared/world";

export function useMovement(onMove: (direction: Direction) => void) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          onMove(Direction.UP);
          break;

        case "ArrowDown":
        case "s":
          onMove(Direction.DOWN);
          break;

        case "ArrowLeft":
        case "a":
          onMove(Direction.LEFT);
          break;

        case "ArrowRight":
        case "d":
          onMove(Direction.RIGHT);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onMove]);
}
