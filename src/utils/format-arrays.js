export function createNumberArray(number) {
  return Array.from({ length: number }, (_, index) => index + 1);
}
