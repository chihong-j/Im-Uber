import dayjs, { Dayjs } from "dayjs";

export type itineraryData = {
  start: string,
  destination: string, 
  passengerCount: string,
  date: Dayjs,
  time: Dayjs,
  // userName: string;
  // password: string;
};

export type itineraryQueryData = {
  Go: boolean,
  address: string, 
  passenger_cnt: number,
  board_time: string|null,
}

export type candidateInfo = {
  routeID: number,
  stopID: number,
  stopAddress: string,
  stop_lat: number,
  stop_lon: number,
  driverID: number,
  driverName: string,
  board_time: string,
  destination_time: string,
  rating: number,
  nRating: number,
  price: number,
  carPlate: string,
  cartype: string,
  carbrand: number,
  carColor: number,
  carelectric: boolean
}

export type tripInfo = {
  CarInfo:{
    carPlate: string,
    seat: number,
    brand: number,
    color: number,
    type: string,
    electure: boolean  
  }
  stop_arrival_time: string,
  dest_arrival_time: string,
}