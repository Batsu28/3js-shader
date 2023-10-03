"use client";

import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

const style = {
  global: "w-[50vw] h-1/2 bg-white",
};
const boxes = [
  { bg: "red" },
  { bg: "green" },
  { bg: "blue" },
  { bg: "purple" },
  { bg: "orange" },
];

const AnimationTest = () => {
  let num = 1;
  const [{ background }, api] = useSpring(() => ({
    background: boxes[num].bg,
  }));

  const clickHandler = () => {
    num += 1;
    api.start({ background: boxes[num].bg });
  };
  return (
    <animated.div
      className="w-full h-full justify-around flex items-center"
      style={{ background: background }}
      onClick={clickHandler}
    >
      {/* {array.map((box, i) => (
        <div className={`${style.global} ${box.bg}`} key={i}>
          s
        </div>
      ))} */}
      <div className={`${style.global}`}></div>
    </animated.div>
  );
};

export default AnimationTest;
