import axios, { AxiosRequestConfig } from "axios";
import { path , testPath } from "./url.api";
import { userInfo, userMode } from "../models/user.model";
import { itineraryData , candidateInfo, itineraryQueryData } from "../models/trip";
import { tripInfo } from "../models/trip";
import { PassengerFav } from "../models/journey.model";

export const getCandidate = async (tripData: itineraryQueryData): Promise<candidateInfo[]> => {
  const testData : itineraryQueryData = {
    "Go": true,
    "address": "新竹縣竹東鎮光武街2號",
    "passenger_cnt": 1,
    "board_time": "2023-12-21 12:01:00"
}
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/passengers/showCandidates",
    // url: testPath + "/candidates",
    params: tripData,
  };
  console.log(tripData);
  const response = await axios(config);
  console.log(response)
  return response.data.Routes;
};

export const selectCandidate = async (candidateData : {routeID: number, stopID: number, price: number}): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/passengers/selectCandidate",
    // url: testPath + "/candidates",
    data: candidateData,
  };
  console.log(candidateData);
  const response = await axios(config);
  console.log(response.data)
  return response.data;
};

// need modification
export const getArrivalTime = async (): Promise<tripInfo> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/passengers/getArrivalTime",
    // url: testPath + "CarInfo"
  };
  const response = await axios(config);
  return response.data;
};

export const sendRating = async (ratingData: {driverID: number, rating: number|null}): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: path + "/api/v1/users/rating",
    // url: testPath,
    data: ratingData
  };
  console.log(ratingData)
  const response = await axios(config);
  return response.data;
};

export const updatePassengerFav = async (route: PassengerFav): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updatePassengerFavor",
    data: route,
  };
  const response = await axios(config);
  console.log(response)
  return response.data;
}

export const checkIfPassengerOnRoute = async (): Promise<boolean> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/route/ifPassengerOnRoute",
  };
  const response = await axios(config);
  console.log(response)
  return response.data;
}
