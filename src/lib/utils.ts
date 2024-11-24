import { useEffect, useState } from "react";

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

export function useWindow(): Window | null {
  const [windowObject, setWindowObject] = useState<Window | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowObject(window);
    }
  }, []);

  return windowObject;
}
