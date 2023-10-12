import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";

import { motion } from "framer-motion-3d";
import gsap from "gsap";
import { pages } from "./data";
import React, { useEffect, useRef, useState } from "react";
import { DoubleSide, MathUtils, PlaneGeometry } from "three";

import useWheel from "@/app/hooks/useWheel";
import useBlob from "@/app/hooks/useBlob";
import useUsefulHooks from "@/app/hooks/useWheel";
import { update } from "@react-spring/core";

gsap.registerPlugin();

export default function SpiralPlane({ setChange }: any) {
  const { prevPage, updateToFalse, nextPage }: any = useUsefulHooks();
  return (
    <>
      <group position={[0, 0.1, 1.5]}>
        {pages.map((data: any, index: number) => (
          <M
            key={index}
            position={data.position}
            texture={data.imagePath}
            name={data.name}
            id={index}
            nextPage={nextPage}
            prevPage={prevPage}
            pageToFalse={() => updateToFalse()}
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
  nextPage,
  prevPage,
  pageToFalse,
  setChange,
}: any) => {
  // console.log(nextPage);
  const { viewport } = useThree();
  const [colorMap] = useTexture([texture]);
  // const { setChange } = useBlob();

  const geometry: any = new PlaneGeometry(2, 0.5, 20, 20);

  const shape: any = useRef();
  const shader: any = useRef();

  geometry.computeBoundingBox();
  useFrame((state, delta) => {
    if (nextPage || prevPage) {
      shader.current.time = MathUtils.lerp(shader.current.time, 0.5, 0.04);
    }
  });
  useEffect(() => {
    shader.current.time = 0.0;
    if (nextPage) {
      gsap.to(shape.current.position, {
        x: shape.current.position.x - 4,
        duration: 2,
        onComplete: () => {
          pageToFalse();
          shader.current.time = 0.0;

          if (shape.current.position.x === -12) {
            shape.current.position.x = 44;
          }
          // console.log(shape.current.position.x);
        },
      });
    } else if (prevPage) {
      gsap.to(shape.current.position, {
        x: shape.current.position.x + 4,
        duration: 2,
        onComplete: () => {
          pageToFalse();
          shader.current.time = 0.0;
          if (shape.current.position.x === 48) {
            shape.current.position.x = -8;
          }
        },
      });
    }
  }, [nextPage, prevPage]);
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
            float twirlAngle = -sin(uv.x -.5) * pow(twirlPeriod, 2.0) * -4.;
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
