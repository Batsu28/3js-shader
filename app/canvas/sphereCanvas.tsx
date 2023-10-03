"use client";

import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Blob from "./blobMesh/blob";
import useBlob from "../hooks/useBlob";
import Lights from "./light";
import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

const SphereCanvas = () => {
  const {
    background,
    clickHandler,
    bg,
    lights,
    material,
    map,
    geometry,
    ambient,
  } = useBlob();

  return (
    <animated.div
      className={"w-full h-full"}
      style={{
        background: bg,
        transition: "ease-in",
        transitionDuration: "0.5s",
      }}
      onClick={clickHandler}
    >
      {/* <div
        onClick={decrement}
        className="w-1/2 h-full absolute top-0 left-0 z-10 text-center"
      >
        -
      </div> */}
      <Canvas camera={{ position: [0, 0, 3] }} dpr={1}>
        <ambientLight intensity={ambient} color={"white"} />
        <Lights lights={lights} />
        <Suspense fallback={null}>
          <Blob material={material} map={map} geometry={geometry} />
        </Suspense>
        <Stats />
        <Environment preset="apartment"></Environment>
      </Canvas>
      {/* <div
        onClick={increment}
        className="w-1/2 h-full absolute top-0 right-0 z-10 text-center"
      >
        +
      </div> */}
    </animated.div>
  );
};

export default SphereCanvas;
