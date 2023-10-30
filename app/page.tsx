"use client";
import { useRef, useState } from "react";
import SphereCanvas from "./canvas/sphereCanvas";
import Overlay from "./overlay";

const Home = () => {
  let [current, setCurrent] = useState(0);

  return (
    <main className="w-full h-screen relative " id="main">
      <SphereCanvas current={current} setCurrent={setCurrent} />
      <Overlay current={current} />
    </main>
  );
};

export default Home;
