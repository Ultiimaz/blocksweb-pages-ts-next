import { NextApiRequest, NextApiResponse } from "next";
import { isArray } from "util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  let uri = "";

  if (slug === undefined) {
    return res.status(404).json({ error: "Not found" });
  }

  if (isArray(slug) && slug.length > 0) {
    uri = slug.join("/");
  }
  const url = new URL(
    uri?.toString(),
    "https://blocksweb-adonis.onrender.com/"
  );
  const response = await fetch(url.toString(), {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.BLOCKSWEB_API_KEY!,
    },
    body: ["POST", "PUT"].includes(req.method!)
      ? JSON.stringify(req.body)
      : undefined,
  });

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: JSON.stringify(response) });
  }

  const data = await response.json();
  res.status(response.status).json(data);
}
