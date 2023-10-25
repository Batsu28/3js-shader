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
    name: "firefly",
    title: "Image 2",
    imagePath: "/08-firefly.png",
    position: -21,
  },
  {
    name: "slinky",
    title: "Image 3",
    imagePath: "/09-slinky.png",
    position: -18,
  },
  {
    name: "t1000",
    title: "Image 3",
    imagePath: "/10-t1000.png",
    position: -15,
  },
  {
    name: "genesys",
    title: "Image 3",
    imagePath: "/11-genesys.png",
    position: -12,
  },
  {
    name: "protocool",
    title: "Image 3",
    imagePath: "/12-protocool.png",
    position: -9,
  },
  {
    name: "liquidity",
    title: "Image 3",
    imagePath: "/13-liquidity.png",
    position: -6,
  },
  {
    name: "lips",
    title: "Image 3",
    imagePath: "/14-lipsync.png",
    position: -3,
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
    position: 3,
  },

  {
    name: "cyberfly",
    title: "Image 3",
    imagePath: "/03-cyberfly.png",
    position: 6,
  },
  {
    name: "twistertoy",
    title: "Image 1",
    imagePath: "/04-twistertoy.png",
    position: 9,
  },
  {
    name: "fungible",
    title: "Image 2",
    imagePath: "/05-fungible.png",
    position: 12,
  },
  {
    name: "metalness",
    title: "Image 3",
    imagePath: "/06-metalness.png",
    position: 15,
  },
  {
    name: "metagum",
    title: "Image 1",
    imagePath: "/07-metagum.png",
    position: 18,
  },
];

export default function SpiralPlane({ setChange }: any) {
  const groupRef: any = useRef();
  const textTexture = [
    "/08-firefly.png",
    "/09-slinky.png",
    "/10-t1000.png",
    "/11-genesys.png",
    "/12-protocool.png",
    "/13-liquidity.png",
    "/14-lipsync.png",
    "/01-fomosphere.png",
    "/02-discobrain.png",
    "/03-cyberfly.png",
    "/04-twistertoy.png",
    "/05-fungible.png",
    "/06-metalness.png",
    "/07-metagum.png",
  ];
  const colorMap: any = useTexture(textTexture);

  let [current, setCurrent] = useState(0);

  const [curve, setCurve] = useState(0);
  const [isChanged, setIsChanged] = useState(false);
  const [back, setBack] = useState(false);
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

  // console.log(groupRef.current?.position.x);
  // console.log(Math.floor(121 / 120));

  const nextPageWheel = () => {
    if (deltaX > 120) {
      offset = Math.floor(deltaX / 120);
      if (highNum < offset) {
        setHighNum(offset);
      }
    }
    if (offset > 1) {
      if (offset >= highNum) {
        num = current - 3 * offset;
        if (num < -18) {
          calcNext(num - current);
        } else {
          gsap.to(groupRef.current.position, {
            onStart: () => {
              setBack(true);

              setIsChanged(true);
            },
            x: num,
            duration: 0.5,
            onComplete: () => {
              setCurrent(current - 3 * offset);
              setHighNum(1);
              setBack(false);

              // setIsChanged(true);
              // updateToFalse();
            },
          });
        }
      }
    } else {
      num = groupRef.current.position.x - 0.1;

      if (current - num > 1) {
        if (num < -18) {
          calcNext(-3);
        } else {
          gsap.to(groupRef.current.position, {
            onStart: () => {
              setBack(true);

              setIsChanged(true);
              setCurve(0.0053);
            },
            x: current - 3,
            duration: 0.5,
            onComplete: () => {
              setCurrent(current - 3);
              // setIsChanged(true);
              setBack(false);
            },
          });
        }
      } else if (!isChanged) {
        if (current - num > 0.5) {
          setCurve(0.0053);
        }

        gsap.to(groupRef.current.position, {
          onStart: () => {
            setIsChanged(false);
          },
          x: num,
          // delay: 0.01,
          duration: 0.5,
          onComplete: () => {},
        });
      }
    }
  };
  const calcNext = (num: any, key?: any) => {
    num = 24 + num;
    groupRef.current.position.x = 21;
    gsap.to(groupRef.current.position, {
      onStart: () => {
        setCurve(0.01);
        setBack(true);
      },
      x: num,
      duration: 0.5,
      onComplete: () => {
        setCurrent(num);
        setIsChanged(true);
        setBack(false);

        key && updateToFalse();
      },
    });
    // gsap.to(groupRef.current.position, {
    //   x: num,
    //   onComplete: () => {
    //     setCurrent(num);
    //   },
    // });
  };
  const changePageKey = (limit: number, change: number) => {
    if (current < limit) {
      calcNext(change, true);
    } else {
      gsap.to(groupRef.current.position, {
        x: current + change,
        onComplete: () => {
          setCurrent(current + change);
          updateToFalse();
        },
      });
    }
  };

  const prevPageWheel = () => {
    if (deltaX > 120) {
      offset = Math.floor(deltaX / 120);
      if (highNum < offset) {
        setHighNum(offset);
      }
    }
    if (offset > 1) {
      if (offset >= highNum) {
        num = current + 3 * offset;
        if (num < 21) {
          // calcNext(num + current);
        } else {
          gsap.to(groupRef.current.position, {
            onStart: () => {
              setBack(true);

              setIsChanged(true);
            },
            x: num,
            duration: 0.5,
            onComplete: () => {
              setCurrent(num);
              setHighNum(1);
              setBack(false);

              // setIsChanged(true);
              // updateToFalse();
            },
          });
        }
      }
    } else {
      num = groupRef.current.position.x + 0.1;

      if (num - current > 1) {
        if (num > 21) {
          // calcNext(3);
        } else {
          gsap.to(groupRef.current.position, {
            onStart: () => {
              setBack(true);

              setIsChanged(true);
              setCurve(0.0053);
            },
            x: current + 3,
            duration: 0.5,
            onComplete: () => {
              setCurrent(current + 3);
              // setIsChanged(true);
              setBack(false);
            },
          });
        }
      } else if (!isChanged) {
        if (num - current > 0.5) {
          setCurve(0.0053);
        }

        gsap.to(groupRef.current.position, {
          onStart: () => {
            setIsChanged(false);
          },
          x: num,
          // delay: 0.01,
          duration: 0.5,
          onComplete: () => {},
        });
      }
    }
  };
  const calcPrev = () => {
    gsap.to(groupRef.current.position, {
      x: 21,
      onComplete: () => {
        setCurrent(21);
      },
    });
  };

  const bacToCurrent = () => {
    if (!active && wheelOrArrow === "wheel") {
      gsap.to(groupRef.current.position, {
        onStart: () => {
          setIsChanged(false);
        },
        x: current,
        duration: 1,
        onComplete: () => {
          setBack(false);
          // setIsChanged(false);
        },
      });
    }
  };

  useFrame(() => {
    if (wheelOrArrow === "arrow") {
      if (nextPage) {
        changePageKey(-15, -3);
      }
      // else if (prevPage) {
      //   changePageKey(18, 3);
      // }
    }

    if (wheelOrArrow === "wheel") {
      if (groupRef.ref?.position.x % 3 !== 0 && !back) {
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

const M = ({
  position,
  texture,
  xValue,
  curve,
  setIsChanged,
  isChanged,
}: any) => {
  const { viewport } = useThree();
  const geometry: any = new PlaneGeometry(2, 0.5, 20, 20);

  const { active } = useUsefulHooks();

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
      shader.current.time += curve;
    } else {
      if (shader.current.time > 0 && !isChanged) {
        shader.current.time -= curve;
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
        gl_FragColor = textureColor; // Set the color as needed
    }
  `
);

extend({ Shading });
