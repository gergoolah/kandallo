"use client";
import { Button, Card, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { ICategory } from "../../../../store/types";
import { DeleteIcon } from "../../../icons/delete";
import { NewQuestionCard } from "./new-question-card";

interface IVisualCategoryEditorProps {
  readOnly?: boolean;
  category: ICategory | undefined;
  deleteQuestion: (questionIndex: number) => void;
  addQuestion: (question: string, cb?: () => void) => void;
}

export function VisualCategoryEditor({
  readOnly,
  category,
  addQuestion,
  deleteQuestion,
}: IVisualCategoryEditorProps) {
  const [newQuestion, setNewQuestion] = useState<string | undefined>(undefined);
  return (
    <div className="flex flex-col gap-3">
      <NewQuestionCard
        readOnly={readOnly}
        category={category}
        value={newQuestion}
        setValue={setNewQuestion}
        addQuestion={addQuestion}
      />
      {category?.questions.map((question, qidx) => (
        <Card
          shadow="none"
          key={`${category.name}-${qidx}`}
          className="w-full p-3 flex flex-row justify-between items-center gap-1"
        >
          <h4>{question}</h4>
          {!readOnly ? (
            <Tooltip content="Törlés">
              <Button
                isIconOnly
                color="danger"
                onPress={() => deleteQuestion(qidx)}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
