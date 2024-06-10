import { endpoint } from "./config";

export const fetchJson = async (path: string) => {
  const url = `http://${endpoint}/${path}`;
  const response = await fetch(url, { credentials: "include" });
  const json = await response.json();
  return json;
};
