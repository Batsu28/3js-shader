import next from "next";
import { useState, useEffect, createContext } from "react";

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

  const handleWheel = (e: any) => {
    setWheelOrArrow("wheel");
    const deltaY = e.deltaY;
    const eventDelta = e.deltaX;
    const deltaValue = Math.abs(eventDelta);

    setActive(true);
    if (deltaValue > deltaX && deltaValue <= 1000) {
      setDeltaX(deltaValue);
    }

    if (eventDelta < 0) {
      setPrevPage(true);
      setNextPage(false);

      setLastAction("prev");
    } else if (eventDelta > 0) {
      setNextPage(true);
      setPrevPage(false);

      setLastAction("next");
    }

    clearTimeout(isWheelEventTriggered);
    isWheelEventTriggered = setTimeout(() => {
      // setPrevPage(false);
      // setNextPage(false);
      setActive(false);
      setDeltaX(0);
    }, 200);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowLeft") {
      setPrevPage(true);
      setNextPage(false);
      setWheelOrArrow("arrow");

      setLastAction("prev");
    } else if (e.key === "ArrowRight") {
      setNextPage(true);
      setPrevPage(false);
      setWheelOrArrow("arrow");

      setLastAction("next");
    }
  };

  const updateToFalse = () => {
    setPrevPage(false);
    setNextPage(false);
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
