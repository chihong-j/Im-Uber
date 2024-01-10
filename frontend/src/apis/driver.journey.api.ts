import axios, { AxiosRequestConfig } from "axios";
import { path } from "./url.api";
import { StopsData } from "../models/stop.model";
import { DriverRoute, DriverFav, BoardingInfo } from "../models/journey.model";

export const showStops = async (query: {isGo: boolean, address: string}): Promise<StopsData> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/route/showStops",
    params: query,
  };
  const response = await axios(config);
  console.log(response)
  return response.data;
};

export const createRoute = async (route: DriverRoute): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/route/createRoute",
    data: route,
  };
  const response = await axios(config);
  console.log(response)
  return response.data;
}

export const updateDriverFav = async (route: DriverFav): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updateDriverFavor",
    data: route,
  };
  const response = await axios(config);
  console.log(response)
  return response.data;
}

export const showBoardingInfo = async (): Promise<BoardingInfo> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/route/showBoardingInfo",
  };
  const response = await axios(config);
  console.log(response)
  return response.data;
}

export const confirmRoute = async (): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/route/confirmRoute",
  };
  const response = await axios(config);
  console.log(response)
  return response.data;
}

export const finishRoute = async (): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/route/finishRoute",
  };
  const response = await axios(config);
  console.log(response)
  return response.data;
}

export const ifDriverOnRoute = async (): Promise<boolean> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/route/ifDriverOnRoute",
  };
  const response = await axios(config);
  console.log(response)
  return response.data;
}