/**
 * Creates a sorting function based on the provided compare function.
 * @param compareFn - The compare function used to determine the order of elements.
 * @returns A sorting function that can be used with Array.sort().
 */
export function sortFn<T>(compareFn: (a: T, b: T) => "a>b" | "a<b" | "a=b") {
  return (a: T, b: T) => {
    const result = compareFn(a, b);
    if (result === "a>b") return 1;
    if (result === "a<b") return -1;
    return 0;
  };
}

/** Returns a random integer between min (inclusive) and max (inclusive).
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns A random integer between min (inclusive) and max (inclusive).
 */
export function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/** Returns a random element from the provided array.
 * @param array - The array to pick a random element from.
 * @returns A random element from the provided array.
 */
export function randomFromArray<T>(array: T[]) {
  return array[randomInRange(0, array.length - 1)];
}

/** Shuffles the provided array.
 * @param array - The array to shuffle.
 * @param times - The number of times to shuffle the array.
 * @returns A shuffled version of the provided array.
 */
export function shuffle<T>(array: T[], times = 1): T[] {
  if (times === 0) return array;
  const indexMapping = array
    .map((_, i) => i)
    .reduce((acc, curr, _, arr) => {
      let randomIndex = randomFromArray(arr);
      while (acc.includes(randomIndex) || randomIndex === curr) {
        randomIndex = randomFromArray(arr);
      }
      return [...acc, randomIndex];
    }, [] as number[]);
  return shuffle(
    indexMapping.map((i) => array[i]),
    times - 1
  );
}
