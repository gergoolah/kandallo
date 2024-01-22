import { atomWithLocalforage } from "../utils/atom-with-localforage";
import { DEFAULT_DB } from "./default-data";
import { Database } from "./types";

export {
  DEFAULT_CATEGORIES,
  DEFAULT_CATEGORY_DEFINITIONS,
} from "./default-data";

export const databaseAtom = atomWithLocalforage(
  "Kandallo:Database",
  DEFAULT_DB as Database
);
