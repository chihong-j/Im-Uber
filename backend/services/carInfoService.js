const CarInfo = require('../db/models/CarInfo');

const getAllCarInfo = async () => {
    return CarInfo.findAll();
};

const getCarInfoById = async (id) => {
    return CarInfo.findByPk(id);
};

const createCarInfo = async (carInfoData) => {
    try{
        await CarInfo.create(carInfoData);
    } catch (error) {
        throw new Error("Error when creating carInfo")
    }
};

const updateCarInfo = async (carPlate, carInfoData) => {
    try{
        CarInfo.update(carInfoData, {
            where: { carPlate: carPlate }
        });
    } catch (error){
        throw new Error("Error when updating carInfo");
    }
};

const deleteCarInfo = async (carPlate) => {
    try{
        CarInfo.destroy({
            where: { carPlate: carPlate }
        });
    } catch (error) {
        throw new Error("Delete carInfo error");
    }
};

module.exports = {
    getAllCarInfo,
    getCarInfoById,
    createCarInfo,
    updateCarInfo,
    deleteCarInfo
};
