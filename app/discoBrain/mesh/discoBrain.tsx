import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import VertexShader from "../shaders/vertexShader";
import FragmentShader from "../shaders/fragmentShader";

const DiscoMaterial = shaderMaterial(
  { uTime: 0 },
  VertexShader,
  FragmentShader
);

extend({ DiscoMaterial });

const DiscoBrain = () => {
  const mesh = useRef<any>();

  console.log(mesh);

  const ROTATION_SPEED = 0.02;

  useFrame(({ clock }) => {
    // mesh.current.rotation.x += Math.sin(ROTATION_SPEED / 2);
    mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <sphereGeometry args={[1, 128, 128]} />
      <discoMaterial />
    </mesh>
  );
};
export default DiscoBrain;
