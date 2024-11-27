import { getUserByToken, IWorkspace, IUser } from "@blocksweb/core";

import { XCircle } from "lucide-react";
import { GetServerSidePropsContext } from "next";
type NoAccessProps = {
  user: IUser & { workspaces: IWorkspace[] };
};

export default function NoAccess(props: NoAccessProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center space-y-6 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <XCircle className="w-24 h-24 text-red-500 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Access Denied
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Sorry, you don&apos;t have permission to access this workspace. Please
          contact your administrator if you believe this is an error.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Info
        </h2>
        <div className="text-left">
          <p>
            <span className="font-bold">Name:</span> {props.user.fullName}
          </p>
          <p>
            <span className="font-bold">Email:</span> {props.user.email}
          </p>
          <p>
            <span className="font-bold">Role:</span> {props.user.role}
          </p>
          <p>
            <span className="font-bold">Workspaces:</span> youre connected to
            the following workspaces:
          </p>
          {props.user.workspaces.map((workspace) => (
            <div key={workspace.id}>
              <p>{workspace.workspaceName}</p>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              // unset the session cookie
              document.cookie =
                "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = "/admin/sign-in";
            }}
            className="inline-block px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.headers.cookie;

  if (!cookies) {
    return {
      redirect: {
        destination: "/admin/sign-in",
        permanent: false,
      },
    };
  }
  const session = cookies
    .split(";")
    .find((c) => c.trim().startsWith("session="))!
    .split("=")[1];

  const user = await getUserByToken(session);

  return {
    props: {
      user,
    },
  };
};
