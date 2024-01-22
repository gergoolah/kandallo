"use client";
import { Button, Code } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { Fragment, useMemo } from "react";
import toast from "react-hot-toast";
import { databaseAtom } from "../../../store/database";
import { writeToClipboard } from "../../../utils/clipboard";
import { Converters } from "../../../utils/converters";
import { DBIO } from '../../../utils/database-io';
import { saveFile } from "../../../utils/save-file";
import { shareText, shareTextAsFile } from "../../../utils/share";
import { PopoverMenu } from "../../common/popover-menu";

export function JSONExport() {
  const database = useAtomValue(databaseAtom);

  const dbAsJSON = useMemo(() => {
    const result = DBIO.handleExport(database, {
      type: "json",
    });
    if (result.verdict === "success") {
      return result.data;
    }
    return undefined;
  }, [database]);

  const dbAsPrettyJSON = useMemo(() => {
    const result = DBIO.handleExport(database, {
      type: "json",
      pretty: true,
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
        color={!dbAsJSON || !dbAsPrettyJSON ? "danger" : "default"}
      >
        {dbAsJSON && dbAsPrettyJSON
          ? dbAsPrettyJSON.split("\n").map((jsonLine, idx) => (
              <Fragment key={`json-export-preview-line-${idx}`}>
                <pre className="p-0">{jsonLine}</pre>
              </Fragment>
            ))
          : "Hiba történt az exportálás során."}
      </Code>
      {dbAsJSON ? (
        <div className="flex flex-row flex-wrap gap-2">
          <PopoverMenu
            label="Share"
            triggerText="Megosztás"
            items={[
              {
                key: "string",
                label: "Szöveges formában",
                fn: async (close) => {
                  await shareText(dbAsJSON);
                  close();
                },
              },
              {
                key: "file",
                label: "Fájl formában",
                fn: async (close) => {
                  await shareTextAsFile(dbAsJSON, "kandallo_export", "json");
                  close();
                },
              },
            ]}
          />
          <PopoverMenu
            label="Másolás"
            triggerProps={{
              size: "lg",
              variant: "flat",
              color: "warning",
            }}
            triggerText="Másolás"
            items={[
              {
                key: "minimal",
                label: "Minimalizált JSON másolása",
                fn: async (close) => {
                  await writeToClipboard(dbAsJSON);
                  close();
                },
              },
              {
                key: "pretty",
                label: "Formázott JSON másolása",
                fn: async (close) => {
                  if (!dbAsPrettyJSON) {
                    toast.error("A formázott JSON nem érhető el!");
                    return;
                  }
                  await writeToClipboard(dbAsPrettyJSON);
                  close();
                },
              },
            ]}
          />
          <Button
            size="lg"
            variant="flat"
            onPress={() =>
              saveFile({
                type: "single",
                file: Converters["string -> file"](
                  dbAsJSON,
                  "kandallo_export",
                  "json"
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
