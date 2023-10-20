import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide, MathUtils, PlaneGeometry, Vector3 } from "three";
import { a, useSpring } from "@react-spring/three";
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
    position: -28,
  },
  {
    name: "slinky",
    title: "Image 3",
    imagePath: "/09-slinky.png",
    position: -24,
  },
  {
    name: "t1000",
    title: "Image 3",
    imagePath: "/10-t1000.png",
    position: -20,
  },
  {
    name: "genesys",
    title: "Image 3",
    imagePath: "/11-genesys.png",
    position: -16,
  },
  {
    name: "protocool",
    title: "Image 3",
    imagePath: "/12-protocool.png",
    position: -12,
  },
  {
    name: "liquidity",
    title: "Image 3",
    imagePath: "/13-liquidity.png",
    position: -8,
  },
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

  let num = 0;
  const [current, setCurrent] = useState(0);

  const { prevPage, updateToFalse, nextPage, lastAction, deltaX, active } =
    useUsefulHooks();
  useEffect(() => {
    // console.log(active);

    if (active) {
      num = groupRef.current.position.x - 0.7;
      // console.log(num - current);
      // if (deltaX > 1) {
      //   gsap.to(groupRef.current.position, {
      //     x: current - 4 * deltaX,
      //     duration: 0.5,
      //     onComplete: () => {
      //       setCurrent(current - 4 * deltaX);
      //     },
      //   });
      // } else {
      if (current - num > 1.4) {
        if (deltaX > 1) {
          gsap.to(groupRef.current.position, {
            x: current - 4 * deltaX,
            duration: 0.5,
            onComplete: () => {
              setCurrent(current - 4 * deltaX);
            },
          });
        } else {
          gsap.to(groupRef.current.position, {
            x: current - 4,
            duration: 0.5,
            onComplete: () => {
              setCurrent(current - 4);
            },
          });
        }
      } else {
        gsap.to(groupRef.current.position, {
          x: num,

          onComplete: () => {
            setCurrent(current);
          },
        });
        // }
      }
    } else {
      gsap.to(groupRef.current.position, {
        x: current,
      });
    }
  });

  return (
    <group position={[0, 0.1, 1.5]}>
      <a.group position={[0, 0, 0]} ref={groupRef}>
        {pages.map((data: any, index: number) => (
          <M
            key={index}
            position={data.position}
            texture={colorMap[index]}
            name={data.name}
            id={index}
          ></M>
        ))}
      </a.group>
    </group>
  );
}

const M = ({ id, position, texture }: any) => {
  const { viewport } = useThree();
  const geometry: any = new PlaneGeometry(2, 0.5, 20, 20);

  let shape: any = useRef();
  const shader: any = useRef();

  useFrame((state, delta) => {
    // shader.current.time = MathUtils.lerp(shader.current.time, 0.5, 0.04);
    shader.current.time = 0;
  });

  return (
    <mesh key={id} geometry={geometry} ref={shape} position={[position, 0, 0]}>
      <shading
        ref={shader}
        time={0}
        texture1={texture}
        side={DoubleSide}
        toneMapped={false}
        heightFactor={viewport.width * 0.04}
        transparent={true}
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
  },
  // vertexShader
  /*glsl*/ `
        // uniform float time;
        uniform float time;
        uniform float heightFactor;
        // varying vec2 vUv;
        varying vec2 vUv;

        #define M_PI 3.1415926538
    
        vec3 rotateAxis(vec3 p, vec3 axis, float angle) {
            return mix(dot(axis, p)*axis, p, cos(angle)) + cross(axis,p)*sin(angle);
        }
    
        void main() {
            vec3 pos = position;
    
            float progress = clamp(time, 0.0, 1.0);
    
            // TWIRL
            float twistAmount = M_PI * 2.;
            float direction = sign(cos(M_PI * progress));
    
            float twirlPeriod = sin(progress * M_PI*2.);
    
            float rotateAngle = -direction * pow(sin(progress * M_PI), 1.5) * twistAmount;
            float twirlAngle = -sin(uv.x -.5) * pow(twirlPeriod, 2.0) * -6.;
            pos = rotateAxis(pos, vec3(1., 0., 0.), rotateAngle + twirlAngle);
    
    
            // SCALE on the sides
            // float scale = pow(abs(cos(time * M_PI)), 2.0) * .33;
            // pos *= 1. - scale;
            // pos.y -= scale * heightFactor * 0.35;
            // pos.x += cos(time * M_PI) * -.02;
    
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                        vUv = uv;

        }
  `,

  // fragment shader
  /*glsl*/ `
    uniform float time;
    uniform sampler2D texture1;
    varying vec2 vUv;

    void main() {
        vec2 cuv = vUv;
        vec4 textureColor = texture2D(texture1, cuv);
        // gl_FragColor = vec4(textureColor.rgb, 0.5); // Set the alpha (opacity) to 0.5
        gl_FragColor = textureColor; // Set the color as needed
    }
  `
);

extend({ Shading });
