import { LoginProps } from "@/pages/Login";
import { SignupProps } from "../pages/Signup";
import { getToken } from "../store/authStore";
import { httpClient } from "./http";

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post("/signup", userData);
  console.log(response);
  return response.data;
};

export const resetRequest = async (userData: SignupProps) => {
  const response = await httpClient.post("/reset", userData);
  return response.data;
};

export const resetPassword = async (userData: SignupProps) => {
  const response = await httpClient.post("reset", userData);
  return response.data;
};

interface LoginResponse {
  msg: string;
  token: token;
}
interface token {
  accessToken: string;
  refreshToken: string;
}

export const login = async (userData: LoginProps) => {
  const response = await httpClient.post<LoginResponse>("/signin", userData);
  return response.data;
};
