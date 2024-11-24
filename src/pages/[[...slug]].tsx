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
}) => {
  if (!props.page) {
    return (
      <div>
        It seems no pages have been created yet, please create a page in the
        Blocksweb admin panel.
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => (window.location.href = "/admin/sign-in")}
        >
          Go to admin panel
        </button>
      </div>
    );
  }

  <DynamicRenderer page={props.page} editorComponents={editorComponents} />;
};

export const getServerSideProps = async (context) => {
  const result = await GetServerPages(context);
  return result;
};

export default DynamicPage;
