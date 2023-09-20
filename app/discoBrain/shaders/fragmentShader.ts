const FragmentShader = /*glsl*/ `
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec2 uv = vUv; 
    uv.y += uTime/50.;

    gl_FragColor = vec4(vec3(step(0.5, fract((uv.y * 31.0)))), 0.1);
}
`;

export default FragmentShader;
