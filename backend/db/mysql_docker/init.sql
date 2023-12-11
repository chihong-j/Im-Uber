-- Create a new database
CREATE DATABASE IF NOT EXISTS myUber_database;

-- Switch to the newly created database
USE myUber_database;

-- Create a users table
CREATE TABLE IF NOT EXISTS Users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(31),
    email VARCHAR(31),
    `password` VARCHAR(255),
    isDriver BOOLEAN,
    gender ENUM('M', 'F', 'O'),
    phone VARCHAR(31),
    addressHome VARCHAR(127),
    addressCompany VARCHAR(127),
    nCancel INT,
    ratingTotalScore INT,
    nRating INT,
    carPlate VARCHAR(15)
);

Create TABLE IF NOT EXISTS Passenger_Favor(
    userID INT PRIMARY KEY,
    GO_start VARCHAR(255),
    GO_cnt INT,
    GO_TIME TIME,
    BACK_dest VARCHAR(255),
    BACK_cnt INT,
    BACK_TIME TIME,
    FOREIGN KEY(userID) REFERENCES Users(userID) ON DELETE CASCADE
);

Create TABLE IF NOT EXISTS Driver_Favor(
    userID INT PRIMARY KEY,
    GO_start VARCHAR(255),
    GO_TIME TIME,
    GO_stops VARCHAR(255),
    BACK_dest VARCHAR(255),
    BACK_TIME TIME,
    BACK_stops VARCHAR(255),
    FOREIGN KEY(userID) REFERENCES Users(userID) ON DELETE CASCADE
);

Create TABLE IF NOT EXISTS CarInfo(
    carPlate VARCHAR(15) PRIMARY KEY,
    seat INT,
    brand INT,
    color INT,
    `type` ENUM('SUV', 'Sedan'),
    electric BOOLEAN
);

Create TABLE IF NOT EXISTS Wallet(
    userID INT PRIMARY KEY,
    balance INT,
    -- Creditcard_Num VARCHAR(255),
    FOREIGN KEY(userID) REFERENCES Users(userID) ON DELETE CASCADE
);

Create TABLE IF NOT EXISTS Stops(
    stopID INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(63),
    `address` VARCHAR(255),
    latitude DECIMAL(20, 17),
    longitude DECIMAL(20, 17)
);

Create TABLE IF NOT EXISTS Records(
    recordID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    `date` DATETIME,
    `start` INT,
    destination INT,
    price INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(`start`) REFERENCES Stops(stopID),
    FOREIGN KEY(destination) REFERENCES Stops(stopID)
);

Create TABLE IF NOT EXISTS Routes(
    routeID INT AUTO_INCREMENT PRIMARY KEY,
    driverID INT,
    startTime DATETIME,
    `start` INT,
    destination INT,
    available INT,
    `type` ENUM("GO", "BACK"),
    `state` ENUM("PROCESSING", "COMFIRMED"), 
    FOREIGN KEY(driverID) REFERENCES Users(userID) ON DELETE CASCADE
);

Create TABLE IF NOT EXISTS Boarding(
    boardingID INT AUTO_INCREMENT PRIMARY KEY,
    stopID INT,
    routeID INT,
    boardTime DATETIME,
    FOREIGN KEY(routeID) REFERENCES Routes(routeID) ON DELETE CASCADE,
    FOREIGN KEY(stopID) REFERENCES Stops(stopID)
);

Create TABLE IF NOT EXISTS Passenger(
    userID INT PRIMARY KEY,
    routeID INT,
    pickUpStopID INT,
    dropOFFStopID INT,
    passengerCnt INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(routeID) REFERENCES Routes(routeID) ON DELETE CASCADE
);

Create TABLE IF NOT EXISTS Grids(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `gridID` INT,
    `stopID` INT,
    `order` INT,
    FOREIGN KEY(stopID) REFERENCES Stops(stopID)
);

-- Insert some initailize Stops into the table
-- INSERT INTO Stops (`Name`, `address`, latitude, longitude)
-- VALUES
-- ('TSMC HQ', 'No. 8, Lixing 6th Rd., East Dist., Hsinchu City, Taiwan, R.O.C', 24.771815, 121.013575),
-- ('Taipei Main Station', 'No.3, Beiping W. Rd., Zongzheng Dist., Taipei City, Taiwan, R.O.C', 25.04792, 121.51708),
-- ('Taoyuan Main Station', 'No.1, Zongzheng Rd., Taoyuan Dist., Taoyuan City, Taiwan, R.O.C', 24.989838, 121.313255),
-- ('Hsinchu Main Station', 'No.445, Chunghwa. sec. Rd., East Dist., Hsinchu County, Taiwan, R.O.C', 24.801775, 120.971574),
-- ('1', 'No.3, Beiping W. Rd., Zongzheng Dist., Taipei City, Taiwan, R.O.C', 25.04792, 121.51708),
-- ('2', 'No.3, Beiping W. Rd., Zongzheng Dist., Taipei City, Taiwan, R.O.C', 25.04792, 121.51708),
-- ('3', 'No.3, Beiping W. Rd., Zongzheng Dist., Taipei City, Taiwan, R.O.C', 25.04792, 121.51708),
-- ('4', 'No.3, Beiping W. Rd., Zongzheng Dist., Taipei City, Taiwan, R.O.C', 25.04792, 121.51708),
-- ('5', 'No.3, Beiping W. Rd., Zongzheng Dist., Taipei City, Taiwan, R.O.C', 25.04792, 121.51708),
-- ('National Taiwan University', 'No. 1, Sec. 4, Roosevelt Rd., Da''an Dist., Taipei City, Taiwan, R.O.C', 25.017123016936853, 121.53399498384425);
