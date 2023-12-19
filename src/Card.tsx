interface Props {
  number: number;
  visible: boolean;
  setCardState: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  index: number;
  totalCardsOpened: number;
  setTotalCardsOpened: React.Dispatch<React.SetStateAction<number>>;
  isMatched: boolean;
}

export default function Card({
  number,
  visible,
  index,
  setCardState,
  totalCardsOpened,
  setTotalCardsOpened,
  isMatched,
}: Props) {
  const onHandleClick = () => {
    if (totalCardsOpened >= 2 || isMatched) {
      return;
    }

    setTotalCardsOpened((state) => ++state);

    setCardState((state) => ({
      ...state,
      [index]: !visible,
    }));
  };
  return (
    <div
      onClick={onHandleClick}
      className={`h-64 w-64 ${
        isMatched && "opacity-0"
      } bg-white rounded-lg flex items-center justify-center`}
    >
      {visible && <span>{number}</span>}
    </div>
  );
}
