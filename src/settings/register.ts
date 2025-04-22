import VideoHeroSection from "./components/video-hero-section";
import { IBlockswebComponent } from "@blocksweb/core";
export const editorComponents: IBlockswebComponent[] = [VideoHeroSection];

export const settings = {
  editorComponents: editorComponents,
  scripts: ["https://cdn.tailwindcss.com"],
  styles: [],
};
