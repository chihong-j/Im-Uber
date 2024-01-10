import axios, { AxiosRequestConfig } from "axios";
import { path } from "./url.api";
import { userInfo, userMode } from "../models/user.model";

export const getUserInfo = async (): Promise<userInfo> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/users/myInfo"
  };
  const response = await axios(config);
  console.log(response.data);
  return {
    name: response.data.userName,
    email: response.data.email,
    phone: response.data.phone,
    gender: response.data.gender,
    home: response.data.addressHome,
    company: response.data.addressCompany,
    wallet: response.data.Wallet.balance,
    driver: response.data.isDriver,       // Whether driver is verified
    mode: userMode.Passenger,             // Which mode is this user use (userMode.Passenger/userMode.Driver)
    favRoute: response.data.favorRoute,
    car: response.data.CarInfo,
    nCancel: response.data.nCancel,
    rating: response.data.rating,
  }
};

export const updateCarInfo = async (user: userInfo): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updateCarInfo",
    data: {
      "carPlate": user.car.carPlate,
      "color": user.car.color,
      "brand": user.car.brand,
      "type": user.car.type,
      "electric": user.car.electric,
      "seat": user.car.seat
    }
  };
  const response = await axios(config);
  return response.data;
};

export const updateDriverInfo = async (user: userInfo): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updateDriver",
    data: {
      "email": user.email,
      "gender": user.gender,
      "phone": user.phone,
      "addressHome": user.home,
      "addressCompany": user.company,
      "carPlate": user.car.carPlate,
      "color": user.car.color,
      "brand": user.car.brand,
      "type": user.car.type,
      "electric": false, //user.car.electric,
      "seat": user.car.seat
    }
  };
  const response = await axios(config);
  return response.data;
};

export const updatePassengerInfo = async (user: userInfo): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updatePassenger",
    data: {
      "email": user.email,
      "gender": user.gender,
      "phone": user.phone,
      "addressHome": user.home,
      "addressCompany": user.company,
    }
  };
  const response = await axios(config);
  return response.data;
};

export const updateDriverFav = async (user: userInfo): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updateDriverFavor",
    data: {
      "GO": {
          "address": (user.favRoute.driver.GO.address === null)? "" : user.favRoute.driver.GO.address,
          "time": user.favRoute.driver.GO.time,
          "stopIDs": user.favRoute.driver.GO.stopIDs
       },
       "BACK": {
          "address": user.favRoute.driver.BACK.address,
          "time": user.favRoute.driver.BACK.time,
          "stopIDs": user.favRoute.driver.BACK.stopIDs
       }  
   }
  };
  const response = await axios(config);
  return response.data;
};

export const updatePassengerFav = async (user: userInfo): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/users/updatePassengerFavor",
    data: user.favRoute.passenger
  };
  const response = await axios(config);
  return response.data;
};

export const showStops = async (query: {isGo: boolean, address: string}): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: path + "/api/v1/route/showStops",
    params: query,
  };
  const response = await axios(config);
  return response.data;
};

export const cashTopUp = async (cash: number): Promise<{balance: number}> => {
  const config: AxiosRequestConfig = {
    method: 'PUT',
    url: path + "/api/v1/wallet/topUp",
    data: { "cash": cash }
  };
  const response = await axios(config);
  return response.data;
};