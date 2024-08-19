import { editorComponents } from "@/settings/register";
import {
  BlockswebEditorComponent,
  BlockswebProvider,
  getUserByToken,
} from "@blocksweb/core";
import { GetServerSidePropsContext } from "next";

const EditorPage = () => {
  return (
    <BlockswebProvider
      settings={{
        editorComponents,
        scripts: ["https://cdn.tailwindcss.com"],
      }}
    >
      <BlockswebEditorComponent />
    </BlockswebProvider>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!process.env.BLOCKSWEB_API_KEY) {
    return {
      redirect: {
        destination: "./no-key",
        permanent: false,
      },
    };
  }

  if (!context.req.cookies.session) {
    return {
      props: {},
    };
  }

  const user = await getUserByToken(context.req.cookies.session!);
  return {
    props: {
      user,
    },
  };
};

export default EditorPage;
