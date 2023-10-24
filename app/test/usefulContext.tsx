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

  const handleDelta = (eventDelta: any) => {
    const deltaValue = Math.abs(eventDelta);
    if (deltaValue > deltaX) {
      setDeltaX(deltaValue);
    }
  };

  const handleWheel = (e: any) => {
    setWheelOrArrow("wheel");
    setActive(true);
    const deltaY = e.deltaY;
    // const eventDelta = e.wheelDelta;
    const eventDelta = e.deltaX;

    // console.log(e.wheelDelta);
    // console.log(deltaX);
    if (eventDelta < 0) {
      setPrevPage(true);
      setLastAction("prev");
      handleDelta(eventDelta);
    } else if (eventDelta > 0) {
      setNextPage(true);
      setLastAction("next");
      handleDelta(eventDelta);
    }

    clearTimeout(isWheelEventTriggered);
    isWheelEventTriggered = setTimeout(() => {
      setActive(false);
      setPrevPage(false);
      setNextPage(false);
      setDeltaX(0);
    }, 200);
  };

  const handleKeyDown = (e: any) => {
    setWheelOrArrow("arrow");
    if (e.key === "ArrowLeft") {
      setPrevPage(true);
      setLastAction("prev");
    } else if (e.key === "ArrowRight") {
      setNextPage(true);
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
