import { useGesture } from "@use-gesture/react";
import next from "next";
import { useState, useEffect, createContext } from "react";
import { MathUtils } from "three";

const UsefulContext = createContext({} as any);

export const UsefulProvider = (props: any) => {
  let [prevPage, setPrevPage] = useState(false);
  let [nextPage, setNextPage] = useState(false);
  const [lastAction, setLastAction]: any = useState(null);
  const [hasDetectedDirection, setHasDetectedDirection] = useState(false);
  const [deltaX, setDeltaX] = useState(0);
  const [wheelOrArrow, setWheelOrArrow] = useState("wheel");
  const [active, setActive] = useState(false);
  let isWheelEventTriggered: any = null;

  const updateToFalse = () => {
    setPrevPage(false);
    setNextPage(false);
  };
  if (typeof window !== "undefined") {
    useGesture(
      {
        onWheel: (state) => {
          setWheelOrArrow("wheel");

          const eventDelta = MathUtils.clamp(
            state.delta[0] + state.delta[1],
            -100,
            100
          );

          if (state.first) {
            setActive(true);
          }
          setDeltaX(eventDelta);

          if (eventDelta < 0) {
            setPrevPage(true);
            setNextPage(false);
          } else if (eventDelta > 0) {
            setNextPage(true);
            setPrevPage(false);
          }
          if (state.last) {
            setActive(false);
            setDeltaX(0);
          }
        },
        onKeyDown: (state) => {
          if (state.event.key === "ArrowLeft") {
            setPrevPage(true);
            setNextPage(false);
            setWheelOrArrow("arrow");
          } else if (state.event.key === "ArrowRight") {
            setNextPage(true);
            setPrevPage(false);
            setWheelOrArrow("arrow");
          }
        },
      },
      {
        target: document.body,
        eventOptions: { passive: false },
      }
    );
  }
  return (
    <UsefulContext.Provider
      value={{
        prevPage,
        updateToFalse,
        nextPage,
        lastAction,
        deltaX,
        wheelOrArrow,
        active,
      }}
    >
      {props.children}
    </UsefulContext.Provider>
  );
};

export const UsefulConsumer = UsefulContext.Consumer;
export default UsefulContext;
