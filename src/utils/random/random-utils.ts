// returns a random number between min and max but the number is
// a whole number integer.
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// returns a random color in the format of #ff0000
export function getRandomColor(): string {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}
