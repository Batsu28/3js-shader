import {
  useState,
  memo,
  useEffect,
  useRef,
  forwardRef,
  useCallback,
} from "react";
import { Text, shaderMaterial } from "@react-three/drei";
import { MathUtils, Color, DoubleSide, FrontSide } from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { Titles } from "@/app/utils/blobSettings";

const uniforms = {
  time: { value: 0 },
  color: { value: new Color(1, 1, 1) },
  opacity: { value: 1 },
  fulltime: { value: 0 },
  heightFactor: { value: 1 },
};

const vertexShader = /*glsl*/ `
    uniform float fulltime;
    uniform float heightFactor;
  
    #define M_PI 3.1415926538
  
    vec3 rotateAxis(vec3 p, vec3 axis, float angle) {
        return mix(dot(axis, p)*axis, p, cos(angle)) + cross(axis,p)*sin(angle);
    }
  
    void main() {
        vec3 pos = position;
  
        float progress = clamp(fulltime, 0.0, 1.0);
  
        float twistAmount = M_PI * 2.;
        float direction = sign(cos(M_PI * progress));
    
        float twirlPeriod = sin(progress * M_PI*2.);
    
        float rotateAngle = -direction * pow(sin(progress * M_PI), 1.5) * twistAmount;
        float twirlAngle = -sin(uv.x -.5) * pow(twirlPeriod, 2.0) * -4.;
        pos = rotateAxis(pos, vec3(1., 0., 0.), rotateAngle + twirlAngle);
    
    
        float scale = pow(abs(cos(fulltime * M_PI)), 2.0) * .33;
        pos *= 1. - scale;
        pos.y -= scale * 0.35;
        pos.x += cos(fulltime * M_PI) * -.02;
    
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

const fragmentShader = /*glsl*/ `
    uniform float fulltime;
    uniform vec3 color;
    uniform float opacity;

    #define M_PI 3.1415926538

    void main() {
        gl_FragColor.rgba = vec4(color, max(sin((fulltime)*M_PI), 0.2) * opacity);
}`;

const TextCarousel = ({ num }: { num: number }) => {
  const { viewport, size } = useThree();
  const text = useRef<any>();
  const [textMat, setTextMat] = useState();
  const [y, title, page, standalone, enabled]: any = [
    0,
    Titles[num],
    0,
    true,
    true,
  ];

  const blobs = Titles;

  const local = useRef({}).current;

  useFrame(({ clock }) => {
    if (text.current) {
      text.current.material.opacity = MathUtils.lerp(
        text.current.material.opacity,
        enabled ? 1 : 0,
        enabled ? 0.05 : 0.2
      );
      text.current.material.heightFactor += clock.getElapsedTime();
    }
  });

  const isPortrait = size.height > size.width;
  // const isVR = useUIStore((s) => s.isVR)

  return (
    <mesh ref={text} position={[0 + 5 * num, 0, 0]} rotation={[0, 0, 0]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
      <Text ref={text} color={"white"} letterSpacing={-0.06} renderOrder={10}>
        {title}
      </Text>
    </mesh>
  );
};

export default TextCarousel;
