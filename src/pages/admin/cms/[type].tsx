import { editorComponents } from "@/settings/register";
import { BlockswebProvider } from "@blocksweb/core-local/src";
import { ContentPanel } from "@blocksweb/core-local/src/cms/pages/content";

export default function Cms() {
  return (
    <BlockswebProvider
      settings={{
        editorComponents,
        scripts: ["https://cdn.tailwindcss.com"],
      }}
    >
      <ContentPanel />
    </BlockswebProvider>
  );
}
