import { useState, useEffect } from "react";

function useWheel() {
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  const handleWheel = (e: any) => {
    const deltaY = e.deltaY;
    const deltaX = e.deltaX;

    if (deltaY < 0 || deltaX < 0) {
      // Scrolling up or to the left
      setNextPage(true);
    } else if (deltaY > 0 || deltaX > 0) {
      // Scrolling down or to the right
      setPrevPage(true);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return { prevPage, setPrevPage, nextPage, setNextPage, handleWheel };
}

export default useWheel;
