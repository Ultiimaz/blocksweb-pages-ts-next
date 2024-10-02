import { getWorkspacesWithToken, IWorkspace } from "@blocksweb/core";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { useRouter } from "next/router";
import { getBody } from "../../lib/utils";

const ShowWorkspaces = (props: {
  workspaces: IWorkspace[];
  onSelectWorkspace: (workspace: IWorkspace) => void;
}) => {
  const [openWorkspace, setOpenWorkspace] = useState<IWorkspace | null>(null);

  return (
    <div className="hs-accordion-group" data-hs-accordion-always-open="">
      {props.workspaces.map((workspace) => (
        <div
          key={workspace.id}
          className="hs-accordion"
          id="hs-basic-always-open-heading-one"
        >
          <button
            className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
            aria-expanded="false"
            aria-controls="hs-basic-always-open-collapse-one"
          >
            <svg
              className="hs-accordion-active:hidden block size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <svg
              className="hs-accordion-active:block hidden size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
            </svg>
            {workspace.workspaceName}
          </button>
          <div
            id="hs-basic-always-open-collapse-one"
            className={`hs-accordion-content ${
              openWorkspace?.id === workspace.id ? "" : "hidden"
            } w-full overflow-hidden transition-[height] duration-300`}
            role="region"
            aria-labelledby="hs-basic-always-open-heading-one"
          >
            <p className="text-gray-800 dark:text-neutral-200 pl-6">
              <button
                onClick={() => props.onSelectWorkspace(workspace)}
                className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
              >
                Use this project
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
const NoKey = (props: { workspaces: IWorkspace[] }) => {
  const router = useRouter();

  const onSelectWorkspace = (workspace: IWorkspace) => {
    fetch(router.pathname, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workspaceId: workspace.id,
      }),
    });
  };
  return (
    <div className="flex justify-center items-center bg-gray-300 w-full h-screen">
      <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div className="p-4 md:p-7">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            It seems you don&apos;t have a key
          </h3>
          <p className="mt-2 text-gray-500 dark:text-neutral-400">
            To use the Blocksweb editor, you need to have an API key. Please
            contact the administrator to get your key.
          </p>
          {props.workspaces.length > 0 ? (
            <ShowWorkspaces
              workspaces={props.workspaces}
              onSelectWorkspace={onSelectWorkspace}
            />
          ) : (
            <a
              className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
              href="./create-workspace"
            >
              Create your first workspace
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const envFilePath = path.resolve(process.cwd(), ".env");
  let envConfig = config({ path: envFilePath });
  let envVariables = envConfig.parsed || {};

  if (envVariables.BLOCKSWEB_API_KEY) {
    // Either, the user already has a key or the user has just created a key and now has to be redirected

    return {
      redirect: {
        destination: "./editor",
        permanent: false,
      },
    };
  }

  const session = req.cookies.session;

  const workspaces = await getWorkspacesWithToken(session!);
  console.log("request: ", req.method);
  if (req.method === "POST") {
    const body = await getBody<{ workspaceId: string }>(req);

    const workspaceId = body.workspaceId;
    console.log("workspaceId: ", workspaceId);

    console.log("envFilePath: ", envFilePath);
    // Read existing environment variables from .env.local file

    // Check if BLOCKSWEB_API_KEY exists and is not empty
    if (
      !envVariables.BLOCKSWEB_API_KEY ||
      envVariables.BLOCKSWEB_API_KEY === ""
    ) {
      const userOwnsWorkspace = workspaces.find(
        (_workspace) => _workspace.id === workspaceId
      );

      if (!userOwnsWorkspace) {
        return {
          props: {
            workspaces,
            session,
          },
        };
      }

      envVariables.BLOCKSWEB_API_KEY = userOwnsWorkspace.apiKey;
      // Write updated environment variables back to .env.local file
      const content = Object.entries(envVariables)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");

      console.log("content: ", content);

      fs.writeFileSync(envFilePath, content, { encoding: "utf8" });
      return {
        redirect: {
          destination: "./editor",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      workspaces,
      session,
    },
  };
};

export default NoKey;
