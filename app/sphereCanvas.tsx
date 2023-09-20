"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import TestSphere from "./test/mesh/test";
import DiscoBrain from "./discoBrain/mesh/discoBrain";

const SphereCanvas = () => {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        {/* <TestSphere /> */}
        <DiscoBrain />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default SphereCanvas;
