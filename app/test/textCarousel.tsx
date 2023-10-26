import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide, MathUtils, PlaneGeometry, Vector3 } from "three";
import useUsefulHooks from "@/app/hooks/useWheel";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin
gsap.registerPlugin();

const pages = [
  {
    name: "lips",
    title: "Image 3",
    imagePath: "/14-lipsync.png",
    position: -4,
  },
  {
    name: "fomosphere",
    title: "Image 1",
    imagePath: "/01-fomosphere.png",
    position: 0,
  },
  {
    name: "disco",
    title: "Image 2",
    imagePath: "/02-discobrain.png",
    position: 4,
  },

  {
    name: "cyberfly",
    title: "Image 3",
    imagePath: "/03-cyberfly.png",
    position: 8,
  },
  {
    name: "twistertoy",
    title: "Image 1",
    imagePath: "/04-twistertoy.png",
    position: 12,
  },
  {
    name: "fungible",
    title: "Image 2",
    imagePath: "/05-fungible.png",
    position: 16,
  },
  {
    name: "metalness",
    title: "Image 3",
    imagePath: "/06-metalness.png",
    position: 20,
  },
  {
    name: "metagum",
    title: "Image 1",
    imagePath: "/07-metagum.png",
    position: 24,
  },
  {
    name: "firefly",
    title: "Image 2",
    imagePath: "/08-firefly.png",
    position: 28,
  },
  {
    name: "slinky",
    title: "Image 3",
    imagePath: "/09-slinky.png",
    position: 32,
  },
  {
    name: "t1000",
    title: "Image 3",
    imagePath: "/10-t1000.png",
    position: 36,
  },
  {
    name: "genesys",
    title: "Image 3",
    imagePath: "/11-genesys.png",
    position: 40,
  },
  {
    name: "protocool",
    title: "Image 3",
    imagePath: "/12-protocool.png",
    position: 44,
  },
  {
    name: "liquidity",
    title: "Image 3",
    imagePath: "/13-liquidity.png",
    position: 48,
  },
  {
    name: "lips",
    title: "Image 3",
    imagePath: "/14-lipsync.png",
    position: 52,
  },
  {
    name: "fomosphere",
    title: "Image 1",
    imagePath: "/01-fomosphere.png",
    position: 56,
  },
];
export default function SpiralPlane({ setChange }: any) {
  const groupRef: any = useRef();
  const textTexture = [
    "/14-lipsync.png",
    "/01-fomosphere.png",
    "/02-discobrain.png",
    "/03-cyberfly.png",
    "/04-twistertoy.png",
    "/05-fungible.png",
    "/06-metalness.png",
    "/07-metagum.png",
    "/08-firefly.png",
    "/09-slinky.png",
    "/10-t1000.png",
    "/11-genesys.png",
    "/12-protocool.png",
    "/13-liquidity.png",
    "/14-lipsync.png",
    "/01-fomosphere.png",
  ];
  const colorMap: any = useTexture(textTexture);

  let [current, setCurrent] = useState(0);

  const [curve, setCurve] = useState(0.0053);
  const [isChanged, setIsChanged] = useState(false);
  const [highNum, setHighNum] = useState(1);

  const {
    prevPage,
    updateToFalse,
    nextPage,
    lastAction,
    wheelOrArrow,
    deltaX,
    active,
  } = useUsefulHooks();

  let offset: number = 1;
  let num = 0;
  //next
  const calcNext = (value: any, key?: any) => {
    value = 56 + value;
    gsap.fromTo(
      groupRef.current.position,
      { x: 4 },
      {
        onStart: () => {
          setIsChanged(true);
        },
        x: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrent(value);
          key && updateToFalse();
        },
      }
    );
  };
  const nextPageWheel = () => {
    if (deltaX > 100) {
      offset = Math.floor(deltaX / 100);
      if (offset > highNum) {
        setHighNum(offset);
      }
    }
    if (offset > 1 && offset >= highNum) {
      num = current - 4 * highNum;

      if (num < -48) {
        gsap.fromTo(
          groupRef.current.position,
          { x: current },
          {
            x: -52,
            onComplete: () => {
              calcNext(num);
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
            },
            // onInterrupt: () => {
            //   setCurrent(current);
            // },
            x: num,
            duration: 0.5,
            onComplete: () => {
              setCurrent(num);
              setHighNum(1);
            },
          }
        );
      }
    } else if (offset === 1) {
      num = groupRef.current.position.x - deltaX / 100;

      if (current - num > 1.4) {
        if (num < -52) {
          calcNext(-56);
        } else {
          gsap.fromTo(
            groupRef.current.position,
            {
              x: groupRef.current.position.x,
            },
            {
              onStart: () => {
                setIsChanged(true);
              },
              x: current - 4,
              duration: 0.4,
              onInterrupt: () => {
                setCurrent(current);
              },
              onComplete: () => {
                setCurrent(current - 4);
              },
            }
          );
        }
      } else if (!isChanged) {
        gsap.to(groupRef.current.position, {
          onStart: () => {
            setIsChanged(false);
          },
          onInterrupt: () => {
            setCurrent(current);
          },
          x: num,
          duration: 0.2,
          onComplete: () => {},
        });
      }
    }
  };
  const nextPageKey = () => {
    if (current < -48) {
      calcNext(-56, true);
    } else {
      gsap.to(groupRef.current.position, {
        x: current - 4,
        onUpdate: () => {
          updateToFalse();
        },
        onComplete: () => {
          setCurrent(current - 4);
        },
      });
    }
  };

  //prev
  const calcPrev = (value: any, key?: any) => {
    value = value - 56;
    gsap.fromTo(
      groupRef.current.position,
      { x: -56 },
      {
        onStart: () => {
          setIsChanged(true);
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
  const prevPageWheel = () => {
    if (deltaX > 100) {
      offset = Math.floor(deltaX / 100);
      if (offset > highNum) {
        setHighNum(offset);
      }
    }
    if (offset > 1 && offset >= highNum) {
      num = current + 4 * offset;
      if (num > 0) {
        gsap.fromTo(
          groupRef.current.position,
          { x: current },
          {
            x: 0,
            onComplete: () => {
              calcPrev(num);
            },
          }
        );
      } else {
        gsap.to(groupRef.current.position, {
          onStart: () => {
            setIsChanged(true);
          },
          x: num,
          duration: 0.5,
          onComplete: () => {
            setCurrent(num);
            setHighNum(1);
          },
        });
      }
    } else if (offset === 1) {
      num = groupRef.current.position.x + deltaX / 100;

      if (num - current > 1.4) {
        if (num > 0) {
          calcPrev(4);
        } else {
          gsap.to(groupRef.current.position, {
            onStart: () => {
              setIsChanged(true);
            },
            x: current + 4,
            duration: 0.4,
            onComplete: () => {
              setCurrent(current + 4);
            },
          });
        }
      } else if (!isChanged) {
        gsap.to(groupRef.current.position, {
          onStart: () => {
            setIsChanged(false);
          },
          x: num,
          duration: 0.2,
          onComplete: () => {},
        });
      }
    }
  };
  const prevPageKey = () => {
    if (current >= 0) {
      calcPrev(4, true);
    } else {
      gsap.to(groupRef.current.position, {
        x: current + 4,
        onUpdate: () => {
          updateToFalse();
        },
        onComplete: () => {
          setCurrent(current + 4);
        },
      });
    }
  };

  //back
  const bacToCurrent = () => {
    if (!active) {
      // console.log("working");
      gsap.to(groupRef.current.position, {
        onStart: () => {
          setIsChanged(false);
        },
        x: current,
        duration: 1,
        onComplete: () => {
          // setIsChanged(false);
        },
      });
    }
  };

  useFrame(() => {
    if (active && deltaX === 0) return;
    if (wheelOrArrow === "arrow") {
      if (nextPage) {
        nextPageKey();
      } else if (prevPage) {
        prevPageKey();
      }
    }

    if (wheelOrArrow === "wheel") {
      // if (!back) {
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
          <M
            key={index}
            position={data.position}
            texture={colorMap[index]}
            xValue={current}
            curve={curve}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
          ></M>
        ))}
      </group>
    </group>
  );
}

const damp = MathUtils.damp;

const M = ({ position, texture, setIsChanged, isChanged }: any) => {
  const { viewport } = useThree();
  const geometry: any = new PlaneGeometry(2, 0.5, 20, 20);

  const { active, lastAction, nextPage } = useUsefulHooks();

  let shape: any = useRef();
  const shader: any = useRef();

  useFrame((state, delta) => {
    // if (shape.current) {
    //   shader.current.opacity = 1;

    //   gsap.to(shape.current.scale, {
    //     x: 1.4,
    //     y: 1.4,
    //   });

    //   if (Math.abs(shape.current.position.x) !== Math.abs(xValue)) {
    //     shader.current.opacity = 1;

    //     gsap.to(shape.current.scale, {
    //       x: 0.8,
    //       y: 0.8,
    //     });
    //   }
    // }
    if (active) {
      nextPage
        ? (shader.current.time += damp(0, 0.1, 0.5, 0.12))
        : (shader.current.time -= damp(0, 0.1, 0.5, 0.12));
    } else {
      if (shader.current.time > 0 && !isChanged) {
        lastAction == "next"
          ? (shader.current.time -= damp(0, 0.1, 0.5, 0.12))
          : (shader.current.time += damp(0, 0.1, 0.5, 0.12));
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
        heightFactor={viewport.width * 0.04}
        transparent={true}
        uActive={active}
        opacity={1}
      ></shading>
    </mesh>
  );
};

const Shading = shaderMaterial(
  {
    time: 0,
    amplitude: 0.1,
    frequency: 0.0,
    texture1: null,
    shaper: false,
    heightFactor: 1,
    opacity: 1,
    uActive: false,
  },
  // vertexShader
  /*glsl*/ `
        // uniform float time;
        uniform float time;
        uniform float heightFactor;
        uniform bool uActive;

        // varying vec2 vUv;
        varying vec2 vUv;

        #define M_PI 3.1415926538
    
        vec3 rotateAxis(vec3 p, vec3 axis, float angle) {
            return mix(dot(axis, p)*axis, p, cos(angle)) + cross(axis,p)*sin(angle);
        }
    
        void main() {
            vec3 pos = position;
    
            float progress = clamp(time, 0.0, 1.0);
    
            float twistAmount = M_PI * 2.;
            float direction = sign(cos(M_PI * progress));
    
            float twirlPeriod = sin(progress * M_PI * 2.);

            float rotateAngle = -direction * pow(sin(progress * M_PI), 1.5) * twistAmount;
            float twirlAngle = -sin(uv.x - .1) * pow(twirlPeriod, 2.0) * -6.;
            pos = rotateAxis(pos, vec3(1., 0., 0.), rotateAngle + twirlAngle);
    
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                        vUv = uv;

        }
  `,

  // fragment shader
  /*glsl*/ `
    uniform float time;
    uniform float opacity;
    uniform sampler2D texture1;
    varying vec2 vUv;

    void main() {
        vec2 cuv = vUv;
        vec4 textureColor = texture2D(texture1, cuv ) * opacity;
        gl_FragColor = textureColor; 
    }
  `
);

extend({ Shading });
