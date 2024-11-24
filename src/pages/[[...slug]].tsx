import { editorComponents } from "@/settings/register";
import {
  DynamicRenderer,
  IBlockswebComponent,
  IBlockswebPage,
} from "@blocksweb/core";
import { GetServerPages } from "@blocksweb/core";

const DynamicPage = (props: {
  page: IBlockswebPage;
  editorComponents: IBlockswebComponent[];
}) => <DynamicRenderer page={props.page} editorComponents={editorComponents} />;

export const getServerSideProps = async (context) => {
  const result = await GetServerPages(context);
  return result;
};

export default DynamicPage;
