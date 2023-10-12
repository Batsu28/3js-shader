import { useState, useEffect, createContext } from "react";

const UsefulContext = createContext({} as any);

export const UsefulProvider = (props: any) => {
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [hasDetectedDirection, setHasDetectedDirection] = useState(false);

  const handleWheel = (e: any) => {
    if (hasDetectedDirection) {
      return; // Don't make any changes if the direction has already been detected.
    }

    const deltaY = e.deltaY;
    const deltaX = e.deltaX;

    if (deltaY < 0 || deltaX < 0) {
      setPrevPage(true);
      setHasDetectedDirection(true); // Mark that you've detected the direction.
    } else if (deltaY > 0 || deltaX > 0) {
      setNextPage(true);
      setHasDetectedDirection(true); // Mark that you've detected the direction.
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowLeft") {
      setNextPage(true);
    } else if (e.key === "ArrowRight") {
      setPrevPage(true);
    }
  };

  const updateToFalse = () => {
    setPrevPage(false);
    setNextPage(false);
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
      }}
    >
      {props.children}
    </UsefulContext.Provider>
  );
};

export const UsefulConsumer = UsefulContext.Consumer;
export default UsefulContext;
