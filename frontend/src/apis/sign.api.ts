import axios, { AxiosRequestConfig } from "axios";
import { path } from "./url.api";
import { userSignIn, userSignUp } from "../models/user.model";

export const signIn = async (user: userSignIn): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/auth/signin",
    data: user,
  };

  const response = await axios(config);
  return response.data;
};

export const signUp = async (user: userSignUp): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/auth/signup",
    data: user,
  };
  const response = await axios(config);
  return response.data;
};

export const signOut = async (): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/auth/signout",
  };

  const response = await axios(config);
  return response.data;
};
