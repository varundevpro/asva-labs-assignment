export function hexString(length: number): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError('length must be a non‑negative integer');
  }

  const hexChars = '0123456789abcdef';
  let result = '';

  // Generate 4 random bits (0‑15) per character.
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * 16); // 0‑15
    result += hexChars[rand];
  }

  return result;
}