"use client";
import { Button, Card, Input, Tooltip } from "@nextui-org/react";
import { SaveIcon } from "../../../icons/save";
import { ICategory } from "../../../../store/types";

interface INewQuestionCardProps {
  readOnly?: boolean;
  category?: ICategory;
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  addQuestion: (question: string, cb?: () => void) => void;
}

export function NewQuestionCard({
  value,
  setValue,
  readOnly,
  category,
  addQuestion,
}: INewQuestionCardProps) {
  if (readOnly) {
    return null;
  }

  if (value === undefined) {
    return (
      <Button
        size="lg"
        color="success"
        disabled={readOnly}
        variant="faded"
        onPress={() => setValue("")}
      >
        + Új kérdés hozzáadása
      </Button>
    );
  }

  return (
    <Card
      shadow="none"
      key={`${category?.name}-new-question`}
      className="w-full p-3 flex flex-row justify-between items-center gap-2"
    >
      <Input
        size="sm"
        value={value ?? ""}
        placeholder="Új kérdés"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex flex-row items-center gap-1">
        <Tooltip content="Mentés" color="primary">
          <Button
            isIconOnly
            color="primary"
            disabled={!value || !value.length}
            variant={value && value.length ? "solid" : "faded"}
            onPress={() => addQuestion(value, () => setValue(undefined))}
          >
            <SaveIcon />
          </Button>
        </Tooltip>
        <Tooltip content="Mégse" color="danger">
          <Button
            isIconOnly
            color="danger"
            variant="flat"
            className="!font-mono"
            onPress={() => setValue(undefined)}
          >
            X
          </Button>
        </Tooltip>
      </div>
    </Card>
  );
}
