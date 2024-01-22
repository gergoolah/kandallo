"use client";
import { Button, Textarea } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

interface IBulkEditorProps {
  value: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoSave?: boolean;
  setValue: (value: string) => void;
}

export function BulkEditor({
  value,
  setValue,
  disabled,
  readOnly,
  autoSave,
}: IBulkEditorProps) {
  const [localValue, setLocalValue] = useState<string>(value);

  useEffect(() => setLocalValue(value), [value]);

  const lineNumbering = useMemo(() => {
    const lineNumbers = localValue.split("\n").map((_, idx) => `${idx + 1}`);
    const longestLineLength = Math.max(
      ...lineNumbers.map((line) => line.length)
    );
    const paddedLineNumbers = lineNumbers.map((line) =>
      line.padStart(longestLineLength, " ")
    );
    return paddedLineNumbers.join("\n");
  }, [localValue]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col pt-[9px]">
          {lineNumbering.split("\n").map((line) => (
            <span
              key={`lineNo-${line}`}
              className="dark:text-white text-black font-mono text-sm opacity-70"
            >
              {line}
            </span>
          ))}
        </div>
        <Textarea
          fullWidth
          size="md"
          wrap="off"
          width="100%"
          minRows={20}
          color="default"
          variant="faded"
          value={localValue}
          readOnly={readOnly}
          aria-label="Kandallo BulkEditor"
          className="font-mono leading-tight"
          rows={Math.max(20, localValue.split("\n").length)}
          onValueChange={(newValue) => {
            setLocalValue(newValue);
            if (autoSave) {
              setValue(newValue);
            }
          }}
          maxRows={Math.max(20, localValue.split("\n").length + 1)}
          cols={Math.max(
            20,
            Math.max(...localValue.split("\n").map((line) => line.length))
          )}
        />
      </div>
      {!readOnly && !autoSave ? (
        <Button
          color="primary"
          className="text-xl"
          onClick={() => setValue(localValue)}
          disabled={!localValue.length || disabled || readOnly}
          variant={
            !localValue.length || disabled || readOnly ? "flat" : "solid"
          }
        >
          Mentés
        </Button>
      ) : null}
    </div>
  );
}
