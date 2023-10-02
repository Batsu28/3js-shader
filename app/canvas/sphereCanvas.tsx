"use client";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Blob from "./blobMesh/blob";
import useBlob from "../hooks/useBlob";

const SphereCanvas = () => {
  const { setting, setSetting } = useBlob();

  return (
    <div className={"w-full h-full "} style={{ backgroundColor: setting.bg }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={1} />
        <spotLight {...setting.light[0]} />
        <spotLight {...setting.light[1]} />
        <spotLight {...setting.light[2]} />
        <Suspense fallback={null}>
          <Blob setting={setting.material} />
        </Suspense>
        <OrbitControls />
        <Stats />
      </Canvas>
    </div>
  );
};

export default SphereCanvas;
