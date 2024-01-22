import { Button, Checkbox, Chip, Divider } from "@nextui-org/react";
import { DEFAULT_CATEGORIES, databaseAtom } from "../../store/database";
import { selectedCategoriesAtom } from "../../store/game";
import { useMemo } from "react";
import useGameState from "../../utils/hooks/use-game-state";
import { useAtom, useAtomValue } from "jotai";
import { sortFn } from "../../utils/array";
import { ICategory } from "../../store/types";
import classNames from "classnames";

export function NewGameFormView() {
  const database = useAtomValue(databaseAtom);
  const [selectedCategories, setSelectedCategories] = useAtom(
    selectedCategoriesAtom
  );

  const categories = useMemo(
    () =>
      Array.from(new Set(database.map((category) => category.name)))
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
        .map((category) => database.find((c) => c.name === category))
        .filter((c): c is ICategory => c !== undefined),
    [database]
  );

  const { setGameState } = useGameState();

  const selectedCategoryCards = useMemo(
    () =>
      database
        .filter((category) => selectedCategories.includes(category.name))
        .reduce((prev, curr) => [...prev, ...curr.questions], [] as string[]),
    [database, selectedCategories]
  );

  return (
    <div className="flex flex-col gap-5">
      <Divider />
      <h2 className="text-4xl font-bold">Új játék</h2>
      <h3 className="text-2xl">Válassz kategóriá(ka)t:</h3>
      <div className="flex flex-col justify-center gap-5">
        <div className="flex justify-start flex-col gap-3 flex-wrap md:max-h-40">
          {categories.map((category, cidx) => (
            <Checkbox
              size="lg"
              key={cidx}
              isSelected={selectedCategories.includes(category.name)}
              onValueChange={() => {
                if (!selectedCategories.includes(category.name)) {
                  setSelectedCategories((prev) => [...prev, category.name]);
                } else {
                  setSelectedCategories((prev) =>
                    prev.filter((c) => c !== category.name)
                  );
                }
              }}
            >
              <div className="flex flex-col gap-0">
                <b
                  className={classNames(
                    ([...DEFAULT_CATEGORIES] as string[]).includes(
                      category.name
                    ) && "underline"
                  )}
                >
                  {category.name}
                </b>
                <div className="flex flex-row flex-wrap gap-1 items-center opacity-70">
                  {([...DEFAULT_CATEGORIES] as string[]).includes(
                    category.name
                  ) ? (
                    <>
                      <span className="text-small text-black dark:text-white">
                        Beépített kategória
                      </span>
                      |
                    </>
                  ) : null}
                  <span className="text-small">
                    {category.questions.length} kérdés
                  </span>
                </div>
              </div>
            </Checkbox>
          ))}
        </div>
        <div className="flex flex-col md:flex-row content-start gap-2 w-full">
          <Button
            size="lg"
            variant="solid"
            color="warning"
            className="text-md font-bold w-full md:w-1/2"
            onClick={() => setSelectedCategories(categories.map((c) => c.name))}
          >
            Összes kijelölése
          </Button>
          <Button
            size="lg"
            variant="flat"
            color="warning"
            className="text-md font-bold w-full md:w-1/2"
            onClick={() => setSelectedCategories([])}
          >
            Kijelölés törlése
          </Button>
        </div>
      </div>
      <div className="flex justify-center content-center items-center">
        <Button
          fullWidth
          size="lg"
          className="text-3xl p-7 font-bold"
          onClick={() => setGameState("game")}
          disabled={!selectedCategories.length || !selectedCategoryCards.length}
          variant={
            selectedCategories.length && selectedCategoryCards.length
              ? "solid"
              : "faded"
          }
          color={
            selectedCategories.length && selectedCategoryCards.length
              ? "success"
              : "default"
          }
        >
          Játék kezdése
        </Button>
      </div>
    </div>
  );
}
