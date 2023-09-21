const FragmentShader = /*glsl*/ `
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPattern;

uniform vec2 uResolution;
uniform float uTime;
uniform float uDisplace;
uniform float uSpread;
uniform float uNoise;

#define PI 3.14159265358979
#define MOD3 vec3(.1031,.11369,.13787)

vec3 hash33(vec3 p3) {
	p3 = fract(p3 * MOD3);
    p3 += dot(p3, p3.yxz+19.19);
    return -1.0 + 2.0 * fract(vec3(((p3.y+p3.z)*p3.x, (p3.x+p3.z)*p3.y, p3.x + p3.y)*p3.z));
}

float pnoise(vec3 p) {
    vec3 pi = floor(p);
    vec3 pf = p - pi;
    vec3 w = pf * pf * (3. - 2.0 * pf);
    return 	mix(
        		mix(
                	mix(dot(pf - vec3(0, 0, 0), hash33(pi + vec3(0, 0, 0))),
                        dot(pf - vec3(1, 0, 0), hash33(pi + vec3(1, 0, 0))),
                       	w.x),
                	mix(dot(pf - vec3(0, 0, 1), hash33(pi + vec3(0, 0, 1))),
                        dot(pf - vec3(1, 0, 1), hash33(pi + vec3(1, 0, 1))),
                       	w.x),
                	w.z),
        		mix(
                    mix(dot(pf - vec3(0, 1, 0), hash33(pi + vec3(0, 1, 0))),
                        dot(pf - vec3(1, 1, 0), hash33(pi + vec3(1, 1, 0))),
                       	w.x),
                   	mix(dot(pf - vec3(0, 1, 1), hash33(pi + vec3(0, 1, 1))),
                        dot(pf - vec3(1, 1, 1), hash33(pi + vec3(1, 1, 1))),
                       	w.x),
                	w.z),
    			w.y);
}

void main() {
    float pat = pnoise(vec3(vUv * uNoise , sin(uTime / 2.) * 1.4 )) * uDisplace ;
    float proximity = abs(vUv.x - (.5 + sin(uTime)/(12. * uSpread ) ));

    vec3 full = pat * vec3(clamp(.23 * uSpread  - proximity , 0.5, 1.));
    vec3 newPosition = vPosition + vNormal * full; 
    vec3 purpleColor = vec3(0.898, 0.0039, 0.0314) + vec3(0.8941, 0.0941, 0.051);
    vec3 color = -vec3(pnoise(vec3(1. - newPosition * 10. ))*40.) * (.01 -full) * purpleColor;
  gl_FragColor = vec4(color , 1.);
//   gl_FragColor = vec4(0.,1.,0. , 1.);
}
`;

export default FragmentShader;
