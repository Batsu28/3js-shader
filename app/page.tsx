"use client";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Color } from "three";

const sphereShaderMaterial = shaderMaterial(
  {},
  // vertex shader
  /*glsl*/ `
    
  `,
  // fragment shader
  /*glsl*/ `
    
  `
);
extend({ sphereShaderMaterial });

const Mesh = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <sphereShaderMaterial />
    </mesh>
  );
};

export default function Home() {
  return (
    <main className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight color={"red"} position={[1, 1, 1]} intensity={100} />
        <Mesh />
        {/* <OrbitControls /> */}
      </Canvas>
    </main>
  );
}
