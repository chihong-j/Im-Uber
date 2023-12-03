const app = require('../server');
const request = require('supertest');
const User = require('../db/models/Users');
const CarInfo = require('../db/models/CarInfo');
const Wallet = require('../db/models/Wallet');
const sequelize = require('../config/database');

function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms)
    })
}

beforeAll(async () => {
    console.log("sleep starts...");
    await sleep(2500)
    console.log("sleep ends...");
});

describe("POST /api/v1/auth/signup", () => {
    test("Sign up user1", async () => {
        await User.destroy({
            truncate: {cascade: true}
        });
        await CarInfo.destroy({
            truncate: true
        });
        await Wallet.destroy({
            truncate: true
        });
        await sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1;');
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "password": "Leopassword",
            "isDriver": "YES",
            "gender": "M",
            "phone": "0912-345-678",
            "carPlate": "ABCD-8349",
            "addressHome": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "seat": 4,
            "brand": 2,
            "color": 1,
            "electric": "YES"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
    test("Sign up user2", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Chu",
            "email": "chu@gamil.com",
            "password": "Chupassword",
            "isDriver": "NO",
            "gender": "M",
            "phone": "0912-345-678",
            "addressHome": "106台北市大安區和平東路三段60號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
});
describe("POST /api/v1/auth/signin", () => {
    test("should log in successfully", async () => {
        const res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Login successful");
    });
});
describe("GET /api/v1/users/myInfo", () => {
    test("Get user1's infomation", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = loginRes;
        const res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "userID": 1,
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": "YES",
            "gender": "M",
            "phone": "0912-345-678",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
            "nCancel": 0,
            "rating": "0.0",
            "carPlate": "ABCD-8349",
            "CarInfo": {
                "carPlate": "ABCD-8349",
                "seat": 4,
                "brand": 2,
                "color": 1,
                "electric": "YES"
            },
            "Wallet": {
                "userID": 1,
                "balance": 0
            }
        });
    });
    test("Get user2's infomation", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        const { header } = loginRes;
        const res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "userID": 2,
            "userName": "Chu",
            "email": "chu@gamil.com",
            "isDriver": "NO",
            "gender": "M",
            "phone": "0912-345-678",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區和平東路三段60號",
            "nCancel": 0,
            "rating": "0.0",
            "carPlate": null,
            "CarInfo": null,
            "Wallet": {
                "userID": 2,
                "balance": 0
            }
        });
    });
});
describe("POST /api/v1/auth/signout", () => {
    test("Shoud sign out successfully", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        let { header } = loginRes;
        console.log([...header["set-cookie"]]);
        let res = await request(app).post("/api/v1/auth/signout").set("Cookie", [...header["set-cookie"]]);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Logout successfully");
    });
});

describe("POST /api/v1/users/rating", () => {
    test("Shoud rating successfully", async () => {
        let res = await request(app).post("/api/v1/users/rating").send({
            "driverID": 1,
            "rating": 4
        });
        expect(res.body.message).toBe("Rating successfully");
        res = await request(app).post("/api/v1/users/rating").send({
            "driverID": 1,
            "rating": 2
        });
        expect(res.body.message).toBe("Rating successfully");
        res = await request(app).post("/api/v1/users/rating").send({
            "driverID": 1,
            "rating": 3
        });
        expect(res.body.message).toBe("Rating successfully");
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = loginRes;
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "userID": 1,
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": "YES",
            "gender": "M",
            "phone": "0912-345-678",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
            "nCancel": 0,
            "rating": "3.0",
            "carPlate": "ABCD-8349",
            "CarInfo": {
                "carPlate": "ABCD-8349",
                "seat": 4,
                "brand": 2,
                "color": 1,
                "electric": "YES"
            },
            "Wallet": {
                "userID": 1,
                "balance": 0
            }
        });
    });
});

describe("POST /api/v1/users/updatePassenger", () => {
    test("Update user2's infomation", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updatePassenger").set("Cookie", [...header["set-cookie"]]).send({
            "email": "Imchuchu@gamil.com",
            "gender": "M",
            "phone": "0912-345-678",
            "addressHome": "106台北市大安區和平東路三段410號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update passenger successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userID": 2,
            "userName": "Chu",
            "email": "Imchuchu@gamil.com",
            "isDriver": "NO",
            "gender": "M",
            "phone": "0912-345-678",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區和平東路三段410號",
            "nCancel": 0,
            "rating": "0.0",
            "carPlate": null,
            "CarInfo": null,
            "Wallet": {
                "userID": 2,
                "balance": 0
            }
        });
    });
});
describe("POST /api/v1/users/updateDriver", () => {
    test("Sign up driver from passenger", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updateDriver").set("Cookie", [...header["set-cookie"]]).send({
            "email": "driverchuchu@gamil.com",
            "gender": "M",
            "phone": "0933-444-555",
            "addressHome": "106台北市大安區和平東路三段410號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "carPlate": "LOVE-9888",
            "color": 4,
            "brand": 3,
            "electric": "NO",
            "seat": 3
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update driver successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userID": 2,
            "userName": "Chu",
            "email": "driverchuchu@gamil.com",
            "isDriver": "YES",
            "gender": "M",
            "phone": "0933-444-555",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區和平東路三段410號",
            "nCancel": 0,
            "rating": "0.0",
            "carPlate": "LOVE-9888",
            "CarInfo": {
                "carPlate": "LOVE-9888",
                "seat": 3,
                "brand": 3,
                "color": 4,
                "electric": "NO"
            },
            "Wallet": {
                "userID": 2,
                "balance": 0
            }
        });
    });
    test("Update driver's infomation without changing carPlate", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updateDriver").set("Cookie", [...header["set-cookie"]]).send({
            "email": "leo@gamil.com",
            "gender": "M",
            "phone": "0987-654-321",
            "addressHome": "106台北市大安區基隆路四段43號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "carPlate": "ABCD-8349",
            "color": 10,
            "brand": 12,
            "electric": "NO",
            "seat": 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update driver successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userID": 1,
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": "YES",
            "gender": "M",
            "phone": "0987-654-321",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區基隆路四段43號",
            "nCancel": 0,
            "rating": "3.0",
            "carPlate": "ABCD-8349",
            "CarInfo": {
                "carPlate": "ABCD-8349",
                "seat": 2,
                "brand": 12,
                "color": 10,
                "electric": "NO"
            },
            "Wallet": {
                "userID": 1,
                "balance": 0
            }
        });
    });
    test("Update driver's infomation with changing carPlate", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        let { header } = loginRes;
        let res = await request(app).put("/api/v1/users/updateDriver").set("Cookie", [...header["set-cookie"]]).send({
            "email": "leo@gamil.com",
            "gender": "M",
            "phone": "0987-654-321",
            "addressHome": "106台北市大安區基隆路四段43號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "carPlate": "OKDR-1111",
            "color": 10,
            "brand": 12,
            "electric": "NO",
            "seat": 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Update driver successfully");
        res = await request(app).get("/api/v1/users/myInfo").set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            "userID": 1,
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": "YES",
            "gender": "M",
            "phone": "0987-654-321",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "106台北市大安區基隆路四段43號",
            "nCancel": 0,
            "rating": "3.0",
            "carPlate": "OKDR-1111",
            "CarInfo": {
                "carPlate": "OKDR-1111",
                "seat": 2,
                "brand": 12,
                "color": 10,
                "electric": "NO"
            },
            "Wallet": {
                "userID": 1,
                "balance": 0
            }
        });
    });
});
