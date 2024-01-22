"use client";
import { Button, Code } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { Fragment, useMemo } from "react";
import { databaseAtom } from "../../../store/database";
import { writeToClipboard } from "../../../utils/clipboard";
import { Converters } from "../../../utils/converters";
import { DBIO } from '../../../utils/database-io';
import { saveFile } from "../../../utils/save-file";
import { shareText, shareTextAsFile } from "../../../utils/share";
import { PopoverMenu } from "../../common/popover-menu";

export function TXTExport() {
  const database = useAtomValue(databaseAtom);

  const dbTXT = useMemo(() => {
    const result = DBIO.handleExport(database, {
      type: "txt",
    });
    if (result.verdict === "success") {
      return result.data;
    }
    return undefined;
  }, [database]);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl">Előnézet</h3>
      <hr />
      <Code
        className="overflow-auto max-h-[50vh]"
        color={!dbTXT ? "danger" : "default"}
      >
        {dbTXT
          ? dbTXT.split("\n").map((txtPreviewLine, idx) => (
              <Fragment key={`txt-export-preview-line-${idx}`}>
                <pre className="p-0">{txtPreviewLine}</pre>
              </Fragment>
            ))
          : "Hiba történt az exportálás során."}
      </Code>
      {dbTXT ? (
        <div className="flex flex-row flex-wrap gap-2">
          <PopoverMenu
            label="Share"
            triggerText="Megosztás"
            items={[
              {
                key: "string",
                label: "Szöveges formában",
                fn: async (close) => {
                  await shareText(dbTXT);
                  close();
                },
              },
              {
                key: "file",
                label: "Fájl formában",
                fn: async (close) => {
                  await shareTextAsFile(dbTXT, "kandallo_export", "txt");
                  close();
                },
              },
            ]}
          />
          <Button
            size="lg"
            color="warning"
            variant="flat"
            onPress={() => writeToClipboard(dbTXT)}
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
                  dbTXT,
                  "kandallo_export",
                  "txt"
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
