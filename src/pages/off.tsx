import { editorComponents } from "@/settings/register";
import { renderComponent, GetPagesAsync } from "@blocksweb/core";
import { Fragment } from "react";
import { isArray } from "util";
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
  const render = renderComponent(editorComponents, props.page);
  return <Fragment>{render}</Fragment>;
};

// @ts-ignore
export const getStaticProps = async ({ params }) => {
  let noKey = false;
  const pages = await GetPagesAsync();

  if (!Array.isArray(pages)) {
    return {
      redirect: {
        destination: "/admin/no-key",
        permanent: false,
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
