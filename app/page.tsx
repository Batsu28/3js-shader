"use client";

import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import VertexShader from "./components/shaders/vertexShader";
import FragmentShader from "./components/shaders/fragmentShader";

const BlobMaterial = shaderMaterial({ uTime: 0 }, VertexShader, FragmentShader);

extend({ BlobMaterial });

const SphereMesh: any = () => {
  const mesh = useRef<any>();

  const ROTATION_SPEED = 0.02;

  useFrame(({ clock }) => {
    // mesh.current.rotation.x += Math.sin(ROTATION_SPEED / 2);
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime() / 15;
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <sphereGeometry args={[1, 128, 128]} />
      {/* <ringGeometry args={[19, 20]} /> */}
      <blobMaterial />
    </mesh>
  );
};

const Home = () => {
  return (
    <main className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={1} />
        <Suspense>
          <SphereMesh />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </main>
  );
};

export default Home;
