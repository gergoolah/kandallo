"use client";
import { Code } from "@nextui-org/react";
import { Fragment, useMemo } from "react";
import { DEFAULT_CATEGORIES } from "../../../../store/database";
import { Converters } from "../../../../utils/converters";

export function TXTImportPreview({ txt }: { txt: string }) {
  const previewDb = useMemo(
    () =>
      Converters["txt -> database"](txt).filter(
        (category) =>
          !([...DEFAULT_CATEGORIES] as string[]).includes(category.name)
      ),
    [txt]
  );

  return (
    <Code>
      <pre>
        {previewDb.length
          ? previewDb.map((category, categoryIdx) => (
              <Fragment key={`txt-import-preview-line-${categoryIdx}`}>
                <span className="text-amber-600">{category.name}</span>
                <br />
                {category.questions.map((question, qidx) => (
                  <Fragment key={`txt-import-preview-line-${qidx}`}>
                    <span className="dark:text-blue-300 text-blue-500">
                      &nbsp;&nbsp;&nbsp;&nbsp;{question}
                    </span>
                    <br />
                  </Fragment>
                ))}
              </Fragment>
            ))
          : "Nincs megjeleníthető adat."}
      </pre>
    </Code>
  );
}
