// returns a random number between min and max but the number is
// a whole number integer.
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// returns a random color in the format of #ff0000
export function getRandomColor(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
