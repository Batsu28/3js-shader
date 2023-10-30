"use client";

import { Suspense, useMemo, useRef } from "react";

import { Environment, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { animated } from "@react-spring/web";

import Blob from "./blobMesh/blob";
import Lights from "./light";
// import SpiralPlane from "./Text/SpiralPlane";
import SpiralPlane from "../test/textCarousel";

import { BlobSetting, Titles } from "../utils/blobSettings";
import useUsefulHooks from "../hooks/useWheel";
import { useGesture } from "@use-gesture/react";
import { MathUtils } from "three";

const SphereCanvas = ({ current, setCurrent }: any) => {
  const { prevPage, nextPage }: any = useUsefulHooks();

  const { bg, ambient, lights, ...restSetting } = useMemo(
    () => BlobSetting[Titles[Math.abs(current) / 4]],
    [nextPage, prevPage, current]
  );

  return (
    <animated.div
      className="w-full h-full"
      style={{ background: bg, transition: "ease-out 0.4s" }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={ambient} />

        <Lights lights={lights} />
        <Suspense fallback={null}>
          <Blob {...restSetting} />
          <SpiralPlane current={current} setCurrent={setCurrent} />
        </Suspense>
        <Stats />
        {/* <OrbitControls /> */}
        <Environment files={"/peppermint_powerplant_1k.hdr"} />
      </Canvas>
    </animated.div>
  );
};
// function CameraRig() {
//   useFrame((state, delta) => {
//     easing.damp3(
//       state.camera.position,
//       [
//         -1 + (state.pointer.x * state.viewport.width) / 3,
//         (1 + state.pointer.y) / 2,
//         5.5,
//       ],
//       0.5,
//       delta
//     );
//     state.camera.lookAt(0, 0, 0);
//   });
// }

export default SphereCanvas;
