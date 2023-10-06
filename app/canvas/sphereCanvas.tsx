"use client";

import { Environment, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Blob from "./blobMesh/blob";
import useBlob from "../hooks/useBlob";
import Lights from "./light";
import { animated } from "@react-spring/web";

const SphereCanvas = () => {
  const { clickHandler, background, bg, ambient, lights, ...restSetting } =
    useBlob();

  return (
    <animated.div
      className="w-full h-full"
      onClick={clickHandler}
      style={{ background, transition: "ease-out 0.5s" }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={ambient} />
        <Lights lights={lights} />
        <Suspense fallback={null}>
          <Blob {...restSetting} />
        </Suspense>
        <Stats />
        {/* <OrbitControls /> */}
        <Environment files={"/peppermint_powerplant_1k.hdr"} />
      </Canvas>
    </animated.div>
  );
};

export default SphereCanvas;
