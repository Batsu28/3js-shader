import { useRef } from "react";
import MagicalMaterial from "./materail/shaderMaterial";
import { useTexture } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";

const Blob = ({ material, map, geometry }: any) => {
  const meshRef = useRef<any>();

  const texture = useTexture(`./${map}.jpeg`);

  return (
    <mesh position={[0, 0, 0]} rotation={geometry.rotate} ref={meshRef}>
      <sphereGeometry args={[geometry.scale, 512, 512]} />
      <MagicalMaterial map={texture} {...material} />
    </mesh>
  );
};

export default Blob;
