import axios from "axios";

export const handleReq = async (url, type) => {
  const baseUrl = process.env.VITE_BASEURL;
  let request;
  if (type === "post") request = axios.post;
  if (type === "get") request = axios.get;
  if (type === "put") request = axios.put;
  if (type === "delete") request = axios.delete;
  const res = await request(`${baseUrl}/${url}`);
  return res;
};
