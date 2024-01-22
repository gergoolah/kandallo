"use client";

import { Button, Tooltip } from "@nextui-org/react";
import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { DEFAULT_CATEGORIES, databaseAtom } from "../../store/database";
import { sortFn } from "../../utils/array";
import { getRandomPastelColor } from "../../utils/colors";
import { CategoryEditModal } from "./category-edit-modal";
import { ExportModal } from "./export-modal";
import { ImportModal } from "./import-modal";
import { ICategory } from "../../store/types";
import { GameDescription } from "../common/game-description";
import { FEATURE_FLAGS } from "../../feature-flags";

export function DatabaseView() {
  const [database, setDatabase] = useAtom(databaseAtom);

  const categoryColors = useMemo(
    () =>
      Array.from(new Set(database.map((category) => category.name))).reduce(
        (prev, curr) => {
          if (Object.keys(prev).includes(curr)) {
            return prev;
          }
          return { ...prev, [curr]: getRandomPastelColor() };
        },
        {} as { [category: string]: ReturnType<typeof getRandomPastelColor> }
      ),
    [database]
  );

  const dbCategories = useMemo(
    () => Array.from(new Set(database.map((category) => category.name))),
    [database]
  );

  const [editName, setEditName] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<string | undefined>();

  const editCategory = useCallback(
    (categoryName: string, autoFocusNameInput?: boolean) => {
      setCategoryToEdit(categoryName);
      setEditName(autoFocusNameInput ?? false);
    },
    []
  );

  const [importExportModalState, setImportExportModalState] = useState<
    "import" | "export" | undefined
  >();

  const handleCloseEdit = useCallback(() => {
    setCategoryToEdit(undefined);
    setEditName(false);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        {FEATURE_FLAGS.SHOW_PROJECT_DESCRIPTION ? <GameDescription /> : null}
        <h2 className="text-4xl font-bold">Adatbázis kezelése</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <Button
            size="lg"
            variant="solid"
            color="primary"
            className="w-full md:w-1/2"
            onPress={() => setImportExportModalState("import")}
          >
            Importálás
          </Button>
          <Button
            size="lg"
            variant="flat"
            color="warning"
            className="w-full md:w-1/2"
            onPress={() => setImportExportModalState("export")}
          >
            Exportálás
          </Button>
        </div>

        <h3 className="text-3xl font-bold pt-5">Kategóriák</h3>
        <div className="flex flex-wrap align-middle items-center gap-5">
          <div className="my-2">
            <Tooltip content="Új kategória" color="success">
              <Button
                onPress={() => {
                  let newCategory: ICategory = {
                    name: "Új kategória",
                    questions: [],
                  };
                  setDatabase((db) => {
                    const noOfNewCategories = db.filter((category) =>
                      category.name.startsWith("Új kategória")
                    ).length;
                    if (noOfNewCategories > 0) {
                      newCategory.name = `Új kategória ${
                        noOfNewCategories + 1
                      }`;
                      return [...db, newCategory];
                    }
                    return [...db, newCategory];
                  });
                  editCategory(newCategory.name, true);
                }}
                color="success"
                className={classNames(
                  "p-5 -my-2",
                  "hover:shadow-[0_0_20px] hover:shadow-[#dc8a06b1] cursor-pointer"
                )}
              >
                <h3 className="text-2xl text-white font-bold">+</h3>
              </Button>
            </Tooltip>
          </div>
          {dbCategories
            .sort(
              sortFn((a, b) => {
                if (([...DEFAULT_CATEGORIES] as string[]).includes(a)) {
                  if (([...DEFAULT_CATEGORIES] as string[]).includes(b))
                    return "a=b";
                  return "a<b";
                }
                if (a.length < b.length) return "a<b";
                if (a.length > b.length) return "a>b";
                return "a=b";
              })
            )
            .map((category, cidx) => (
              <div className="my-2" key={cidx}>
                <Button
                  onPress={() => editCategory(category)}
                  style={{ backgroundColor: categoryColors[category] }}
                  className={classNames(
                    "p-5 -my-2",
                    "hover:shadow-[0_0_20px] hover:shadow-[#dc8a06b1] cursor-pointer"
                  )}
                >
                  <h3 className="text-2xl text-white font-bold">{category}</h3>
                </Button>
              </div>
            ))}
        </div>
      </div>
      <CategoryEditModal
        onClose={handleCloseEdit}
        autoFocusNameInput={editName}
        categoryColors={categoryColors}
        categoryToEdit={categoryToEdit}
        setCategoryToEdit={setCategoryToEdit}
      />
      <ImportModal
        isOpen={importExportModalState === "import"}
        onClose={() => setImportExportModalState(undefined)}
      />
      <ExportModal
        isOpen={importExportModalState === "export"}
        onClose={() => setImportExportModalState(undefined)}
      />
    </>
  );
}
