import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import VertexShader from "../shaders/vertexShader";
import FragmentShader from "../shaders/fragmentShader";
import * as THREE from "three";

const debugObject = {
  depthColor: "#186691",
  surfaceColor: "#9bd8ff",
};

const Uniforms = {
  uTime: { value: 0 },
  uBigWavesElevation: { value: 0.2 },
  uBigWavesFrequency: { value: new THREE.Vector2(4, 8) },
  uBigWavesSpeed: { value: 1.0 },
  uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
  uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
  uColorOffset: { value: 0.0 },
  uColorMultiplier: { value: 7.7 },
};

const CnoiseMesh = () => {
  const mesh = useRef<any>();

  const timeGenerator = () => {
    return (Math.ceil(Math.random() * 2) + Math.ceil(Math.random() * 2)) * 710;
  };

  let time = timeGenerator();
  let direction = 1;

  const updateInterval = () => {
    clearInterval(intervalID);
    time = timeGenerator();
    intervalID = setInterval(() => {
      direction *= -1;
      updateInterval();
    }, time);
  };

  let intervalID = setInterval(updateInterval, time);

  // updateInterval();

  useFrame(() => {
    mesh.current.material.uniforms.uTime.value += direction / 30;
    // if (camera) {
    mesh.current.__r3f.parent.__r3f.objects[0].object.position.y +=
      0.03 * direction;
    // } else {
    //   mesh.current.__r3f.parent.__r3f.objects[0].object.position.y -= 0.05;
    // }
    // mesh.current.material.wireframe = true;
  });

  return (
    <mesh position={[0, 0, 0]} scale={1} ref={mesh}>
      <sphereGeometry args={[5, 512, 512]} />
      {/* <icosahedronGeometry args={[10, 50]} /> */}
      {/* <boxGeometry args={[5, 5, 5]} /> */}
      {/* <planeGeometry args={[10, 1, 100, 20, 9, 10]} /> */}
      <shaderMaterial
        vertexShader={VertexShader}
        fragmentShader={FragmentShader}
        uniforms={Uniforms}
      />
      {/* <meshStandardMaterial color={"red"} /> */}
    </mesh>
  );
};
export default CnoiseMesh;
