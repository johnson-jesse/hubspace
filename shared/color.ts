export const COLORS = [
  "#38bdf8", // Sky blue
  "#34d399", // Emerald green
  "#fbbf24", // Amber
  "#f472b6", // Pink
  "#a78bfa", // Violet
  "#fb923c", // Orange
  "#22d3ee", // Cyan
  "#f87171", // Red
];

export function randomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)] || "white";
}
