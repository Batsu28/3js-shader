"use client";

import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import Blob from "./blobMesh/blob";
import useBlob from "../hooks/useBlob";
import Lights from "./light";
import { animated } from "@react-spring/web";
import SpiralPlane from "./Text/SpiralPlane";
import { BlobSetting, Titles } from "../utils/blobSettings";
import useWheel from "../hooks/useWheel";
import { pages } from "./Text/data";
import useUsefulHooks from "../hooks/useWheel";

const SphereCanvas = ({ current, setCurrent }: any) => {
  // const { bg, ambient, lights, ...restSetting } = useBlob();
  const { prevPage, nextPage }: any = useUsefulHooks();
  // const [current, setCurrent] = useState(3);

  const { bg, ambient, lights, ...restSetting } = useMemo(
    () => BlobSetting[pages[current].name],
    [nextPage, prevPage, current]
  );

  useEffect(() => {
    if (nextPage) {
      if (current === pages.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
      console.log("next");
    }
    if (prevPage) {
      if (current === 0) {
        setCurrent(pages.length - 1);
      } else {
        setCurrent(current - 1);
      }
      console.log("prev");
    }
  }, [prevPage, nextPage]);
  console.log(prevPage, nextPage);

  return (
    <animated.div
      className="w-full h-full"
      style={{ background: bg, transition: "ease-out 0.5s" }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={ambient} />
        <Lights lights={lights} />
        <Suspense fallback={null}>
          <Blob {...restSetting} />
          <SpiralPlane />
        </Suspense>
        <Stats />
        {/* <OrbitControls /> */}
        <Environment files={"/peppermint_powerplant_1k.hdr"} />
      </Canvas>
    </animated.div>
  );
};

export default SphereCanvas;
