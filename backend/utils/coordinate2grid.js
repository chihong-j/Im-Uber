const coordinate2grid = (lat, lon) => {
    let top = 25.28549;
    let bottom = 24.71979;
    let left = 120.89443;
    let right = 121.8665;
    lat = Math.max(Math.min(lat, top), bottom);
    lon = Math.max(Math.min(lon, right), left);
    let dr = 0.06285555555555551;
    let dc = 0.10800777777777802;
    let nr = 10;
    let nc = 10;
    let r = Math.floor((top - lat) / dr);
	let c = Math.floor((lon - left) / dc);
    return r * nc + c;
}

module.exports = coordinate2grid;
