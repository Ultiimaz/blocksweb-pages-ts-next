import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bodyParser from "body-parser";
import util from "util";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
