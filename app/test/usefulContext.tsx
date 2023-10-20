import next from "next";
import { useState, useEffect, createContext } from "react";

const UsefulContext = createContext({} as any);

export const UsefulProvider = (props: any) => {
  let [prevPage, setPrevPage] = useState(false);
  let [nextPage, setNextPage] = useState(false);
  const [lastAction, setLastAction]: any = useState(null);
  const [hasDetectedDirection, setHasDetectedDirection] = useState(false);
  const [deltaX, setDeltaX] = useState(1);
  const [wheelOrArrow, setWheelOrArrow] = useState("wheel");
  const [active, setActive] = useState(false);
  let isWheelEventTriggered: any = null;

  const handleWheel = (e: any) => {
    setWheelOrArrow("wheel");
    setActive(true);
    const deltaY = e.deltaY;
    const deltaX = e.deltaX;
    // console.log(e);
    // console.log(deltaX);
    if (deltaX < 0) {
      if (deltaX > -60) {
        setPrevPage(true);
        setLastAction("prev");
        setDeltaX(1);
      } else {
        setPrevPage(true);
        setLastAction("prev");
        setDeltaX(1);
      }
    } else if (deltaX > 0) {
      setNextPage(true);
      setLastAction("next");
      if (deltaX < 60) {
        setDeltaX(1);
      } else {
        setDeltaX(Math.ceil(deltaX / 60));
      }
    }
    clearTimeout(isWheelEventTriggered);
    isWheelEventTriggered = setTimeout(() => {
      setActive(false);
      setPrevPage(false);
      setNextPage(false);
    }, 100);
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
    setHasDetectedDirection(false); // Reset the direction detection.
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
