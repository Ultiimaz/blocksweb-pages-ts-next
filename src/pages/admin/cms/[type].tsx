import { editorComponents } from "@/settings/register";
import { BlockswebProvider, ContentPanel } from "@blocksweb/core";

export default function Cms(props: { type: string }) {
  return (
    <BlockswebProvider
      settings={{
        editorComponents,
        scripts: [""],
      }}
    >
      <ContentPanel type={props.type} />
    </BlockswebProvider>
  );
}

export async function getServerSideProps(context) {
  const { type } = context.query;
  return {
    props: {
      type,
    },
  };
}
