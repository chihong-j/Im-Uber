const Records = require('../db/models/Records'); // Adjust the path accordingly
const User = require('../db/models/Users');
const Stop = require('../db/models/Stops');

async function getAllRecords() {
  try {
    const records = await Records.findAll({
        include: [
            User,
            Stop,
            Stop
        ]
    });
    return records;
  } catch (error) {
    throw new Error(`Error getting records: ${error.message}`);
  }
}

async function getRecordById(recordID) {
  try {
    const record = await Records.findByPk(recordID, {
        include: [User, Stop, Stop]
    });
    return record;
  } catch (error) {
    throw new Error(`Error getting record by ID: ${error.message}`);
  }
}

async function createRecord(recordData) {
  try {
    const newRecord = await Records.create(recordData);
    return newRecord;
  } catch (error) {
    throw new Error(`Error creating record: ${error.message}`);
  }
}

async function updateRecord(recordID, updatedData) {
  try {
    const [updatedRowsCount, updatedRows] = await Records.update(updatedData, {
      where: { recordID },
      returning: true, // This ensures that the returned object is the updated record
    });

    if (updatedRowsCount === 0) {
      throw new Error(`Record with ID ${recordID} not found.`);
    }

    return updatedRows[0];
  } catch (error) {
    throw new Error(`Error updating record: ${error.message}`);
  }
}

async function deleteRecord(recordID) {
  try {
    const deletedRowCount = await Records.destroy({
      where: { recordID },
    });

    if (deletedRowCount === 0) {
      throw new Error(`Record with ID ${recordID} not found.`);
    }

    return `Record with ID ${recordID} deleted successfully.`;
  } catch (error) {
    throw new Error(`Error deleting record: ${error.message}`);
  }
}

module.exports = {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
};
