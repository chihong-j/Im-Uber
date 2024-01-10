const Stops = require('../db/models/Stops')
const Grid = require('../db/models/Grids');



const pathOriginatedFromGrid = async (gridID, isGo) => {
    const rule = (isGo==='true')? 'ASC': 'DESC';
    try {
        const stops = await Grid.findAll({
            attributes: [],
            where: {
                gridID: gridID,
            },
            include: [{
                model: Stops,
                attributes: ['stopID', 'Name', 'address'],
                required: true
            }],
            order: [['order', rule]],
            raw: true,
        });
        return stops;
    } catch (error) {
        throw new Error('An error occurred in pathOriginatedFromGrid!!!');
    }
}

module.exports = {
    pathOriginatedFromGrid
};
