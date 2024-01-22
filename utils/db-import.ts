import {
  DEFAULT_CATEGORIES,
  DEFAULT_CATEGORY_DEFINITIONS,
} from "../store/database";
import { Database, ICategory } from "../store/types";

export function importDatabase(
  currentDb: Database,
  newDb: Database,
  strategy: "merge" | "replace"
): {
  result: Database;
  statistics: { newCategories: number; newQuestions: number };
} {
  const defaultCategoriesToCheck = [...DEFAULT_CATEGORIES] as string[];

  function isDefaultCategory(category: ICategory) {
    return defaultCategoriesToCheck.includes(category.name);
  }

  function filterDefaultCategories(db: Database) {
    return db.filter((category) => !isDefaultCategory(category));
  }

  // Initialize result database with default categories
  let resultDb: Database = DEFAULT_CATEGORIES.map(
    (category) => DEFAULT_CATEGORY_DEFINITIONS[category]
  );

  if (strategy === "replace") {
    const filteredNewDb = filterDefaultCategories(newDb);
    filteredNewDb.forEach((category) => {
      resultDb = [...resultDb, category];
    });
    return {
      result: resultDb,
      statistics: {
        newCategories: filteredNewDb.length,
        newQuestions: filteredNewDb
          .map((cat) => cat.questions.length)
          .reduce((sum, curr) => sum + curr, 0),
      },
    };
  }

  // Add current DB to result DB
  filterDefaultCategories(currentDb).forEach((category) => {
    resultDb = [...resultDb, category];
  });
  const filteredNewDB = filterDefaultCategories(newDb);
  let newCategoriesStat: number = 0;
  let newQuestionsStat: number = 0;

  filteredNewDB.forEach((newCategory) => {
    // If category exists, merge questions
    if (resultDb.find((c) => c.name === newCategory.name)) {
      resultDb = resultDb.map((resultCategory) => {
        if (resultCategory.name === newCategory.name) {
          // Filter out questions that already exist in the category
          const newQuestions = newCategory.questions.filter(
            (q) => !resultCategory.questions.includes(q)
          );
          newQuestionsStat = newQuestionsStat + newQuestions.length;
          return {
            ...resultCategory,
            questions: [...resultCategory.questions, ...newQuestions],
          };
        }
        return resultCategory;
      });
      return;
    }
    // If category does not exist, add it
    resultDb = [...resultDb, newCategory];
    newQuestionsStat = newQuestionsStat + newCategory.questions.length;
    newCategoriesStat++;
  });

  return {
    result: resultDb,
    statistics: {
      newCategories: newCategoriesStat,
      newQuestions: newQuestionsStat,
    },
  };
}
