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

const SphereCanvas = () => {
  // const { bg, ambient, lights, ...restSetting } = useBlob();
  const { prevPage, nextPage, setNextPage, setPrevPage } = useWheel();
  const [current, setCurrent] = useState(4);
  const [change, setChange] = useState(true);

  const length = Titles.length;
  const { bg, ambient, lights, ...restSetting } = useMemo(
    () => BlobSetting[Titles[current]],
    [nextPage, prevPage, current]
  );
  useEffect(() => {
    if (!change) {
      setNextPage(false);
      setPrevPage(false);
      setChange(true);
    }
  }, [change]);

  const clickHandler = (num: number) => {
    if (current == 0) {
      setCurrent(length - 1);
      return;
    }
    if (current == length - 1) {
      setCurrent(0);
      return;
    }
    setCurrent(current + num);
  };

  useEffect(() => {
    if (change) {
      if (nextPage) {
        clickHandler(-1);
        return;
      }
      if (prevPage) {
        clickHandler(1);
        return;
      }
    }
  }, [nextPage, prevPage]);

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
          <SpiralPlane setChange={setChange} />
        </Suspense>
        <Stats />
        {/* <OrbitControls /> */}
        <Environment files={"/peppermint_powerplant_1k.hdr"} />
      </Canvas>
    </animated.div>
  );
};

export default SphereCanvas;
