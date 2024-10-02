import { settings } from "@/settings/register";
import { BlockswebProvider } from "@blocksweb/core";
import dynamic from "next/dynamic";

const ContentPanel = dynamic(
  () => import("@blocksweb/core").then((mod) => mod.ContentPanel),
  {
    ssr: false,
  }
);

export default function Cms(props: { type: string }) {
  return (
    <BlockswebProvider settings={settings}>
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
