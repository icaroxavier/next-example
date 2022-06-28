import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx) {

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { 'next-example.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  // api.interceptors.request.use(function(config) {
  //   const { 'next-example.token': token } = parseCookies()

  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }

  //   return config;
  // });

  return api;

}
