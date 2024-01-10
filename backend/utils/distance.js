/**
 * Find the distance of two points with given latitude and longitude.
*
* @param {number} lat1 - The latitude of the first point.
* @param {number} lon1 - The longitude of the first point.
* @param {number} lat2 - The latitude of the second point.
* @param {number} lon2 - The longitude of the second point.
* @returns {number} Distance in kilometer.
*/
const calculateDistance = async (lat1, lon1, lat2, lon2) => {
  try {
    // Convert latitude and longitude from degrees to radians
    const toRadians = (angle) => (angle * Math.PI) / 180;
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);
  
    // Haversine formula
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Earth radius in kilometers (mean value)
    const earthRadius = 6371.0;
  
    // Calculate the distance
    const distance = earthRadius * c;

    return distance;
  } catch (error) {
    console.log(error.message)
    return null;
  }
}
  
// module.exports = { calculateDistance };
  // Example usage:
//   const lat1 = 37.7749;   // Latitude of the first point
//   const lon1 = -122.4194; // Longitude of the first point
//   const lat2 = 34.0522;   // Latitude of the second point
//   const lon2 = -118.2437; // Longitude of the second point
  
//   const distance = calculateDistance(lat1, lon1, lat2, lon2);
//   console.log(`Distance between the two points: ${distance.toFixed(2)} km`);

module.exports = calculateDistance;