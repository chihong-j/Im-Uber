const stopService = require('../services/stopService');
const routesService = require('../services/routeService');
const boardingService = require('../services/boardingService');
const userService = require('../services/userService');
const carInfoService = require('../services/carInfoService');
const calculateDistance = require('./distance');
const calculatePrice = require('./pricing');

/**
 * Matches routes based on given criteria.
 *
 * @param {string} address - The address of the current location.
 * @param {number} FixStopID - The ID of the fixed stop.
 * @param {boolean} direction - The direction of the route ('work' or 'home').
 * @param {Date} passengerBoardTime - The boarding time filter.
 * @param {number} passengerCnt - The amount of passenger of this order.
 * @returns {Promise<Array<Object>>} - An array of matched routes with relevant information.
 */
const routesMatching = async(address, FixStopID, direction, passengerBoardTime, passengerCnt) => {
  try{
    const Fixstop = await stopService.getStopById(FixStopID);
    let routes = await routesService.getAllRoutes();
    
    if (direction == true) {
      routes = routes.filter(route => route.type === "GO" && route.destination === FixStopID && route.state === 'PROCESSING' && route.available >= passengerCnt);
    } else {
      routes = routes.filter(route => route.type === "BACK" && route.start === FixStopID && route.state === 'PROCESSING' && route.available >= passengerCnt);
    }

    let Routes = [];
    const nearNstops = await stopService.getNearestNStops(address, 3, 2);
    const boardings = await boardingService.getAllBoardings();
    const filteredboardings = boardings.filter(boarding => nearNstops.some(nearStop => nearStop.stopID === boarding.stopID));
    
    for (const route of routes) {
      let find = 0;
      // Back
      if (direction == false) { 
        if (route.startTime >= passengerBoardTime && filteredboardings.length > 0) {
          for (let boarding of filteredboardings) {
            const stop = await stopService.getStopById(boarding.stopID);
            if (
              find === 0 && boarding.routeID == route.routeID
            ) {
              find = 1;
              const user = await userService.getUserById(route.driverID);
              const distance = await calculateDistance(
                stop.latitude,
                stop.longitude,
                Fixstop.latitude,
                Fixstop.longitude
              );
              let rating = 0;
              if(user.nRating !== 0){
                rating = user.ratingTotalScore / user.nRating;
              }
              const price = calculatePrice(distance, user.CarInfo.brand, user.CarInfo.type, rating, user.CarInfo.electric, passengerCnt);
              
              const temp_dic = {
                routeID: route.routeID,
                stopID: stop.stopID,
                stopAddress: stop.address,
                stop_lat: parseFloat(stop.latitude),
                stop_lon: parseFloat(stop.longitude),
                driverID: user.userID,
                driverName: user.userName,
                board_time: route.startTime,
                destination_time: boarding.boardTime,
                rating: rating,
                nRating: user.nRating,
                price: price,
                carPlate: user.CarInfo.carPlate,
                cartype: user.CarInfo.type,
                carbrand: user.CarInfo.brand,
                carColor: user.CarInfo.color,
                carelectric: user.CarInfo.electric
              };
              Routes.push(temp_dic);
            }
          }
        }
      } else { // Go
        for (const boarding of filteredboardings) {
          const stop = await stopService.getStopById(boarding.stopID);
          if (
            find === 0 && boarding.routeID == route.routeID && (boarding.boardTime >= passengerBoardTime)
          ) {
            find = 1;
            const user = await userService.getUserById(route.driverID);
            const distance = await calculateDistance(
              stop.latitude,
              stop.longitude,
              Fixstop.latitude,
              Fixstop.longitude
            );
            let rating = 0;
            if(user.nRating !== 0){
              rating = user.ratingTotalScore / user.nRating;
            }
            const price = calculatePrice(distance, user.CarInfo.brand, user.CarInfo.type, rating, user.CarInfo.electric, passengerCnt);
            
            // Find the time to the destination
            const sameRouteboardings = boardings.filter(boarding => route.routeID === boarding.routeID);
            const final_boarding = sameRouteboardings.reduce((maxObject, currentObject) => {
              return currentObject.boardTime > maxObject.boardTime ? currentObject : maxObject;
            }, sameRouteboardings[0]);
            
            const temp_dic = {
              routeID: route.routeID,
              stopID: stop.stopID,
              stopAddress: stop.address,
              stop_lat: parseFloat(stop.latitude),
              stop_lon: parseFloat(stop.longitude),
              driverID: user.userID,
              driverName: user.userName,
              board_time: boarding.boardTime,
              destination_time: final_boarding.boardTime,
              rating: rating,
              nRating: user.nRating,
              price: price,
              carPlate: user.CarInfo.carPlate,
              cartype: user.CarInfo.type,
              carbrand: user.CarInfo.brand,
              carColor: user.CarInfo.color,
              carelectric: user.CarInfo.electric
            };
            Routes.push(temp_dic);
          }
        }
      }
    }
    return Routes;
  } catch(error) {
    return error.message;
  }
}

module.exports = routesMatching;
