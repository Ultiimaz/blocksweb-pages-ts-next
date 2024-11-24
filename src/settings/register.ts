import VideoHeroSection from "./components/video-hero-section";
import ImageLeftTextRightBlock from "./components/image-left-text-right";
import { IBlockswebComponent } from "@blocksweb/core";
export const editorComponents: IBlockswebComponent[] = [
  VideoHeroSection,
  ImageLeftTextRightBlock,
];

export const settings = {
  editorComponents: editorComponents,
  scripts: ["https://cdn.tailwindcss.com"],
};
