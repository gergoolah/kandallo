"use client";
import { Button, Checkbox, Code } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { Fragment, useMemo, useState } from "react";
import { databaseAtom } from "../../../store/database";
import { writeToClipboard } from "../../../utils/clipboard";
import { Converters } from "../../../utils/converters";
import { DBIO } from '../../../utils/database-io';
import { DEFAULT_DELIMITERS } from "../../../utils/csv-util";
import { saveFile } from "../../../utils/save-file";
import { shareText, shareTextAsFile } from "../../../utils/share";
import { PopoverMenu } from "../../common/popover-menu";

export function CSVExport() {
  const database = useAtomValue(databaseAtom);
  const [delimiter, setDelimiter] = useState<string>(";");

  const [hasHeader, setHasHeader] = useState<boolean>(false);

  const dbAsCSV = useMemo(() => {
    const result = DBIO.handleExport(database, {
      type: "csv",
      delimiter,
      header: hasHeader,
    });
    if (result.verdict === "success") {
      return result.data;
    }
    return undefined;
  }, [database, delimiter, hasHeader]);

  return (
    <div className="flex flex-col gap-5">
      <Checkbox
        size="lg"
        checked={hasHeader}
        onChange={() => setHasHeader((prev) => !prev)}
      >
        <span className="!text-xl">Fejléc</span>
      </Checkbox>
      <div className="flex flex-wrap gap-5 items-center">
        <h3 className="text-lg">CSV elválasztó karakter:</h3>
        <div className="flex flex-row flex-wrap gap-2 items-center">
          {DEFAULT_DELIMITERS.map((delimiterChar) => (
            <Button
              variant="solid"
              key={`delimiter-${delimiterChar}`}
              onPress={() => setDelimiter(delimiterChar)}
              color={delimiter === delimiterChar ? "primary" : "default"}
            >
              {delimiterChar}
            </Button>
          ))}
        </div>
      </div>
      <h3 className="text-2xl">Előnézet</h3>
      <hr />
      <Code
        color={!dbAsCSV ? "danger" : "default"}
        className="overflow-auto max-h-[50vh]"
      >
        {dbAsCSV
          ? dbAsCSV.split("\n").map((csvLine, idx) => (
              <Fragment key={`csv-export-preview-line-${idx}`}>
                <span>{csvLine}</span>
                <br />
              </Fragment>
            ))
          : "Hiba történt az exportálás során."}
      </Code>
      {dbAsCSV ? (
        <div className="flex flex-row flex-wrap gap-2">
          <PopoverMenu
            label="Share"
            triggerText="Megosztás"
            items={[
              {
                key: "string",
                label: "Szöveges formában",
                fn: async (close) => {
                  await shareText(dbAsCSV);
                  close();
                },
              },
              {
                key: "file",
                label: "Fájl formában",
                fn: async (close) => {
                  await shareTextAsFile(dbAsCSV, "kandallo_export", "csv");
                  close();
                },
              },
            ]}
          />
          <Button
            size="lg"
            color="warning"
            variant="flat"
            onPress={() => writeToClipboard(dbAsCSV)}
          >
            Másolás
          </Button>
          <Button
            size="lg"
            variant="flat"
            onPress={() =>
              saveFile({
                type: "single",
                file: Converters["string -> file"](
                  dbAsCSV,
                  "kandallo_export",
                  "csv"
                ),
              })
            }
          >
            Letöltés
          </Button>
        </div>
      ) : null}
    </div>
  );
}
