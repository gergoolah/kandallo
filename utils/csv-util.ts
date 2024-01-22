import { sortFn } from "./array";
import { HUNGARIAN_ALPHABET } from "./string-util";

export const DEFAULT_DELIMITERS = [";", "@", "#", "%", "~"] as const;

const defaultDelimitersToCheck = [...DEFAULT_DELIMITERS] as string[];

/** Tries to find the delimiter of a CSV file.
 * @param csv The CSV file as a string.
 * @returns The delimiter as a string.
 * @example
 * const csv = "a;b;c\n1;2;3\n4;5;6";
 * const delimiter = findDelimiter(csv);
 * console.log(delimiter); // ";"
 */
export function findDelimiter(csv: string): string | undefined {
  const uniqueCharsInLines = csv.split("\n").map((line) => {
    const lineChars = line.split("");
    const uniqueChars = lineChars
      // Trim whitespace from characters
      .map((char) => char.trim())
      // Filter out unlikely characters
      // - empty strings
      // - spaces
      // - question marks (each question probably has a question mark after it)
      // - english letters (lowercase and uppercase) - unlikely to be a delimiter
      // - hungarian letters (lowercase and uppercase) - unlikely to be a delimiter
      .filter(
        (char) =>
          char !== "" &&
          char !== "?" &&
          char.length >= 1 &&
          !HUNGARIAN_ALPHABET.includes(char) &&
          !HUNGARIAN_ALPHABET.toUpperCase().includes(char)
      )
      .reduce((acc, char) => {
        if (!acc.includes(char)) {
          acc.push(char);
        }
        return acc;
      }, [] as string[]);
    return uniqueChars;
  });
  const potentialDelimiters = uniqueCharsInLines
    .map((line) => {
      return line.filter((char) => {
        return uniqueCharsInLines.every((line) => line.includes(char));
      });
    })
    .reduce((acc, line) => {
      const charsToAdd = line.filter((char) => !acc.includes(char));
      return [...acc, ...charsToAdd];
    }, [] as string[])
    .sort(
      // sort potential delimiters based on likelihood
      // - if a delimiter is in the default delimiters, it's more likely to be a delimiter
      // - if a delimiter is not in the default delimiters, it's less likely to be a delimiter
      sortFn((a, b) => {
        if (defaultDelimitersToCheck.includes(a)) {
          if (defaultDelimitersToCheck.includes(b)) {
            return "a=b";
          }
          return "a<b";
        }
        if (defaultDelimitersToCheck.includes(b)) {
          return "a>b";
        }
        return "a=b";
      })
    );
  if (potentialDelimiters.length > 0) {
    // Select the most likely delimiter (the first one)
    return potentialDelimiters[0];
  }
  return undefined;
}
