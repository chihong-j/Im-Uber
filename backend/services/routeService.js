const Boarding = require('../db/models/Boarding');
const Passenger = require('../db/models/Passenger');
const Route = require('../db/models/Routes');

const getAllRoutes = async () => {
    try {
        const routes = await Route.findAll(
            {
                include: [
                    Boarding, 
                    Passenger
                ]
            }
        );
        return routes;
    } catch (error) {
        throw new Error('An error occurred while acquiring the route');
    }
};

const getRouteById = async (id) => {
    try {
        const route = await Route.findByPk(id, {
            include: [
                Boarding, 
                Passenger
            ]
        });
        if (!route) {
            throw new Error('Route not found');
        }
        return route;
    } catch (error) {
        throw new Error('An error occurred while acquiring the route');
    }
};

const createRoute = async (routeData) => {
    try {
        const route = await Route.create(routeData);
        return route;
    } catch (error) {
        throw new Error('An error occurred while creating the route');
    }
};

const updateRoute = async (id, routeData) => {
    try {
        const route = await Route.findByPk(id);
        if (!route) {
            throw new Error('Route not found');
        }
        route.set(routeData);
        await route.save();
        return route;
    } catch (error) {
        console.error('An error occurred while updating the route:', error);
        throw error; // Throw the original error
    }
};

const deleteRoute = async (id) => {
    try {
        const route = await Route.findByPk(id);
        if (!route) {
            throw new Error('Route not found');
        }
        await route.destroy();
    } catch (error) {
        throw new Error('An error occurred while deleting the route.');
    }
};

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute
};