export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const shouldCollapse = (
  position: number,
  velocity: number,
  closed: number,
) => velocity > 0.6 || (velocity > -0.6 && position > closed / 2);
