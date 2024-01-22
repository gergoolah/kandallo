"use client";
import { SetStateAction, useMemo } from "react";
import { ICategory } from "../../../store/types";
import { BulkEditor } from "../../common/bulk-editor";

interface IBulkCategoryEditorProps {
  readOnly?: boolean;
  category: ICategory | undefined;
  updateCategory: (updater: SetStateAction<ICategory>) => void;
}

export function BulkCategoryEditor({
  readOnly,
  category,
  updateCategory,
}: IBulkCategoryEditorProps) {
  const categoryQuestions = useMemo(
    () => category?.questions.join("\n") ?? "",
    [category]
  );

  return (
    <BulkEditor
      readOnly={readOnly}
      value={categoryQuestions}
      setValue={(value) =>
        updateCategory((prev) => ({ ...prev, questions: value.split("\n") }))
      }
    />
  );
}
