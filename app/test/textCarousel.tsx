import React, { useRef, useState } from "react";

import { DoubleSide, MathUtils, PlaneGeometry } from "three";
import { useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import useUsefulHooks from "@/app/hooks/useWheel";
import { pages, textTexture } from "../utils/pageData";
import { Shading } from "./shaderMat";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin();

export default function SpiralPlane({ current, setCurrent }: any) {
  const colorMap: any = useTexture(textTexture);
  const { prevPage, updateToFalse, nextPage, wheelOrArrow, deltaX, active } =
    useUsefulHooks();

  const groupRef: any = useRef();

  const [highNum, setHighNum] = useState(1);

  const [isChanged, setIsChanged] = useState(false);
  const [isBack, setIsBack] = useState(true);

  let offset: number = 1;
  let num = 0;

  console.log(deltaX);

  const calcPage = (value: any, start: any, key?: any) => {
    value = nextPage ? 56 + value : value - 56;
    gsap.fromTo(
      groupRef.current.position,
      { x: start },
      {
        onStart: () => {
          setIsChanged(true);
          setIsBack(false);
        },
        x: value,
        duration: 0.5,
        onComplete: () => {
          setCurrent(value);
          key && updateToFalse();
        },
      }
    );
  };

  const handleKeys = (isTrue: any, limit: any, value: any, start: any) => {
    console.log(isTrue);
    if (isTrue) {
      calcPage(limit, start, true);
    } else {
      gsap.to(groupRef.current.position, {
        x: current + value,
        onUpdate: () => {
          updateToFalse();
        },
        onComplete: () => {
          setCurrent(current + value);
        },
      });
    }
  };

  const nextPageWheel = (value = 4) => {
    if (deltaX > 50) {
      offset = Math.floor(deltaX / 20);
      setHighNum(offset);
    }
    if (offset > 1) {
      num = current - value * highNum;

      if (num < -48) {
        gsap.fromTo(
          groupRef.current.position,
          { x: current },
          {
            x: -52,
            onComplete: () => {
              calcPage(num, 4);
            },
          }
        );
      } else {
        gsap.fromTo(
          groupRef.current.position,
          {
            x: groupRef.current.position.x,
          },
          {
            onStart: () => {
              setIsChanged(true);
              setIsBack(false);
            },
            x: num,
            duration: 0.4,
            onComplete: () => {
              setCurrent(num);
              setHighNum(1);
            },
          }
        );
      }
    } else if (offset === 1) {
      num = groupRef.current.position.x - deltaX / 50;

      if (current - num > 1.4) {
        if (num < -52) {
          calcPage(-56, 4);
        } else {
          gsap.fromTo(
            groupRef.current.position,
            {
              x: groupRef.current.position.x,
            },
            {
              onStart: () => {
                setIsChanged(true);
                setIsBack(false);
              },
              x: current - value,
              duration: 0.4,
              onComplete: () => {
                setCurrent(current - value);
              },
            }
          );
        }
      } else if (!isChanged) {
        gsap.to(groupRef.current.position, {
          onStart: () => {
            setIsChanged(false);
            setIsBack(true);
          },
          x: num,
          duration: 0.2,
          onComplete: () => {},
        });
      }
    }
  };
  const prevPageWheel = (value = 4) => {
    if (deltaX < -50) {
      offset = Math.floor(deltaX / 20);
      setHighNum(offset);
    }
    if (offset > 1) {
      num = current - value * offset;
      if (num > 0) {
        gsap.fromTo(
          groupRef.current.position,
          { x: current },
          {
            x: 0,
            onComplete: () => {
              calcPage(num, -56);
            },
          }
        );
      } else {
        gsap.to(groupRef.current.position, {
          onStart: () => {
            setIsChanged(true);
            setIsBack(false);
          },
          x: num,
          duration: 0.4,
          onComplete: () => {
            setCurrent(num);
            setHighNum(1);
          },
        });
      }
    } else if (offset === 1) {
      num = groupRef.current.position.x - deltaX / 50;

      if (num - current > 1.4) {
        if (num > 0) {
          calcPage(value, -56);
        } else {
          gsap.to(groupRef.current.position, {
            onStart: () => {
              setIsChanged(true);
              setIsBack(false);
            },
            x: current + value,
            duration: 0.4,
            onComplete: () => {
              setCurrent(current + value);
            },
          });
        }
      } else if (!isChanged) {
        gsap.to(groupRef.current.position, {
          onStart: () => {
            setIsChanged(false);
            setIsBack(true);
          },
          x: num,
          duration: 0.2,
          onComplete: () => {},
        });
      }
    }
  };

  const bacToCurrent = () => {
    if (
      !active &&
      groupRef.current?.position.x % 4 > -3.9 &&
      groupRef.current?.position.x % 4 < 3.9 &&
      groupRef.current?.position.x % 4 !== 0 &&
      isBack
    ) {
      gsap.to(groupRef.current.position, {
        x: current,
        duration: 1,
      });
    }
  };

  useFrame(() => {
    if (active && deltaX === 0) return;
    if (wheelOrArrow === "arrow") {
      if (nextPage) {
        handleKeys(current <= -52, -56, -4, 4);
      } else if (prevPage) {
        handleKeys(current >= 0, 4, 4, -56);
      }
    }

    if (wheelOrArrow === "wheel") {
      if (
        groupRef.current?.position.x % 4 > -4 &&
        groupRef.current?.position.x % 4 < 4 &&
        !isChanged
      ) {
        bacToCurrent();
      }

      if (nextPage) {
        nextPageWheel();
      } else if (prevPage) {
        prevPageWheel();
      }
    }
  });

  return (
    <group position={[0, 0.1, 1.5]}>
      <group position={[0, 0, 0]} ref={groupRef}>
        {pages.map((data: any, index: number) => (
          <Mesh
            key={index}
            id={index}
            position={data.position}
            texture={colorMap[index]}
            xValue={current}
            isBack={isBack}
            setIsChanged={setIsChanged}
          ></Mesh>
        ))}
      </group>
    </group>
  );
}

const damp = MathUtils.damp;
const [x, y, lambda, dt] = [0, 0.05, 0.8, 0.2];

const Mesh = ({ position, texture, setIsChanged, isBack }: any) => {
  const geometry: any = new PlaneGeometry(2, 0.5, 20, 20);

  const { active } = useUsefulHooks();

  let shape: any = useRef();
  const shader: any = useRef();

  useFrame(() => {
    if (active) {
      shader.current.time += damp(x, y, lambda, dt);
    } else {
      if (shader.current.time > 0 && isBack) {
        shader.current.time -= damp(x, y, lambda, dt);
      } else {
        shader.current.time = 0;
        setIsChanged(false);
      }
    }
  });

  return (
    <mesh
      geometry={geometry}
      ref={shape}
      position={[position, 0, 0]}
      scale={1.4}
    >
      <shading
        ref={shader}
        time={0}
        texture1={texture}
        side={DoubleSide}
        toneMapped={false}
        transparent={true}
        opacity={1}
      ></shading>
    </mesh>
  );
};

extend({ Shading });
