/* eslint-disable prettier/prettier */
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState, Children, useMemo, useEffect } from "react";

const springConfig = {
  damping: 15,
  stiffness: 180,
  mass: 0.15,
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function lerp(start: number, end: number, progress: number) {
  const easedProgress = easeOutCubic(progress);

  return start + (end - start) * easedProgress;
}

function CardWrapper({
  i,
  card,
  moveToEnd,
  xInput,
  moveAway,
}: {
  xInput: any;
  card: any;
  i: number;
  moveToEnd: () => void;
  moveAway: () => void;
}) {
  const x = useMemo(() => 20 * i, [i]);
  const scale = useMemo(() => 1 - i * 0.1, [i]);
  const zIndex = useMemo(() => 2 - i, [i]);
  const rotate = useMemo(() => i * -3, [i]);

  const scaleInput = useTransform(xInput, (latest: number) => {
    const distance = Math.min(Math.abs(latest), 120) / 120;
    const start = 1 - i * 0.1;
    const end = start + 0.1;
    const progress = Math.min(distance, 1);

    return lerp(start, end, Math.pow(progress, i));
  });

  const rotateInput = useTransform(xInput, (latest: number) => {
    const distance = Math.min(Math.abs(latest), 100) / 100;
    const start = i * -3;
    const end = start + 3;
    const progress = Math.min(distance, 1);

    return lerp(start, end, Math.pow(progress, i));
  });

  const rotateVal = useSpring(rotateInput, springConfig);
  const scaleVal = useSpring(scaleInput, springConfig);

  return (
    <AnimatePresence>
      <motion.div
        dragSnapToOrigin
        layout
        animate={{
          x,
          zIndex,
          scale,
          rotate,
          transition: {
            type: "spring",
            ...springConfig,
          },
        }}
        className="cursor-pointer"
        drag={i === 0 ? "x" : false}
        dragConstraints={{ left: -100, right: 100 }}
        exit={{ opacity: 0, x: -1000 }}
        style={{
          gridColumn: "1 / 4",
          gridRow: "1",
          scale: scaleVal,
          rotate: rotateVal,
        }}
        title="Drag me"
        whileDrag={{ cursor: "grabbing" }}
        onDrag={(_, info) => {
          xInput.set(info.offset.x);
        }}
        onDragEnd={(_, info) => {
          xInput.set(0);
          if (info.offset.x > 100) {
            moveToEnd();
          }
          if (info.offset.x < -100) {
            moveAway();
          }
        }}
      >
        {card}
      </motion.div>
    </AnimatePresence>
  );
}

export default function CardStack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [cards, setCards] = useState(Children.toArray(children));
  const xInput = useMotionValue(0);
  const moveToEnd = () => {
    setCards((prevCards: any[]) => {
      const cp = [...prevCards];
      const lastItem = cp.shift();

      if (lastItem) {
        cp.push(lastItem);
      }

      return cp;
    });
  };
  const moveAway = () => {
    setCards((prevCards: any[]) => prevCards.slice(1));
  };

  useEffect(() => {
    setCards(Children.toArray(children));
  }, [children]);

  return (
    <div className={className}>
      <LayoutGroup>
        {cards.map((card, i) => (
          <CardWrapper
            // @ts-ignore
            key={card.key}
            card={card}
            i={i}
            moveAway={moveAway}
            moveToEnd={moveToEnd}
            xInput={xInput}
          />
        ))}
      </LayoutGroup>
    </div>
  );
}
