export function pickOne<T>(items: readonly T[]): T | undefined {
  const length = items.length;
  if (length === 0) return undefined;

  // Math.random() returns a float in [0, 1)
  // Multiplying by length and flooring gives a valid index.
  const index = Math.floor(Math.random() * length);
  return items[index];
}