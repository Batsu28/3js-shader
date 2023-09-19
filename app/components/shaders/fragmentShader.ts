const FragmentShader = /*glsl*/ `
varying vec2 vUv;
varying float vPattern;

uniform float uTime;

struct Color{
    vec3 c;
    float position;
};


#define COLOR_RAMP(colors, inputPosition, finalColor) { \
    int index = 0; \
    for(int i = 0; i < colors.length() - 1; i++){ \
       Color currentColor = colors[i]; \
       Color nextColor = colors[i + 1]; \
       bool isInBetween = currentColor.position <= inputPosition; \
       index = isInBetween? i : index; \
    } \
    Color currentColor = colors[index]; \
    Color nextColor = colors[index + 1]; \
    vec3 c1 = currentColor.c; \
    vec3 c2 = nextColor.c; \
    float range = nextColor.position - currentColor.position; \
    float lerpFactor = (inputPosition - currentColor.position) / range; \
    finalColor = mix(c1, c2, lerpFactor); \
} \


void main(){
    float time = uTime;

    vec3 color;

    vec3 mainColor = vec3(0.2, 0.4, 0.6);

    mainColor.r *= 0.2 + sin(time) / 3.2;
    mainColor.g *= 1.1 + cos(time / 2.0) / 2.5;
    mainColor.b *= 0.8 + cos(time / 5.0) / 4.0;

    mainColor.rgb += 0.1;

    Color[4] colors = Color[](
        Color(vec3(1), 0.0),
        Color(vec3(1), 0.01),
        Color(mainColor, 0.1),
        Color(vec3(0.01, 0.05, 0.2), 1.0)
    );
    COLOR_RAMP(colors, vPattern, color);

    gl_FragColor = vec4(vec3(color),1.0);
}
`;

export default FragmentShader;
