import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import VertexShader from "../shaders/vertexShader";
import FragmentShader from "../shaders/fragmentShader";
import { Vector2 } from "three";

const DiscoMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new Vector2(),
    uDisplace: 2,
    uSpread: 1.2,
    uNoise: 16,
  },
  VertexShader,
  FragmentShader
);

extend({ DiscoMaterial });

const DiscoBrain = () => {
  const mesh = useRef<any>();

  console.log(mesh);

  const ROTATION_SPEED = 0.02;

  useFrame(({ clock }) => {
    if (mesh.current) {
      const elapsedTime = clock.getElapsedTime();

      mesh.current.material.uniforms.uTime.value = elapsedTime;
      // mesh.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh} scale={0.5}>
      <sphereGeometry args={[5, 128, 128]} />
      {/* <boxGeometry args={[5, 5, 5]} /> */}
      {/* <torusKnotGeometry args={[10, 1, 100, 20, 9, 10]} /> */}
      <discoMaterial />
    </mesh>
  );
};
export default DiscoBrain;
