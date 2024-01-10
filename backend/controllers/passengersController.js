const routeService = require('../services/routeService');
const passengersService = require('../services/passengerService');
const userService = require('../services/userService');
const boardingService = require('../services/boardingService');

const routesMatching = require('../utils/matching');
const toCorrectString = require('../utils/toCorrectString');
// const transformAddr = require('../utils/transformAddr');

async function showCandidates(req, res) {
    const passengerId = req.session.userId;
    if(!passengerId){
        res.status(401).json({ error: "Wrong sign in information"})
        return;
    }
    // Must remember: query is string, params is number
    const Go = req.query.Go;
    const curAddr = req.query.address;
    const passengerBoardTime = req.query.board_time; 
    const passengerCnt = req.query.passenger_cnt;

    const RouteData = {"Routes":[]};
    try {
        // return a list of viable routes
        let direction_go = true;
        if (Go === "false") {
            direction_go = false;
        } 

        const routes = await routesMatching(
            curAddr, 
            parseInt(process.env.COMPANY_STOP_ID), 
            direction_go, 
            new Date(passengerBoardTime), 
            parseInt(passengerCnt)
        );
        for (let route of routes){
            route.board_time = toCorrectString(route.board_time);
            route.destination_time = toCorrectString(route.destination_time);
        }
        // sort by board_time
        routes.sort((a, b) => {
            return new Date(a.board_time) - new Date(b.board_time);
        });
        RouteData.Routes = routes;
        req.session.passengerCnt = parseInt(passengerCnt);
        res.status(200).json(RouteData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function selectCandidates(req, res) {
    const passengerId = req.session.userId;
    if(!passengerId){
        res.status(401).json({ error: "Wrong sign in information"})
        return;
    }
    const reqData = req.body; 
    // {
    //     "routeID": 3,
    //     "stopID": 23,
    //     "price": 116,
    // }
    try {
        let routeData = await routeService.getRouteById(reqData.routeID);
        routeData.available -= req.session.passengerCnt;
        if(routeData.available < 0){
            res.status(503).json( {message: "Seat not enough!"} );
        }
        await routeService.updateRoute(reqData.routeID, {available: routeData.available});
        
        // create passenger
        let passengerData = {
            "userID": passengerId,
            "routeID": reqData.routeID,
            "pickUpStopID" : 0,
            "dropOFFStopID": 0,
            "passengerCnt": req.session.passengerCnt,
            "price": reqData.price
        };

        if(routeData.type === "GO"){
            passengerData.dropOFFStopID = parseInt(process.env.COMPANY_STOP_ID);
            passengerData.pickUpStopID = reqData.stopID;
        }
        else{
            passengerData.dropOFFStopID = reqData.stopID;
            passengerData.pickUpStopID = parseInt(process.env.COMPANY_STOP_ID);
        }

        const newPassenger = await passengersService.createPassenger(passengerData);
        
        res.status(201).json(newPassenger);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getArrivalTime(req, res) {
    // console.log("123456789")
    const passengerId = req.session.userId;
    if(!passengerId){
        res.status(401).json({ error: "Wrong sign in information"})
        return;
    }
    try {
        let passengerInfo = await passengersService.getPassengerById(passengerId);
        let routeInfo = await routeService.getRouteById(passengerInfo.routeID);
        let driverInfo = await userService.getUserById(routeInfo.driverID);
        let boardingInfo = await boardingService.getAllBoardings();
        let stopBoardings = boardingInfo.filter(
            boarding => 
            boarding.routeID === passengerInfo.routeID && 
            boarding.stopID === passengerInfo.pickUpStopID
        );
        // console.log(stopBoardings)
        let destinationBoardings = boardingInfo.filter(boarding => {
            return boarding.routeID === passengerInfo.routeID && 
            boarding.stopID === passengerInfo.dropOFFStopID;
        });
        // console.log(driverInfo.CarInfo.dataValues)
        let reutrnInfo = {
            "CarInfo":driverInfo.CarInfo.dataValues,
            "stop_arrival_time": toCorrectString(stopBoardings[0].boardTime),
            "dest_arrival_time": toCorrectString(destinationBoardings[0].boardTime)
        }
        // console.log(reutrnInfo)
        res.status(200).json(reutrnInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    showCandidates,
    selectCandidates,
    getArrivalTime
};
