import { editorComponents, settings } from "@/settings/register";
import {
  renderComponent,
  GetPagesAsync,
  IBlockswebPage,
  DynamicRenderer,
} from "@blocksweb/core";
import Script from "next/script";
import { NextRequest } from "next/server";
import { Fragment } from "react";
const DynamicPage = (props: { page: IBlockswebPage }) => {
  return (
    <Fragment>
      <Script src={settings.scripts[0]} />
      <DynamicRenderer page={props.page} editorComponents={editorComponents} />
    </Fragment>
  );
};

// Define paths to be statically generated
export const getServerSideProps = async (req: NextRequest) => {
  if (!process.env.BLOCKSWEB_API_KEY!) {
    return {
      redirect: {
        destination: "/admin/no-key",
        permanent: false,
      },
    };
  }
  const pages = (await GetPagesAsync()) as unknown as {
    id: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];

  // @ts-ignore
  if (Boolean(req.query.slug)) {
    // @ts-ignore
    const page = pages.find((page) => page.slug === req.query.slug[0]) ?? null;
    if (!page) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        page,
      },
    };
  }

  const page = pages.find((page) => page.slug === "index") ?? null;

  if (!page) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page,
    },
  };
};

export default DynamicPage;
