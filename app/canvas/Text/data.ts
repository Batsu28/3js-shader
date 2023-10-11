// data.ts

export interface ImageData {
  id: number;
  name: string;
  title: string;
  imagePath: string;
  position: number;
}

const imageData: ImageData[] = [
  {
    id: 1,
    name: "fomosphere",
    title: "Image 1",
    imagePath: "/01-fomosphere.png",
    position: -16,
  },
  {
    id: 2,
    name: "disco",
    title: "Image 2",
    imagePath: "/02-discobrain.png",
    position: -12,
  },
  {
    id: 3,
    name: "cyberfly",
    title: "Image 3",
    imagePath: "/03-cyberfly.png",
    position: -8,
  },
  {
    id: 4,
    name: "twistertoy",
    title: "Image 1",
    imagePath: "/04-twistertoy.png",
    position: -4,
  },
  {
    id: 5,
    name: "fungible",
    title: "Image 2",
    imagePath: "/05-fungible.png",
    position: 0,
  },
  {
    id: 6,
    name: "metalness",
    title: "Image 3",
    imagePath: "/06-metalness.png",
    position: 4,
  },
  {
    id: 7,
    name: "metagum",
    title: "Image 1",
    imagePath: "/07-metagum.png",
    position: 8,
  },
  {
    id: 8,
    name: "firefly",
    title: "Image 2",
    imagePath: "/08-firefly.png",
    position: 12,
  },
  {
    id: 9,
    name: "slinky",
    title: "Image 3",
    imagePath: "/09-slinky.png",
    position: 16,
  },
  {
    id: 10,
    name: "t1000",
    title: "Image 3",
    imagePath: "/10-t1000.png",
    position: 20,
  },
  {
    id: 11,
    name: "genesys",
    title: "Image 3",
    imagePath: "/11-genesys.png",
    position: 24,
  },
  {
    id: 12,
    name: "protocool",
    title: "Image 3",
    imagePath: "/12-protocool.png",
    position: 28,
  },
  {
    id: 13,
    name: "liquidity",
    title: "Image 3",
    imagePath: "/13-liquidity.png",
    position: 32,
  },
  {
    id: 14,
    name: "lips",
    title: "Image 3",
    imagePath: "/14-lipsync.png",
    position: 36,
  },
];

export default imageData;
