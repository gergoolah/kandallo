import { useAtom } from "jotai";
import { gameStateAtom } from "../../store/game";

const useGameState = () => {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  return { gameState, setGameState };
};

export default useGameState;
