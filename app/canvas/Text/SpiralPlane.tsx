import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";

import { motion } from "framer-motion-3d";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; // Import the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin
// console.log(ScrollTrigger);

import React, { useEffect, useRef, useState } from "react";
import { DoubleSide, MathUtils, PlaneGeometry } from "three";

import useWheel from "@/app/hooks/useWheel";
import useBlob from "@/app/hooks/useBlob";
import useUsefulHooks from "@/app/hooks/useWheel";
import { update } from "@react-spring/core";
import { pages as pagex } from "./data";
import page from "@/app/page";

gsap.registerPlugin();
export default function SpiralPlane({ setChange }: any) {
  const { prevPage, updateToFalse, nextPage, lastAction }: any =
    useUsefulHooks();
  const [pages, setPages] = useState<any>([
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
  ]);
  useEffect(() => {
    if (lastAction) {
      const updatedPages = pages.map((page: any) => ({
        ...page,
        position: page.position === -28 ? 24 : page.position - 4,
      }));
      setPages(updatedPages);
    }
  }, [nextPage]);

  useEffect(() => {
    if (lastAction) {
      const updatedPages = pages.map((page: any) => ({
        ...page,
        position: page.position === 24 ? -28 : page.position + 4,
      }));
      setPages(updatedPages);
    }
  }, [prevPage]);

  // console.log(pages);
  return (
    <>
      <group position={[0, 0.1, 1.5]}>
        {pages.map((data: any, index: number) => (
          <M
            key={index}
            position={pagex[index].position}
            texture={data.imagePath}
            name={data.name}
            id={index}
            nextPage={nextPage}
            prevPage={prevPage}
            pageToFalse={() => updateToFalse()}
            page={pages[index]}
          ></M>
        ))}
      </group>
    </>
  );
}

const M = ({
  id,
  name,
  position,
  texture,
  pageToFalse,
  setChange,
  page,
}: any) => {
  // console.log(nextPage);
  const { viewport } = useThree();
  const [colorMap] = useTexture([texture]);
  // const { setChange } = useBlob();
  const {
    prevPage,
    updateToFalse,
    nextPage,
    lastAction,
    deltaX,
    wheelOrArrow,
  }: any = useUsefulHooks();

  const geometry: any = new PlaneGeometry(2, 0.5, 20, 20);

  let shape: any = useRef();
  const shader: any = useRef();

  geometry.computeBoundingBox();
  useFrame((state, delta) => {
    if (wheelOrArrow === "arrow") {
      shader.current.time = MathUtils.lerp(shader.current.time, 0.5, 0.04);
    }
  });
  useEffect(() => {
    if (wheelOrArrow === "arrow") {
      shader.current.time = 0;
    }
    console.log(wheelOrArrow);
    if (lastAction) {
      if (page.position >= -8 && page.position <= 8) {
        if (lastAction === "next") {
          gsap.to(shape.current.position, {
            x: page.position,
            duration: 2,
          });
        } else if (lastAction === "prev") {
          gsap.to(shape.current.position, {
            x: page.position,
            duration: 2,
          });
        }
      } else {
        if (lastAction === "next") {
          shape.current.position.x =
            page.position === -28 ? 24 : page.position - 4;
        } else if (lastAction === "prev") {
          shape.current.position.x =
            page.position === 24 ? -28 : page.position + 4;
        }
      }
    }
    // snapX: (lerp) =>
    // set((state) => {
    //   const targetX = MathUtils.lerp(
    //     state.targetX,
    //     state.currentPageX + state.textParallax,
    //     lerp
    //   )
    //   state.updateTargetX(targetX)
    // }),
  }, [page]);
  useEffect(() => {
    console.log(deltaX);
    if (page.position >= -8 && page.position <= 8) {
      if (deltaX < 0) {
        shape.current.position.x += 0.01;
        shader.current.time += 0.004;
      } else if (deltaX > 0) {
        shape.current.position.x -= 0.01;
        shader.current.time += 0.004;
      } else {
        shape.current.position.x = page.position;
        shader.current.time = 0;
      }
    }
  }, [deltaX]);
  return (
    <motion.mesh
      // whileHover={{ scale: 1.1 }}
      key={id}
      geometry={geometry}
      ref={shape}
      position={[position, 0, 0]}
    >
      <shading
        ref={shader}
        time={0}
        uMin={geometry.boundingBox.min}
        uMax={geometry.boundingBox.max}
        texture1={colorMap}
        side={DoubleSide}
        toneMapped={false}
        heightFactor={viewport.width * 0.04}
        transparent={true}
      ></shading>
    </motion.mesh>
  );
};

const Shading = shaderMaterial(
  {
    time: 0,
    amplitude: 0.1,
    frequency: 0.0,
    uMin: null,
    uMax: null,
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

// const Shading = shaderMaterial(
//   {
//     time: 0,
//     amplitude: 0.1,
//     frequency: 0.0,
//     uMin: null,
//     uMax: null,
//     texture1: null,
//     shaper: false,
//   },
//   // vertexShader
//   /*glsl*/ `
//     uniform float time;
//     uniform float amplitude;
//     uniform float frequency;
//     uniform vec3 uMin;
//     uniform vec3 uMax;
//     uniform bool shaper;
//     varying vec2 vUv; // Added missing vUv
//   #define M_PI 3.1415926535897932384626433832795

//     float map(float value, float min1, float max1, float min2, float max2) {
//         return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
//     }

//     mat2 rotate(float a) {
//         float s = sin(a);
//         float c = cos(a);
//         return mat2(c, -s, s, c);
//     }

//     void main() {
//       vec3 newPosition = position;
//         float theta = map(position.x, -3.0, 10.0 - time, -M_PI, M_PI);
//         newPosition.yz = rotate(theta) * newPosition.yz * 0.5 ;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//         vUv = uv;
//     }
//   `,

//   // fragment shader
//   /*glsl*/ `
//     uniform float time;
//     uniform sampler2D texture1;
//     varying vec2 vUv;

//     void main() {
//         vec2 cuv = vUv;
//         vec4 textureColor = texture2D(texture1, cuv);
//         // gl_FragColor = vec4(textureColor.rgb, 0.5); // Set the alpha (opacity) to 0.5
//         gl_FragColor = textureColor; // Set the color as needed
//     }
//   `
// );
extend({ Shading }); // Fixed the extend name
