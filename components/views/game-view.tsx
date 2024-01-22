"use client";
import { Button, Card } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { databaseAtom } from "../../store/database";
import { selectedCategoriesAtom } from "../../store/game";
import { IGameCard } from "../../store/types";
import { shuffle } from "../../utils/array";
import { getRandomPastelColor } from "../../utils/colors";
import useGameState from "../../utils/hooks/use-game-state";

export function Game() {
  const database = useAtomValue(databaseAtom);
  const selectedCategories = useAtomValue(selectedCategoriesAtom);

  const { setGameState } = useGameState();

  const [cards, setCards] = useState<IGameCard[]>([]);

  const shuffleCards = useCallback(() => {
    setCards(
      shuffle(
        database
          .filter((category) => selectedCategories.includes(category.name))
          .reduce(
            (prev, category) => [
              ...prev,
              ...category.questions.map(
                (question) =>
                  ({ question, category: category.name } as IGameCard)
              ),
            ],
            [] as IGameCard[]
          )
      )
    );
  }, [database, selectedCategories]);

  useEffect(() => {
    if (cards.length <= 0) {
      shuffleCards();
      return;
    }
  }, [cards.length, shuffleCards]);

  const categoryColors = useMemo(
    () =>
      Array.from(new Set(selectedCategories)).reduce((prev, curr) => {
        if (Object.keys(prev).includes(curr)) {
          return prev;
        }
        return { ...prev, [curr]: getRandomPastelColor() };
      }, {} as { [category: string]: ReturnType<typeof getRandomPastelColor> }),
    [selectedCategories]
  );

  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const selectedCard = useMemo(
    () => cards.find((_, idx) => idx === selectedIdx),
    [cards, selectedIdx]
  );

  const nextCard = useCallback(() => {
    if (selectedIdx + 1 >= cards.length) {
      shuffleCards();
      setSelectedIdx(0);
      return;
    }
    setSelectedIdx((prev) => prev + 1);
  }, [cards.length, selectedIdx, shuffleCards]);

  return (
    <div className="flex flex-col align-center w-full pt-5 gap-2">
      {selectedCard ? (
        <Card
          className="p-5 flex flex-col items-center justify-center gap-2 [text-wrap:wrap] break-words"
          style={{ backgroundColor: categoryColors[selectedCard.category] }}
        >
          <h3 className="text-center text-current text-3xl opacity-50">
            {selectedCard.category}
          </h3>
          <h1 className="text-center text-5xl font-bold [text-wrap:wrap] break-words">
            {selectedCard.question}
          </h1>
        </Card>
      ) : null}
      <div className="flex items-center justify-evenly content-center gap-5">
        <Button
          fullWidth
          color="success"
          variant="solid"
          onClick={nextCard}
          className="text-2xl font-bold h-16 [text-wrap:wrap]"
        >
          {selectedIdx < cards.length - 1 ? "Következő kártya" : "Újrakeverés"}
        </Button>
        <Button
          fullWidth
          color="danger"
          variant="flat"
          className="text-2xl font-bold h-16"
          onClick={() => {
            setGameState("config");
            setSelectedIdx(0);
          }}
        >
          Játék vége
        </Button>
      </div>
    </div>
  );
}
