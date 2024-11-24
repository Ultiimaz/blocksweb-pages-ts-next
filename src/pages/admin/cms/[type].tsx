import { settings } from "@/settings/register";
import { BlockswebProvider, IWorkspace } from "@blocksweb/core";
import dynamic from "next/dynamic";

const ContentPanel = dynamic(
  () => import("@blocksweb/core").then((mod) => mod.ContentPanel),
  {
    ssr: false,
  }
);

export default function Cms(props: {
  type: string;
  activeWorkspace: IWorkspace;
}) {
  return (
    <BlockswebProvider settings={settings}>
      <ContentPanel type={props.type} activeWorkspace={props.activeWorkspace} />
    </BlockswebProvider>
  );
}

export async function getServerSideProps(context) {
  const { type } = context.query;
  try {
    if (!process.env.BLOCKSWEB_API_KEY) {
      return {
        redirect: {
          destination: "/admin/no-key",
          permanent: false,
        },
      };
    }

    const workspaces = await fetch("https://api.blocksweb.nl/workspaces", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.req.cookies.session}`,
        "x-api-key": process.env.BLOCKSWEB_API_KEY!,
      },
    }).then((res) => res.json());

    const userBelongsToWorkspace = workspaces.find(
      (workspace) => workspace.apiKey === process.env.BLOCKSWEB_API_KEY
    );
    if (!userBelongsToWorkspace) {
      return {
        redirect: {
          destination: "/admin/no-access",
          permanent: false,
        },
      };
    }

    return {
      props: {
        type,
        activeWorkspace: userBelongsToWorkspace,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/admin/no-access",
        permanent: false,
      },
    };
  }
}
