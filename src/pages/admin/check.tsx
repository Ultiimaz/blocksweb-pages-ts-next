import { GetServerSidePropsContext } from "next";

const Check = () => {
  return (
    <div>
      <h1>Check</h1>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // split on ?token=
  const token = context.req.url?.split("?token=")[1];

  if (!token) {
    return {
      redirect: {
        destination: "/admin/no-access",
        permanent: false,
      },
    };
  }
  console.log("token: ", token);

  context.res.setHeader("Set-Cookie", `session=${token}; Path=/`);
  return {
    redirect: {
      destination: "/admin/cms/editor",
    },
  };
};

export default Check;
