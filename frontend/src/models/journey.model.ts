import { Dayjs } from 'dayjs';

export type ItineraryData = {
    start: string;
    destination: string;
    passengerCount: string;
    date: Dayjs | null;
    time: Dayjs | null;
}

export type DriverRoute = {
    startTime: string,
    state: string,
    stopIds: number[],
    available: number,
    type: string
}

export type PassengerFav = {
    GO: {
        address: string | null,
        passengerCnt: number | null,
        boardTime: string | null,
    },
    BACK: {
        address: string | null,
        passengerCnt: number | null,
        boardTime: string | null,
    }
}

export type DriverFav = {
    GO: {
        address: string | null,
        time: string | null,
        stopIDs: number[] | null,
    },
    BACK: {
        address: string | null,
        time: string | null,
        stopIDs: number[] | null,
    }
}

export type Passenger = {
    name: string;
    count: number;
    type?: "pickUp" | "dropOff";
};

export type Boarding = {
    stopID: number;
    name: string;
    passengers: Passenger[];
    address: string;
    latitude: number;
    longitude: number;
    boardTime: string;
};

export type BoardingInfo = {
    stops: Boarding[];
};