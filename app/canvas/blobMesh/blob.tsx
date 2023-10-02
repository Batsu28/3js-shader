import { shaderMaterial, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import MagicalMaterial from "./materail/shaderMaterial";

const Blob = ({ setting }: any) => {
  const mesh = useRef<any>();
  const texture = useTexture("./primary.png");

  useFrame((_, delta) => {
    if (setting.isChange) {
      mesh.current.rotation.z = Math.cos(1000);
    }
  });

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <sphereGeometry args={[1, 512, 512]} />
      <MagicalMaterial map={texture} {...setting} />
    </mesh>
  );
};

export default Blob;
