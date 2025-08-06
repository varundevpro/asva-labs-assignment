export function getGameLevel(xp: number) {
  if (xp >= 1000) {
    return 6;
  } else if (xp >= 750) {
    return 5;
  } else if (xp >= 500) {
    return 4;
  } else if (xp >= 250) {
    return 3;
  } else if (xp >= 100) {
    return 2;
  }

  return 1;
}
