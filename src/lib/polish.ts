// Polish plurals have three forms: 1 film, 2-4 filmy, 5+ filmów.
// Exceptions: 12-14 take the "5+" form (12 filmów), but 22-24 don't (22 filmy).
export function pluralize(
  count: number,
  one: string, // 1 film
  few: string, // 2 filmy
  many: string, // 5 filmów
): string {
  const lastDigit = count % 10;
  const lastTwo = count % 100;
  let word = many;
  if (count === 1) word = one;
  else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14)) {
    word = few;
  }
  return `${count} ${word}`;
}
