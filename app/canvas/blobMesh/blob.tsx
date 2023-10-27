import { useRef } from "react";
import MagicalMaterial from "./materail/shaderMaterial";
import { useTexture } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

const blobTexture = [
  "/rainbow.jpeg",
  "/deep-ocean.jpeg",
  "/cosmic-fusion.jpeg",
  "/passion.jpeg",
  "/white.jpeg",
  "/sunset-vibes.jpeg",
  "/iridescent.jpeg",
  "/cd.jpeg",
  "/halloween.jpeg",
  "/floyd.jpeg",
  "/hollogram.jpeg",
  "/imaginarium.jpeg",
];

const AnimatedMagicalMaterial: any = animated(MagicalMaterial);

const Blob = ({ material, map, geometry }: any) => {
  const meshRef = useRef<any>();

  const { scale, rotate } = geometry;

  const textures = useTexture(blobTexture);
  const texture = textures[map];

  const AnimatedMaterial = useSpring({
    ...material,
    config: { tension: 60, friction: 20, precision: 0.00001 },
  });

  const meshSpring = useSpring({
    rotation: rotate,
    config: { tension: 50, friction: 14 },
  });

  return (
    <>
      <animated.mesh
        ref={meshRef}
        scale={scale}
        position={[0, 0, 0]}
        {...meshSpring}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 512, 512]} />
        <AnimatedMagicalMaterial map={texture} {...AnimatedMaterial} />
      </animated.mesh>
    </>
  );
};

export default Blob;
