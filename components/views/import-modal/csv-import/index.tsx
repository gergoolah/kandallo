"use client";
import { Button, Checkbox, Input, Tab, Tabs } from "@nextui-org/react";
import { useAtom } from "jotai";
import { Fragment, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DEFAULT_CATEGORIES, databaseAtom } from "../../../../store/database";
import { DBIO } from "../../../../utils/database-io";
import { findDelimiter } from "../../../../utils/csv-util";
import { importDatabase } from "../../../../utils/db-import";
import { ConfirmationModal } from "../../../common/confirmation-modal";
import { CSVImportPreview } from "./csv-import-preview";
import { CSVManualInput } from "./csv-manual-input";
import { CSVUpload } from "./csv-upload";

export function CSVImport({ onImport }: { onImport?: () => void }) {
  const [hasHeader, setHasHeader] = useState<boolean>(false);
  const [overwrite, setOverwrite] = useState<boolean>(false);

  const [database, setDatabase] = useAtom(databaseAtom);

  const [csv, setCsv] = useState<string | undefined>(undefined);

  const [delimiter, setDelimiter] = useState<string>(";");

  const [isOverwriteConfirmationOpen, setIsOverwriteConfirmationOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (csv) {
      const inferredDelimiter = findDelimiter(csv);
      if (inferredDelimiter) {
        setDelimiter(inferredDelimiter);
      }
    }
  }, [csv]);

  const handleCSVImport = useCallback(() => {
    if (!csv || !delimiter || !csv.length || !delimiter.length) {
      if (!csv || !csv.length) {
        toast.error("Nincs mit importálni!");
        return;
      }
      if (!delimiter || !delimiter.length) {
        toast.error("Nincs megadva az elválasztó!");
        return;
      }
      return;
    }

    const newDbResult = DBIO.handleImport({
      type: "csv",
      data: csv,
      delimiter,
      hasHeader,
    });
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
  }, [csv, database, delimiter, hasHeader, onImport, overwrite, setDatabase]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <Tabs fullWidth variant="bordered">
          <Tab key="upload" title="Feltöltés">
            <CSVUpload setCsv={setCsv} />
          </Tab>
          <Tab key="manual" title="Kézi bevitel">
            <CSVManualInput csv={csv} setCsv={setCsv} />
          </Tab>
        </Tabs>
        {csv ? (
          <>
            <Input
              label="Elválasztó"
              value={delimiter ?? ""}
              labelPlacement="outside-left"
              onChange={(e) => setDelimiter(e.target.value)}
            />
            <Checkbox
              size="lg"
              checked={hasHeader}
              classNames={{ label: "flex flex-col" }}
              onChange={() => setHasHeader((prev) => !prev)}
            >
              <span className="!text-xl">Van fejléc</span>
              <span className="text-small text-default-400">
                Fejléc esetén az első sor nem kerül beolvasásra, mint adat.
              </span>
            </Checkbox>
            <div>
              <h3 className="text-xl font-bold">Előnézet</h3>
              <h5 className="text-default-400 text-small">
                A beépített kategóriák (
                {DEFAULT_CATEGORIES.map((cat, idx) => (
                  <Fragment
                    key={`csv-import-default-category-list-${cat}-${idx}`}
                  >
                    {idx > 0 ? ", " : ""}
                    <span className="font-bold">{`"${cat}"`}</span>
                  </Fragment>
                ))}
                ) nem kerülnek betöltésre, így az előnézetben sem jelennek meg.
              </h5>
            </div>
            <CSVImportPreview
              csv={csv}
              delimiter={delimiter}
              hasHeader={hasHeader}
            />
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
              disabled={!delimiter.length || !csv.length}
              variant={!delimiter.length || !csv.length ? "faded" : "solid"}
              onPress={() => {
                if (overwrite) {
                  setIsOverwriteConfirmationOpen(true);
                  return;
                }
                handleCSVImport();
              }}
            >
              Betöltés
            </Button>
          </>
        ) : null}
      </div>
      <ConfirmationModal
        yesText="Igen, felülírom"
        onConfirm={() => handleCSVImport()}
        noText="Nem, felülírás megszakítása"
        isOpen={isOverwriteConfirmationOpen}
        id="csv-import-overwrite-confirmation-modal"
        titleText="Biztosan felülírod az adatbázist?"
        onClose={() => setIsOverwriteConfirmationOpen(false)}
        descriptionText="Ezzel az összes kártya és kategória felülírásra kerül. Ez a művelet nem visszavonható. Biztosan folytatni szeretnéd?"
      />
    </>
  );
}
