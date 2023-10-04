import React, { useState, useEffect, useRef } from "react";
import { useGesture } from "@use-gesture/react";
import { useSpring } from "@react-spring/web";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  RenderTexture,
  Text,
  shaderMaterial,
} from "@react-three/drei";

// **Shader**
const VertexShader = `
  uniform float time;
  varying vec3 vPosition;

  void main() {
    vPosition = position;
    float twist = sin(time * 0.5) * 0.1;
    float rotation = vPosition.x * twist;
    vPosition.x = vPosition.x * cos(rotation) - vPosition.z * sin(rotation);
    vPosition.z = vPosition.z * cos(rotation) + vPosition.x * sin(rotation);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
  }
`;
const FragmentShader = `
  uniform float time;
  varying vec3 vPosition;

  void main() {
    gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
  }
`;

const uniform = {
  time: { value: 0 },
};

const TextCarousel = () => {
  const [texts, setTexts] = useState(["Title 1", "Title 2", "Title 3"]);

  const textRef = useRef<any>();
  const groupRef = useRef<any>(null); // Create a group for the text
  const [{ scrollPosition }, api] = useSpring(() => ({
    scrollPosition: 0,
  }));

  useFrame(({ clock }) => {
    // groupRef.current.material.uniforms.time.value = clock.elapsedTime;
    // groupRef.current.rotation.y = scrollPosition;
    textRef.current.position.x = Math.cos(clock.elapsedTime) * 5;
  });

  useGesture({
    onScroll: (event) => {
      api.start({
        scrollPosition: Number(scrollPosition) + event.delta[1] * 0.001,
      });
    },
  });

  return (
    <mesh ref={groupRef}>
      <planeGeometry />
      {/* <meshBasicMaterial /> */}
      <shaderMaterial
        vertexShader={VertexShader}
        uniforms={uniform}
        fragmentShader={FragmentShader}
      />
      <RenderTexture attach="map" anisotropy={2}>
        <PerspectiveCamera
          makeDefault
          manual
          aspect={1 / 1}
          position={[0, 0, 5]}
        />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Text
          ref={textRef}
          fontSize={2}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          'hi'
        </Text>
      </RenderTexture>
    </mesh>
  );
};

export default TextCarousel;
