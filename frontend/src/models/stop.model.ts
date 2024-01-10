export type Stop = {
    stopID: number,
    Name: string,
    address: string,
}

export type StopsData = {
    Stops: Stop[];
};