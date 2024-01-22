"use client";
import { Code } from "@nextui-org/react";
import classNames from "classnames";
import { Fragment, useMemo } from "react";
import { DEFAULT_CATEGORIES } from "../../../../store/database";

interface ICSVImportPreviewProps {
  csv: string;
  delimiter: string;
  hasHeader: boolean;
}

export function CSVImportPreview({
  csv,
  delimiter,
  hasHeader,
}: ICSVImportPreviewProps) {
  const filteredCSVLines = useMemo(
    () =>
      csv.split("\n").filter((line) => {
        if (
          DEFAULT_CATEGORIES.some((defaultCategory) =>
            line.endsWith(defaultCategory)
          )
        ) {
          return false;
        }
        return true;
      }),
    [csv]
  );
  return (
    <Code>
      <pre>
        {filteredCSVLines.length
          ? filteredCSVLines.map((line, lineIdx) => (
              <Fragment key={`csv-import-preview-line-${lineIdx}`}>
                {(delimiter.length ? line.split(delimiter) : [line]).map(
                  (cell, cellIdx) => {
                    if (lineIdx === 0 && hasHeader) {
                      return (
                        <span
                          key={`csv-import-preview-cell-${lineIdx}-${cellIdx}`}
                          className="font-bold"
                        >
                          {cell}
                          {cellIdx === 0 &&
                          delimiter.length &&
                          line.includes(delimiter) ? (
                            <span className="text-red-500 font-bold">
                              {delimiter}
                            </span>
                          ) : null}
                        </span>
                      );
                    }
                    return (
                      <span
                        key={`csv-import-preview-cell-${lineIdx}-${cellIdx}`}
                        className={classNames(
                          cellIdx === 0
                            ? "dark:text-blue-300 text-blue-500"
                            : "text-amber-600"
                        )}
                      >
                        {cell}
                        {cellIdx === 0 &&
                        delimiter.length &&
                        line.includes(delimiter) ? (
                          <span className="text-red-500 font-bold">
                            {delimiter}
                          </span>
                        ) : null}
                      </span>
                    );
                  }
                )}
                <br />
              </Fragment>
            ))
          : "Nincs megjeleníthető adat."}
      </pre>
    </Code>
  );
}
