import { Vector3 } from "three";

interface SettingType {
  material: {
    roughness: number;
    metalness: number;
    envMapIntensity: number;
    clearcoat: number;
    clearcoatRoughness: number;
    transmission: number;
    color: string;
    distort: number;
    frequency: number;
    speed: number;
    gooPoleAmount: number;
    surfaceDistort: number;
    surfaceFrequency: number;
    numberOfWaves: number;
    surfaceSpeed: number;
    surfacePoleAmount: number;
  };
  lights: LightType[];
  bg: string;
  map: string;
}

interface LightType {
  position: Vector3;
  intensity: number;
  angle: number;
  distance: number;
  penumbra: number;
  decay: number;
  color: string;
}

export type { SettingType, LightType };
