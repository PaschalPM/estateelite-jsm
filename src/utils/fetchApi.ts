import axios from "axios";

const baseURL = "https://bayut.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": "78d11533f7msh7b8a589578d1c26p1290d6jsn58e9f6a90614",
  "X-RapidAPI-Host": "bayut.p.rapidapi.com",
};
const requestClient = axios.create({
  baseURL,
  headers,
});

export const fetchApi = async (path: string) => {
  const resp = await fetch(baseURL + path, { headers });

  if (!resp.ok) return undefined;

  return resp.json();
};
