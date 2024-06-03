import { endpoint } from "./config";

export const sendJson = async (path: string, data: object) => {
  const body = JSON.stringify(data);
  const url = `http://${endpoint}/${path}`;

  const response = await fetch(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
