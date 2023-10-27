import { shaderMaterial } from "@react-three/drei";

export const Shading = shaderMaterial(
  {
    time: 0,
    texture1: null,
    opacity: 1,
  },
  // vertexShader
  /*glsl*/ `
          // uniform float time;
          uniform float time;
  
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
              float twirlAngle = -sin(uv.x - .1) * pow(twirlPeriod, 2.0) * -4.;
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
