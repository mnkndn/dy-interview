import "./App.css";
import { useState, useEffect } from "react";
import Card from "./Card";

const pool = [1, 2, 3, 4, 5, 6, 7, 8];
const bufferRandomizedPool = pool.sort((a, b) => 0.5 - Math.random());
const bufferRandomizedPool2 = pool.sort((a, b) => 0.5 - Math.random());
const randomizedPool = [...bufferRandomizedPool, ...bufferRandomizedPool2];

function App() {
  const [cardState, setCardState] = useState<Record<number, boolean>>(
    {} as Record<number, boolean>
  );

  const [matchedCardState, setMatchedCardState] = useState<
    Record<number, boolean>
  >({} as Record<number, boolean>);

  const [totalCardsOpened, setTotalCardsOpened] = useState(0);

  useEffect(() => {
    if (totalCardsOpened >= 2) {
      const keys = Object.keys(cardState);
      const areCardsMatching =
        randomizedPool[parseInt(keys[0])] === randomizedPool[parseInt(keys[1])];

      if (areCardsMatching) {
        setMatchedCardState((state) => ({
          ...state,
          [parseInt(keys[0])]: true,
          [parseInt(keys[1])]: true,
        }));
        setTimeout(() => {
          setCardState({});
          setTotalCardsOpened(0);
        }, 500);
        return;
      }

      setTimeout(() => {
        setCardState({});
        setTotalCardsOpened(0);
      }, 500);
    }
  }, [totalCardsOpened, cardState]);

  return (
    <main className="flex flex-wrap gap-4">
      {[...randomizedPool].map((poolItem, index) => (
        <Card
          key={index}
          number={poolItem}
          visible={cardState[index]}
          setCardState={setCardState}
          index={index}
          isMatched={Boolean(matchedCardState[index])}
          totalCardsOpened={totalCardsOpened}
          setTotalCardsOpened={setTotalCardsOpened}
        />
      ))}
    </main>
  );
}

export default App;
