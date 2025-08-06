export function formatAmount(amount: number) {
  return new Intl.NumberFormat("en").format(amount || 0);
}

export function randInt(min: number, max: number): number {
  // Normalise the bounds to integers.
  const low = Math.floor(min);
  const high = Math.ceil(max);

  if (low > high) {
    throw new RangeError(`Invalid range: min (${min}) > max (${max})`);
  }

  // Math.random() → [0, 1)
  // Multiply by (high - low + 1) to get range size, then floor to get integer offset.
  const range = high - low + 1;
  return low + Math.floor(Math.random() * range);
}