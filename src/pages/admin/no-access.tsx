import { getUserByToken, IWorkspace, IUser } from "@blocksweb/core";
import { XCircle } from "lucide-react";
import { GetServerSidePropsContext } from "next";

type NoAccessProps = {
  user: IUser & { workspaces: IWorkspace[] };
};

export default function NoAccess(props: NoAccessProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6", // Tailwind: bg-gray-100
        color: "#1f2937", // Tailwind: text-gray-900
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#ffffff", // Tailwind: bg-white
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Tailwind: shadow-md
        }}
      >
        <XCircle
          style={{
            width: "6rem",
            height: "6rem",
            color: "#ef4444", // Tailwind: text-red-500
            margin: "0 auto",
          }}
        />
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
          }}
        >
          Access Denied
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#4b5563", // Tailwind: text-gray-600
            maxWidth: "28rem",
            margin: "1rem auto",
          }}
        >
          Sorry, you don&apos;t have permission to access this workspace. Please
          contact your administrator if you believe this is an error.
        </p>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          User Info
        </h2>
        <div style={{ textAlign: "left" }}>
          <p>
            <span style={{ fontWeight: "700" }}>Name:</span>{" "}
            {props.user.fullName}
          </p>
          <p>
            <span style={{ fontWeight: "700" }}>Email:</span> {props.user.email}
          </p>
          <p>
            <span style={{ fontWeight: "700" }}>Role:</span> {props.user.role}
          </p>
          <p>
            <span style={{ fontWeight: "700" }}>Workspaces:</span> you&apos;re
            connected to the following workspaces:
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
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              color: "#ffffff", // Tailwind: text-white
              backgroundColor: "#2563eb", // Tailwind: bg-blue-600
              borderRadius: "0.375rem",
              transition: "background-color 0.3s ease-in-out",
              border: "none",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "#1d4ed8"; // Tailwind: hover:bg-blue-700
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "#2563eb"; // Tailwind: bg-blue-600
            }}
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
