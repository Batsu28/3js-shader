"use client";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Blob from "./blobMesh/blob";
import useBlob from "../hooks/useBlob";
import { LightType } from "../utils/settingType";

const SphereCanvas = () => {
  const { setting, increment, decrement } = useBlob();

  return (
    <div
      className={"w-full h-full flex relative"}
      style={{ backgroundColor: setting.bg }}
    >
      <div
        onClick={decrement}
        className="w-1/2 h-full absolute top-0 left-0 z-10 text-center"
      >
        -
      </div>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1} />
        {setting.lights?.map((light, i) => (
          <spotLight {...light} />
        ))}
        <Suspense fallback={null}>
          <Blob material={setting.material} map={setting.map} />
        </Suspense>
        {/* <OrbitControls /> */}
        <Stats />
      </Canvas>
      <div
        onClick={increment}
        className="w-1/2 h-full absolute top-0 right-0 z-10 text-center"
      >
        +
      </div>
    </div>
  );
};

export default SphereCanvas;
