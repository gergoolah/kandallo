"use client";
import { Button, Checkbox, Tab, Tabs } from "@nextui-org/react";
import { useAtom } from "jotai";
import { Fragment, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { DEFAULT_CATEGORIES, databaseAtom } from "../../../../store/database";
import { DBIO } from '../../../../utils/database-io';
import { importDatabase } from "../../../../utils/db-import";
import { ConfirmationModal } from "../../../common/confirmation-modal";
import { JSONImportPreview } from "./json-import-preview";
import { JSONManualInput } from "./json-manual-input";
import { JSONUpload } from "./json-upload";

export function JSONImport({ onImport }: { onImport?: () => void }) {
  const [overwrite, setOverwrite] = useState<boolean>(false);

  const [database, setDatabase] = useAtom(databaseAtom);

  const [json, setJSON] = useState<string | undefined>(undefined);

  const [isOverwriteConfirmationOpen, setIsOverwriteConfirmationOpen] =
    useState<boolean>(false);

  const handleJSONImport = useCallback(() => {
    if (!json || !json.length) {
      toast.error("Nincs mit importálni!");
      return;
    }
    const newDbResult = DBIO.handleImport({ type: "json", data: json });
    if (newDbResult.verdict === "error") {
      toast.error(`Hiba történt az adatbázis importálása közben!`);
      console.error(newDbResult.error);
      return;
    }
    const newDb = newDbResult.data;
    const dbMergeResult = importDatabase(
      database,
      newDb,
      overwrite ? "replace" : "merge"
    );
    setDatabase(dbMergeResult.result);
    const newCategoriesMessage =
      dbMergeResult.statistics.newCategories > 0
        ? `${dbMergeResult.statistics.newCategories} új kategória, `
        : "Nincsenek új kategóriák, ";
    const newQuestionsMessage =
      dbMergeResult.statistics.newQuestions > 0
        ? `${dbMergeResult.statistics.newQuestions} új kérdés.`
        : "nincsenek új kérdések.";
    toast.success(
      `Adatbázis sikeresen ${
        overwrite ? "felülírva" : "importálva"
      }!\n${newCategoriesMessage}${newQuestionsMessage}`
    );
    onImport?.();
  }, [database, onImport, overwrite, setDatabase, json]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <Tabs fullWidth variant="bordered">
          <Tab key="upload" title="Feltöltés">
            <JSONUpload setJSON={setJSON} />
          </Tab>
          <Tab key="manual" title="Kézi bevitel">
            <JSONManualInput json={json} setJSON={setJSON} />
          </Tab>
        </Tabs>
        {json ? (
          <>
            <div>
              <h3 className="text-xl font-bold">Előnézet</h3>
              <h5 className="text-default-400 text-small">
                A beépített kategóriák (
                {DEFAULT_CATEGORIES.map((cat, idx) => (
                  <Fragment
                    key={`json-import-default-category-list-${cat}-${idx}`}
                  >
                    {idx > 0 ? ", " : ""}
                    <span className="font-bold">{`"${cat}"`}</span>
                  </Fragment>
                ))}
                ) nem kerülnek betöltésre, így az előnézetben sem jelennek meg.
              </h5>
            </div>
            <JSONImportPreview json={json} />
            <Checkbox
              size="lg"
              checked={overwrite}
              onChange={() => setOverwrite((prev) => !prev)}
            >
              <span className="!text-xl">Jelenlegi adatbázis felülírása</span>
            </Checkbox>
            <Button
              size="lg"
              color="primary"
              disabled={!json.length}
              variant={!json.length ? "faded" : "solid"}
              onPress={() => {
                if (overwrite) {
                  setIsOverwriteConfirmationOpen(true);
                  return;
                }
                handleJSONImport();
              }}
            >
              Betöltés
            </Button>
          </>
        ) : null}
      </div>
      <ConfirmationModal
        yesText="Igen, felülírom"
        onConfirm={() => handleJSONImport()}
        noText="Nem, felülírás megszakítása"
        isOpen={isOverwriteConfirmationOpen}
        id="json-import-overwrite-confirmation-modal"
        titleText="Biztosan felülírod az adatbázist?"
        onClose={() => setIsOverwriteConfirmationOpen(false)}
        descriptionText="Ezzel az összes kártya és kategória felülírásra kerül. Ez a művelet nem visszavonható. Biztosan folytatni szeretnéd?"
      />
    </>
  );
}
