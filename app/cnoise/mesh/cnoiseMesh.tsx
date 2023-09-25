import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import VertexShader from "../shaders/vertexShader";
import FragmentShader from "../shaders/fragmentShader";
import * as THREE from "three";

const Uniforms = {
  uTime: { value: 1 },
  randomFactors: { value: [1, 1, 1] },
};

const CnoiseMesh = () => {
  const mesh = useRef<any>();
  const shader = useRef<any>();
  const geometryRef = useRef<any>();

  const ROTATION_SPEED = 0.02;

  useEffect(() => {
    if (geometryRef.current) {
      const attributesCount = geometryRef.current.attributes.position.count;
      const newRandomAttributes = new Float32Array(attributesCount);
      for (let i = 0; i < attributesCount; i++)
        newRandomAttributes[i] = Math.random();
      geometryRef.current.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(newRandomAttributes, 1)
      );
    }
  }, [geometryRef]);

  useFrame((state, delta) => {
    const { clock } = state;
    const elapsedTime = clock.getElapsedTime();
    shader.current.uniforms.uTime += elapsedTime;
    mesh.current.rotation.y -= 0.002;
  });

  return (
    <mesh position={[0, 0, 0]} scale={0.5} ref={mesh}>
      {/* <sphereGeometry ref={geometryRef} args={[10, 128, 128]} /> */}
      <icosahedronGeometry ref={geometryRef} args={[10, 30]} />
      {/* <boxGeometry args={[5, 5, 5]} /> */}
      {/* <planeGeometry args={[10, 1, 100, 20, 9, 10]} /> */}
      {/* <sphereMaterial /> */}
      <shaderMaterial
        vertexShader={VertexShader}
        fragmentShader={FragmentShader}
        ref={shader}
        uniforms={Uniforms}
      />
      {/* <meshStandardMaterial color={"red"} /> */}
    </mesh>
  );
};
export default CnoiseMesh;
