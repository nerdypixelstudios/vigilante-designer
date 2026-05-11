export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(value) {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
}

export function getLaneStyle(lane) {
  return {
    '--more-work-accent': `var(${lane.accentVar})`,
    '--more-work-soft': `var(${lane.softVar})`,
  };
}
