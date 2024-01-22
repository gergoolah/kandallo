import { useAtom } from "jotai";
import { SetStateAction, useCallback, useMemo } from "react";
import { databaseAtom } from "../../store/database";
import { ICategory } from "../../store/types";

export function useCategoryEdit(categoryToEdit?: string) {
  const [database, setDatabase] = useAtom(databaseAtom);

  const category = useMemo(() => {
    if (!categoryToEdit) return undefined;
    return database.find(({ name }) => name === categoryToEdit);
  }, [categoryToEdit, database]);

  const updateCategory = useCallback(
    (updater: SetStateAction<ICategory>) => {
      setDatabase(
        database.map((category) => {
          if (category.name !== categoryToEdit) return category;
          return typeof updater === "function" ? updater(category) : updater;
        })
      );
    },
    [categoryToEdit, database, setDatabase]
  );

  const deleteCategory = useCallback(() => {
    setDatabase(database.filter(({ name }) => name !== categoryToEdit));
  }, [categoryToEdit, database, setDatabase]);

  const deleteQuestion = useCallback(
    (questionIndex: number) => {
      updateCategory((category) => ({
        ...category,
        questions: category.questions.filter((_, idx) => idx !== questionIndex),
      }));
    },
    [updateCategory]
  );

  const addQuestion = useCallback(
    (question: string, cb?: () => void) => {
      const q = `${question}`;
      updateCategory((category) => ({
        ...category,
        questions: [...category.questions, q],
      }));
      cb?.();
    },
    [updateCategory]
  );

  return {
    category,
    updateCategory,
    deleteCategory,
    deleteQuestion,
    addQuestion,
  };
}
