const VertexShader = /*glsl*/ `

varying vec2 vUv;
varying float vRandom;
attribute float aRandom;
uniform vec3 randomFactors;  
uniform float uTime;

void main() {
  // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // modelPosition.z += aRandom * randomFactors.x * sin(uTime) / 1.0;

  // vec4 viewPosition = viewMatrix * modelPosition;
  // vec4 projectedPosition = projectionMatrix * viewPosition;

  // gl_Position = projectedPosition;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
  vRandom = aRandom;
}
`;

export default VertexShader;
