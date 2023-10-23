import next from "next";
import { useState, useEffect, createContext } from "react";

const UsefulContext = createContext({} as any);

export const UsefulProvider = (props: any) => {
  let [prevPage, setPrevPage] = useState(false);
  let [nextPage, setNextPage] = useState(false);
  const [lastAction, setLastAction]: any = useState(null);
  const [hasDetectedDirection, setHasDetectedDirection] = useState(false);
  const [deltaX, setDeltaX] = useState(6);
  const [wheelOrArrow, setWheelOrArrow] = useState("wheel");
  const [active, setActive] = useState(false);
  let isWheelEventTriggered: any = null;

  const handleWheel = (e: any) => {
    setWheelOrArrow("wheel");
    setActive(true);
    const deltaY = e.deltaY;
    const eventDelta = e.wheelDelta;
    if (Math.abs(eventDelta) > deltaX) {
      setDeltaX(Math.abs(eventDelta));
    }

    // console.log(e.wheelDelta);
    // console.log(deltaX);
    if (eventDelta > 0) {
      setPrevPage(true);
      setLastAction("prev");
    } else if (eventDelta < 0) {
      setNextPage(true);
      setLastAction("next");
    }

    updateToFalse(200);
  };

  const handleKeyDown = (e: any) => {
    setWheelOrArrow("arrow");
    if (e.key === "ArrowLeft") {
      setActive(true);

      setPrevPage(true);
      setLastAction("prev");
    } else if (e.key === "ArrowRight") {
      setActive(true);

      setNextPage(true);
      setLastAction("next");
    }
    updateToFalse(1);
  };

  const updateToFalse = (time: number) => {
    clearTimeout(isWheelEventTriggered);
    isWheelEventTriggered = setTimeout(() => {
      setActive(false);
      setPrevPage(false);
      setNextPage(false);
      setDeltaX(6);
    }, time);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [hasDetectedDirection]); //
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
