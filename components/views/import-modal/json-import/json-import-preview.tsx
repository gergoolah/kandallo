"use client";
import { Code } from "@nextui-org/react";
import { Fragment, useMemo } from "react";
import { DEFAULT_CATEGORIES } from "../../../../store/database";
import { Converters } from "../../../../utils/converters";

export function JSONImportPreview({ json }: { json: string }) {
  const conversionResult = useMemo(
    () => Converters["json -> database"](json),
    [json]
  );
  const error = useMemo(
    () =>
      conversionResult.verdict === "error"
        ? conversionResult.error.message
        : undefined,
    [conversionResult]
  );
  const previewDb = useMemo(
    () =>
      conversionResult.verdict === "success"
        ? conversionResult.data.filter(
            (category) =>
              !([...DEFAULT_CATEGORIES] as string[]).includes(category.name)
          )
        : undefined,
    [conversionResult]
  );

  return (
    <Code color={error ? "danger" : "default"}>
      <pre>
        {previewDb ? (
          <>
            {previewDb.length
              ? previewDb.map((category, categoryIdx) => (
                  <Fragment key={`json-import-preview-line-${categoryIdx}`}>
                    <span className="text-amber-600">{category.name}</span>
                    <br />
                    {category.questions.map((question, qidx) => (
                      <Fragment key={`json-import-preview-line-${qidx}`}>
                        <span className="dark:text-blue-300 text-blue-500">
                          &nbsp;&nbsp;&nbsp;&nbsp;{question}
                        </span>
                        <br />
                      </Fragment>
                    ))}
                  </Fragment>
                ))
              : "Nincs megjeleníthető adat."}
          </>
        ) : (
          <>{error ? <span>{error}</span> : null}</>
        )}
      </pre>
    </Code>
  );
}
