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
    isDriver ENUM('YES', 'NO'),
    gender ENUM('M', 'F', 'O'),
    phone VARCHAR(31),
    addressHome VARCHAR(127),
    addressCompany VARCHAR(127),
    nCancel INT,
    ratingTotalScore INT,
    nRating INT,
    carPlate VARCHAR(15)
);

Create TABLE IF NOT EXISTS CarInfo(
    carPlate VARCHAR(15) PRIMARY KEY,
    seat INT,
    brand INT,
    color INT,
    electric ENUM('YES', 'NO')
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

Create TABLE IF NOT EXISTS Reocrds(
    reocrdID INT AUTO_INCREMENT PRIMARY KEY,
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
    driveID INT,
    startTime DATETIME,
    `start` INT,
    destination INT,
    availale INT,
    FOREIGN KEY(driveID) REFERENCES Users(userID)
);

Create TABLE IF NOT EXISTS Boarding(
    boardingID INT AUTO_INCREMENT PRIMARY KEY,
    routeID INT,
    boardTime DATETIME,
    stopID INT,
    FOREIGN KEY(routeID) REFERENCES Routes(routeID),
    FOREIGN KEY(stopID) REFERENCES Stops(stopID)
);

Create TABLE IF NOT EXISTS Passenger(
    userID INT PRIMARY KEY,
    boardingID INT,
    passengerCnt INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(boardingID) REFERENCES Boarding(boardingID)
);

-- Insert some initailize Stops into the table
INSERT INTO Stops (`Name`, `address`, latitude, longitude)
VALUES
('Taipei Main Station', 'No.3, Beiping W. Rd., Zongzheng Dist., Taipei City Taiwan, R.O.C', 25.04792, 121.51708),
('National Taiwan University', 'No. 1, Sec. 4, Roosevelt Rd., Da''an Dist., Taipei City Taiwan, R.O.C', 25.017123016936853, 121.53399498384425);
