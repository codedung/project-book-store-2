import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";
import { useAlert } from "../hooks/useAlert";
import { useCallback } from "react";

const BASE_URL = "http://localhost:8080";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    withCredentials: true,
    ...config
  });
  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    config.headers["Content-Type"] = "application/json";
    if (!token) return config;
    config.headers["Authorization"] = `${token}`;

    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        removeToken();
        if (
          window.confirm(
            "토큰이 만료되었습니다. 로그인 화면으로 이동하시겠습니까?"
          )
        ) {
          window.location.href = "/login";
          return;
        }
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = "get" | "post" | "put" | "delete";

export const requestHandler = async <T>(
  method: RequestMethod,
  url: string,
  payload?: T
) => {
  let response;

  switch (method) {
    case "get":
      response = await httpClient.get(url);
      break;
    case "post":
      response = await httpClient.post(url, payload);
      break;
    case "put":
      response = await httpClient.put(url, payload);
      break;
    case "delete":
      response = await httpClient.delete(url);
      break;
  }
  return response.data;
};
