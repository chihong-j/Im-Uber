//This is not the working File!
const stopService = require('../services/stopService');
const boardingService = require('../services/boardingService');
const distance = require('./distance'); // Assuming distance.js exports the distance function

/**
 * Finds the overlapping elements between two arrays.
 *
 * @param {Array} arr1 - The first array.
 * @param {Array} arr2 - The second array.
 * @returns {Array} - An array containing elements that are present in both arrays.
 */
function overlap(arr1, arr2) {
    return arr1.filter(value => arr2.includes(value));
}

/**
 * Finds routes that satisfy the given conditions based on start and destination coordinates and desire boarding time.
 *
 * @param {number} start_lat - The latitude of the starting point.
 * @param {number} start_long - The longitude of the starting point.
 * @param {number} dest_lat - The latitude of the destination point.
 * @param {number} dest_long - The longitude of the destination point.
 * @param {Date} board_time - The desired boarding time.
 * @returns {Array} - An array of route IDs that satisfy the conditions.
 */

async function Routes_matching(start_lat, start_long, dest_lat, dest_long, board_time) {
  try {
    // Get all stops
    const stops = await stopService.getAllStops();

    // Filter stops within 2KM from start and destination coordinates
    const start_stops = stops.filter(stop => distance(start_lat, start_long, stop.latitude, stop.longitude) < 2);
    const dest_stops = stops.filter(stop => distance(dest_lat, dest_long, stop.latitude, stop.longitude) < 2);

    // Get all boardings
    const boardings = await boardingService.getAllBoardings();

    // Find start routes with matching conditions
    const start_routes = [];
    for (const start_stop of start_stops) {
      for (const boarding of boardings) {
        if (boarding.stopID === start_stop.stopID && boarding.boardTime > board_time) {
          start_routes.push(boarding.routeID);
        }
      }
    }

    // Find destination routes with matching conditions
    const dest_routes = [];
    for (const dest_stop of dest_stops) {
      for (const boarding of boardings) {
        if (boarding.stopID === dest_stop.stopID && boarding.boardTime > board_time) {
          dest_routes.push(boarding.routeID);
        }
      }
    }

    // Find overlapping routes
    const routes_overlap = overlap(start_routes, dest_routes);

    return routes_overlap;
  } catch (error) {
    console.error('Error in Routes_matching:', error);
    throw error;
  }
}