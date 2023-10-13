import next from "next";
import { useState, useEffect, createContext } from "react";

const UsefulContext = createContext({} as any);

export const UsefulProvider = (props: any) => {
  let [prevPage, setPrevPage] = useState(0);
  let [nextPage, setNextPage] = useState(0);
  const [lastAction, setLastAction]: any = useState(null);
  const [hasDetectedDirection, setHasDetectedDirection] = useState(false);
  const [deltaX, setDeltaX] = useState(0);
  const [wheelOrArrow, setWheelOrArrow] = useState("wheel");
  let isWheelEventTriggered = false;

  const handleWheel = (e: any) => {
    setWheelOrArrow("wheel");
    const deltaY = e.deltaY;
    const deltaX = e.deltaX;
    setDeltaX(deltaX);
    // console.log(deltaX);
    console.log(deltaX);
    if (!isWheelEventTriggered) {
      if (deltaX < 0) {
        if (deltaX < -2) {
          setPrevPage(++prevPage);
          setLastAction("prev");
        }
      } else if (deltaX > 0) {
        if (deltaX > 2) {
          setNextPage(++nextPage);
          setLastAction("next");
        }
      }
      isWheelEventTriggered = true;

      // Set a timeout to reset the flag after a delay if needed
      setTimeout(() => {
        isWheelEventTriggered = false;
      }, 1000); // Adjust the delay as needed
    }
  };
  const handleKeyDown = (e: any) => {
    setWheelOrArrow("arrow");
    if (e.key === "ArrowLeft") {
      setPrevPage(++prevPage);
      setLastAction("prev");
    } else if (e.key === "ArrowRight") {
      setNextPage(++nextPage);
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
      }}
    >
      {props.children}
    </UsefulContext.Provider>
  );
};

export const UsefulConsumer = UsefulContext.Consumer;
export default UsefulContext;
