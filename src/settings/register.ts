import { IBlockswebComponent } from "@blocksweb/core";
import VideoHeroSection from "./components/video-hero-section";
import ImageLeftTextRightBlock from "./components/image-left-text-right";

export const editorComponents: IBlockswebComponent[] = [
  VideoHeroSection,
  ImageLeftTextRightBlock,
];

export const settings = {
  editorComponents: editorComponents,
  scripts: ["https://cdn.tailwindcss.com"],
};
