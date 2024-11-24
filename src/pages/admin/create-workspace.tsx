import { createWorkspace } from "@blocksweb/core";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

const CreateWorkspace = (props: { session: string }) => {
  const router = useRouter();
  console.log(props.session);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const workspaceName = formData.get("workspaceName") as string;

    console.log(workspaceName);

    createWorkspace(workspaceName, props.session).then((res) => {
      router.push("./no-key");
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-300 w-full h-screen">
      <div className="w-1/4 ">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow dark:bg-neutral-900">
            <div className="pt-0 p-4 sm:pt-0 sm:p-7">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-app-project-name"
                    className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Project name
                  </label>

                  <input
                    name="workspaceName"
                    id="af-submit-app-project-name"
                    type="text"
                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Enter project name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="af-submit-app-category"
                    className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Category
                  </label>

                  <select
                    name="workspaceCategory"
                    id="af-submit-app-category"
                    className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  >
                    <option selected>Select a category</option>
                    <option>Ecommerce</option>
                    <option>Finance</option>
                    <option>Marketplace</option>
                    <option>Social</option>
                    <option>Others</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex justify-center gap-x-2">
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Submit your project
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const session = req.cookies.session;

  return {
    props: {
      session,
    },
  };
};

export default CreateWorkspace;
