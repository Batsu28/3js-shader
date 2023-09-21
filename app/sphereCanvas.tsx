"use client";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import TestSphere from "./test/mesh/test";
import DiscoBrain from "./discoBrain/mesh/discoBrain";
import WarpMesh from "./test/mesh/warpMesh";

const SphereCanvas = () => {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        {/* <TestSphere /> */}
        <DiscoBrain />
        {/* <WarpMesh /> */}
      </Suspense>
      <OrbitControls />
      <Stats />
    </Canvas>
  );
};

export default SphereCanvas;
