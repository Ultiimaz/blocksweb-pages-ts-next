import { settings } from "@/settings/register";
import { renderComponent, GetPagesAsync } from "@blocksweb/core";
import { GetServerSideProps, GetStaticPaths } from "next";
import Script from "next/script";
import { NextRequest } from "next/server";
import { Fragment } from "react";
const DynamicPage = (props: {
  page: {
    id: string;
    name: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}) => {
  const render = renderComponent(settings.editorComponents, props.page);
  return (
    <Fragment>
      <Script src={settings.scripts[0]} />
      {render}
    </Fragment>
  );
};

// Define paths to be statically generated
export const getServerSideProps = async (req: NextRequest) => {
  const pages = (await GetPagesAsync()) as unknown as {
    id: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];
  const paths2 = pages.map((page) => {
    return {
      params: { slug: [page.slug] },
    };
  });

  // @ts-ignore
  console.log(req.query);
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
