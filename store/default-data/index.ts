import { Database, ICategory } from "../types";
import { KORVONAL, KORVONAL_NAME } from "./korvonal";
import { KORVONAL2, KORVONAL2_NAME } from "./korvonal2";
import { PARBESZED, PARBESZED_NAME } from "./parbeszed";

export const DEFAULT_CATEGORIES = [
  KORVONAL_NAME,
  KORVONAL2_NAME,
  PARBESZED_NAME,
] as const;

export const DEFAULT_CATEGORY_DEFINITIONS: Record<
  (typeof DEFAULT_CATEGORIES)[number],
  ICategory
> = {
  [KORVONAL_NAME]: KORVONAL,
  [KORVONAL2_NAME]: KORVONAL2,
  [PARBESZED_NAME]: PARBESZED,
};

export const DEFAULT_DB: Database = [KORVONAL, KORVONAL2, PARBESZED];
