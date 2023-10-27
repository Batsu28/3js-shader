"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RingSvg from "./ring";

const limit = 250;

function Test({ current }: any) {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  const handleMouseOver = (e: any) => {
    if (isFollow) {
      setPoint({
        x: e.pageX - window.innerWidth / 2,
        y: e.pageY + 135 - window.innerHeight,
      });
    } else {
      setPoint({
        x: 0,
        y: 0,
      });
    }
  };
  //console.log(point);

  const handleMouseEnter = () => {
    setIsHover(true);
    setIsFollow(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    //if (!isHover) {
    if (
      point.x > limit ||
      point.x < -limit ||
      point.y > limit / 2 ||
      point.y < -limit
    )
      setIsFollow(false);
    // }
  }, [point.x, point.y]);
  const num = 300 / 14;
  return (
    <div
      className="w-full h-full flex justify-center items-end absolute top-0 left-0 z-1"
      onMouseMove={handleMouseOver}
    >
      <h3 className="absolute left-0 bottom-0 p-10 cursor-pointer headerBtn">
        NFT Collection
      </h3>
      <div className="m-5 p-10 cursor-pointer" onMouseOver={handleMouseEnter}>
        <motion.div
          style={{
            transition: "all 0.2s ease",
          }}
          animate={{ x: point.x, y: point.y }}
          className="pointer-events-auto rounded-full"
          onMouseOut={handleMouseLeave}
        >
          <RingSvg />
        </motion.div>
      </div>
      <div className="w-[300px] absolute bottom-0 right-0 m-10">
        <div className="w-[300px] border-t-4 border-white opacity-50"></div>
        <motion.div
          className="absolute bottom-0 left-0 border-t-4 border-white"
          animate={{ width: `${num * (Math.abs(current) / 4) + num}px` }}
        ></motion.div>
      </div>
    </div>
  );
}

export default Test;
