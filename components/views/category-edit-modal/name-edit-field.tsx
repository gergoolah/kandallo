"use client";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { SaveIcon } from "../../icons/save";
import { ICategory } from "../../../store/types";
import { emptyStringToUndefined } from "../../../utils/string-util";
import toast from "react-hot-toast";

export function NameEditField({
  category,
  onSave,
  onCancel,
}: {
  category: ICategory;
  onSave: (newName: string) => void;
  onCancel: () => void;
}) {
  const [localName, setLocalName] = useState<string | undefined>(
    category.name ?? ""
  );

  const isValid = useMemo(() => localName && localName.length > 0, [localName]);

  useEffect(() => setLocalName(category.name), [category]);

  return (
    <div className="flex flex-row flex-wrap gap-2 items-center w-full pr-9">
      <Input
        autoFocus
        size="sm"
        required
        value={localName ?? ""}
        placeholder="Kategória neve"
        className="w-full md:max-w-[50%]"
        onChange={(e) => {
          setLocalName(emptyStringToUndefined(e.target.value));
        }}
      />
      <div className="flex gap-2">
        <Tooltip content="Mentés" color="primary">
          <Button
            isIconOnly
            color="primary"
            disabled={!isValid}
            onPress={() => {
              if (isValid && localName) {
                onSave(localName);
                return;
              }
              toast.error("Hibás kategória név!");
            }}
            variant={isValid ? "solid" : "faded"}
          >
            <SaveIcon />
          </Button>
        </Tooltip>
        <Tooltip content="Mégse" color="danger">
          <Button
            isIconOnly
            color="danger"
            variant="solid"
            className="font-mono"
            onPress={() => onCancel()}
          >
            X
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
