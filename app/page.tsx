"use client";
import { useState } from "react";
import SphereCanvas from "./canvas/sphereCanvas";
import Test from "./test";
import Vr from "./vr";

const Home = () => {
  const [current, setCurrent] = useState(2);
  return (
    <main className="w-full h-screen relative ">
      <SphereCanvas current={current} setCurrent={setCurrent} />
      <div className="flex justify-between z-10 absolute w-full top-0 left-0 p-10">
        <h3>Blobmixer</h3>
        <div className="flex items-center gap-2 text-transparent hover:text-white">
          <h3 className="text-white headerBtn">Try in VR</h3>
          <Vr />
        </div>
        <h3 className="headerBtn">About</h3>
      </div>

      <Test current={current} />
    </main>
  );
};

export default Home;
