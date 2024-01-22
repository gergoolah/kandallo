import { Database, Result, databaseSchema } from "../store/types";

const typeLUT = {
  txt: "text/plain",
  json: "application/json",
  csv: "text/csv",
};
const extLUT = {
  txt: ".txt",
  json: ".json",
  csv: ".csv",
};

export const Converters = {
  "string -> file": (
    text: string,
    fileNameWithoutExtension: string,
    type: "txt" | "json" | "csv" = "txt"
  ): File => {
    const file = new File(
      [text],
      `${fileNameWithoutExtension}${extLUT[type]}`,
      { type: typeLUT[type] }
    );
    return file;
  },

  "json -> database": (json: string): Result<Database> => {
    const parsed = JSON.parse(json);
    const verdict = databaseSchema.safeParse(parsed);
    if (!verdict.success) {
      console.error(verdict);
      return { verdict: "error", error: verdict.error };
    }
    return { verdict: "success", data: verdict.data };
  },

  "database -> json": (database: Database, pretty?: boolean) =>
    pretty ? JSON.stringify(database, null, 2) : JSON.stringify(database),

  "txt -> database": (txt: string) =>
    txt
      .split("\n")
      .map((line) => line.trim())
      .reduce((acc, line) => {
        if (line.startsWith("[CAT]")) {
          return [...acc, { name: line.split("[CAT] ")[1], questions: [] }];
        }
        return acc.map((cat, idx) => {
          if (idx === acc.length - 1) {
            return { ...cat, questions: [...cat.questions, line] };
          }
          return cat;
        });
      }, [] as Database),

  "database -> txt": (database: Database) =>
    database
      .map(
        (category) => `[CAT] ${category.name}\n${category.questions.join("\n")}`
      )
      .join("\n"),

  "database -> csv": (database: Database, delimiter = ";", header?: boolean) =>
    [
      ...(header ? [["Kérdés", "Kategória"].join(delimiter)] : []),
      ...database.reduce((acc, category) => {
        const categoryQuestions = category.questions.map(
          (question) => `${question}${delimiter}${category.name}`
        );
        return [...acc, ...categoryQuestions];
      }, [] as string[]),
    ].join("\n"),

  "csv -> database": (csv: string, delimiter = ";", hasHeader?: boolean) =>
    csv
      .split("\n")
      .filter((_, idx) => (hasHeader ? idx !== 0 : true))
      .map((line) =>
        line
          .trim()
          .split(delimiter)
          .map((x) => x.trim())
      )
      .reduce((acc, [question, category]) => {
        if (
          acc.some((exisitngCategory) => exisitngCategory.name === category)
        ) {
          return acc.map((existingCategory) => {
            if (existingCategory.name === category) {
              return {
                ...existingCategory,
                questions: [...existingCategory.questions, question],
              };
            }
            return existingCategory;
          });
        }
        return [...acc, { name: category, questions: [question] }];
      }, [] as Database),
};
