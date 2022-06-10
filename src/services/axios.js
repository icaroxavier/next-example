import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx) {

  const baseURL = process.env.BACKEND_URL;
  const { 'nextexample.token': token } = parseCookies(ctx)

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
  //   const { 'nextexample.token': token } = parseCookies()

  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }

  //   return config;
  // });

  return api;

}
