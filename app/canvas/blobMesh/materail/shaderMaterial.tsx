import { useState, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import MagicalMaterialImpl from "./meshMaterial";

const LOOP_DURATION = 12;
const NOISE_PERIOD_REPEAT = 3;

export const MagicalMaterial = forwardRef((props: any, ref) => {
  const [material] = useState(() => new MagicalMaterialImpl());

  useFrame((_, delta) => {
    material.time += delta * (material.speed / NOISE_PERIOD_REPEAT);
    material.surfaceTime +=
      delta * (material.surfaceSpeed / NOISE_PERIOD_REPEAT);
  });

  return (
    <primitive
      dispose={undefined}
      object={material}
      ref={ref}
      attach="material"
      {...props}
    />
  );
});

export default MagicalMaterial;
