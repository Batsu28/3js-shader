// data.ts

export interface ImageData {
  id: number;
  title: string;
  imagePath: string;
  position: number;
}

const imageData: ImageData[] = [
  {
    id: 1,
    title: "Image 1",
    imagePath: "/01-fomosphere.png",
    position: -16,
  },
  {
    id: 2,
    title: "Image 2",
    imagePath: "/02-discobrain.png",
    position: -12,
  },
  {
    id: 3,
    title: "Image 3",
    imagePath: "/03-cyberfly.png",
    position: -8,
  },
  {
    id: 4,
    title: "Image 1",
    imagePath: "/04-twistertoy.png",
    position: -4,
  },
  {
    id: 5,
    title: "Image 2",
    imagePath: "/05-fungible.png",
    position: 0,
  },
  {
    id: 6,
    title: "Image 3",
    imagePath: "/06-metalness.png",
    position: 4,
  },
  {
    id: 7,
    title: "Image 1",
    imagePath: "/07-metagum.png",
    position: 8,
  },
  {
    id: 8,
    title: "Image 2",
    imagePath: "/08-firefly.png",
    position: 12,
  },
  {
    id: 9,
    title: "Image 3",
    imagePath: "/10-t1000.png",
    position: 16,
  },
  {
    id: 10,
    title: "Image 3",
    imagePath: "/11-genesys.png",
    position: 20,
  },
  {
    id: 11,
    title: "Image 3",
    imagePath: "/12-protocool.png",
    position: 24,
  },
  {
    id: 12,
    title: "Image 3",
    imagePath: "/13-liquidity.png",
    position: 28,
  },
  {
    id: 13,
    title: "Image 3",
    imagePath: "/14-lipsync.png",
    position: 32,
  },
];

export default imageData;
