export const getBody = async <T>(req): Promise<T> => {
  let body = "";
  const result: string = await new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      resolve(body);
    });
  });

  return JSON.parse(result) as T;
};
