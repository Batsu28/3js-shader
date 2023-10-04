"use client";

import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Blob from "./blobMesh/blob";
import useBlob from "../hooks/useBlob";
import Lights from "./light";
import { animated } from "@react-spring/web";
import TextCarousel from "./titles/title";
import { Titles } from "../utils/blobSettings";

const SphereCanvas = () => {
  const { clickHandler, bg, lights, material, map, geometry, ambient } =
    useBlob();

  const textRef = useRef<any>();

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
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50, near: 0.1, zoom: 1 }}
        dpr={1}
      >
        <ambientLight intensity={ambient} color={"white"} />
        <Lights lights={lights} />
        <Suspense fallback={null}>
          {/* <Blob material={material} map={map} geometry={geometry} /> */}

          <TextCarousel />
        </Suspense>
        <Stats />
        <OrbitControls />
        <Environment preset="studio"></Environment>
      </Canvas>
    </animated.div>
  );
};

export default SphereCanvas;
