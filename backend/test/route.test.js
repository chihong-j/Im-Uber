const { app, server } = require('../server');
const request = require('supertest');
const User = require('../db/models/Users');
const CarInfo = require('../db/models/CarInfo');
const Routes = require('../db/models/Routes');
const sequelize = require('../config/database');
const axios = require('axios');
jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);


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

afterAll(async () => {
    server.close();
});

describe("POST /api/v1/auth/signup", () => {
    test("Sign up user1", async () => {
        // Clear Data
        await User.destroy({
            truncate: {cascade: true}
        });
        await sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1;');
        await CarInfo.destroy({
            truncate: true
        });
        await Routes.destroy({
            truncate: {cascade: true}
        });
        await sequelize.query('ALTER TABLE Routes AUTO_INCREMENT = 1;');
        await sequelize.query('ALTER TABLE Boarding AUTO_INCREMENT = 1;');
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Leo",
            "email": "leo@gamil.com",
            "password": "Leopassword",
            "isDriver": true,
            "gender": "M",
            "phone": "0912-345-678",
            "carPlate": "ABCD-8349",
            "addressHome": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "seat": 4,
            "brand": 2,
            "type": "SUV",
            "color": 1,
            "electric": true
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
    test("Sign up user2", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send({
            "userName": "Chu",
            "email": "chu@gamil.com",
            "password": "Chupassword",
            "isDriver": false,
            "gender": "M",
            "phone": "0912-345-678",
            "addressHome": "106台北市大安區和平東路三段60號",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Sign up successfully");
    });
});

describe("GET /api/v1/route/showStops", () => {
    test("Case 1", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        let { header } = loginRes;
        mockedAxios.get.mockResolvedValue({
            "data": {
                "results": [
                    {
                        "position": {
                            "lat": 25.08216,
                            "lon": 121.57931
                        },
                    },
                ]
            }
        });
        let res = await request(app).get("/api/v1/route/showStops").query({
            "isGo": true,
            "address": "台北市內湖區麗山街68巷5號"
        }).set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            Stops: [
              {
                'Stop.stopID': 46,
                'Stop.Name': '國防醫學院',
                'Stop.address': '台北市民權東路六段161號前側'
              },
              {
                'Stop.stopID': 45,
                'Stop.Name': '三軍總醫院',
                'Stop.address': '台北市成功路二段424號(對面)'
              },
              {
                'Stop.stopID': 48,
                'Stop.Name': '捷運小巨蛋站(3號出口)',
                'Stop.address': '台北市南京東路四段12號前'
              },
              {
                'Stop.stopID': 43,
                'Stop.Name': '立法院台北會館',
                'Stop.address': '台北市博愛路217號旁'
              },
              {
                'Stop.stopID': 42,
                'Stop.Name': '植物園',
                'Stop.address': '台北市和平西路二段100號前'
              },
              {
                'Stop.stopID': 101,
                'Stop.Name': '國泰國小',
                'Stop.address': '新北市中正路386號'
              },
              {
                'Stop.stopID': 109,
                'Stop.Name': '鶯歌陶瓷博物館',
                'Stop.address': '新北市文化路200號(旁)'
              },
              {
                'Stop.stopID': 110,
                'Stop.Name': '二橋派出所',
                'Stop.address': '新北市高職西街/中正三路口(西北側)'
              },
              {
                'Stop.stopID': 25,
                'Stop.Name': '臺鐵上員車站',
                'Stop.address': '新竹縣公道路/光明路口(西側)'
              },
              {
                'Stop.stopID': 111,
                'Stop.Name': '台積電',
                'Stop.address': '新竹縣寶山鄉園區二路168號'
              }
            ]
          })
    })
    test("Case 2", async () => {
        const loginRes = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Chu",
            "password": "Chupassword"
        });
        let { header } = loginRes;
        mockedAxios.get.mockResolvedValue({
            "data": {
                "results": [
                    {
                        "position": {
                            "lat": 25.07433,
                            "lon": 121.44372
                        },
                    },
                ]
            }
        });
        let res = await request(app).get("/api/v1/route/showStops").query({
            "isGo": false,
            "address": "新北市五股區夏綠地街17-35號"
        }).set("Cookie", [...header["set-cookie"]]);
        expect(res.body).toEqual({
            Stops: [
              {
                'Stop.stopID': 111,
                'Stop.Name': '台積電',
                'Stop.address': '新竹縣寶山鄉園區二路168號'
              },
              {
                'Stop.stopID': 25,
                'Stop.Name': '臺鐵上員車站',
                'Stop.address': '新竹縣公道路/光明路口(西側)'
              },
              {
                'Stop.stopID': 23,
                'Stop.Name': '新竹客運下公館站',
                'Stop.address': '新竹縣東寧路一段1號(北側)'
              },
              {
                'Stop.stopID': 108,
                'Stop.Name': '二橋虹橋公園',
                'Stop.address': '新北市中正三路400號(對面)'
              },
              {
                'Stop.stopID': 102,
                'Stop.Name': '山佳火車站',
                'Stop.address': '新北市山佳街47號(對面)'
              },
              {
                'Stop.stopID': 103,
                'Stop.Name': '樹林區公所',
                'Stop.address': '新北市博愛街198-5號對側'
              },
              {
                'Stop.stopID': 99,
                'Stop.Name': '福營行政中心',
                'Stop.address': '新北市四維路17號-20號'
              },
              {
                'Stop.stopID': 44,
                'Stop.Name': '國家音樂廳',
                'Stop.address': '台北市信義路一段(國家音樂廳西北側)'
              },
              {
                'Stop.stopID': 41,
                'Stop.Name': '中正運動中心',
                'Stop.address': '台北市信義路一段1號前'
              },
              {
                'Stop.stopID': 36,
                'Stop.Name': '臺北孔廟',
                'Stop.address': '台北市哈密街61號口對側人行道'
              }
            ]
          })
    })
});

describe("Update favorite", () => {
    test("Update Leo driver driver GO favorite", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;

        const newData = {
            "GO": {
				"address": "台北市大安區羅斯福路四段一號",
				"time": "07:00:00",
				"stopIDs": [12, 24, 63, 7, 2, 111]
            },
            "BACK": {
				"address": null,
				"time": null,
				"stopIDs": null
		    } 
        }
        res = await request(app).put("/api/v1/users/updateDriverFavor").set("Cookie", [...header["set-cookie"]]).send(
            newData
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Update driver favorite route successfully");
    });

    test("Update Leo driver driver BACK favorite", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;

        const newData = {
            "GO": {
				"address": null,
				"time": null,
				"stopIDs": null
            },
            "BACK": {
				"address": "台北市大安區羅斯福路四段一號",
				"time": "23:07:20",
				"stopIDs": [111, 2, 7, 63, 24, 12]
		    } 
        }
        res = await request(app).put("/api/v1/users/updateDriverFavor").set("Cookie", [...header["set-cookie"]]).send(
            newData
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Update driver favorite route successfully");
    });

    test("Update Leo passenger GO favorite", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;

        const newData = {
            "GO": {
				"address": "台北市大安區羅斯福路四段一號",
				"boardTime": "07:00:00",
				"passengerCnt": 1
            },
            "BACK": {
				"address": null,
				"boardTime": null,
				"passengerCnt": null
		    } 
        }
        res = await request(app).put("/api/v1/users/updatePassengerFavor").set("Cookie", [...header["set-cookie"]]).send(
            newData
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Update passenger favorite route successfully");
    });

    test("Update Leo passenger BACK favorite", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;

        const newData = {
            "GO": {
				"address": null,
				"boardTime": null,
				"passengerCnt": null
            },
            "BACK": {
				"address": "台北市大安區羅斯福路四段一號",
				"boardTime": "22:07:20",
				"passengerCnt": 1
		    } 
        }
        res = await request(app).put("/api/v1/users/updatePassengerFavor").set("Cookie", [...header["set-cookie"]]).send(
            newData
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Update passenger favorite route successfully");

    });
});


describe("Update favorite", () => {
    test("Update Leo driver driver GO favorite", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;

        const newData = {
            "GO": {
				"address": "台北市大安區羅斯福路四段一號",
				"time": "07:00:00",
				"stopIDs": [12, 24, 63, 7, 2, 111]
            },
            "BACK": {
				"address": null,
				"time": null,
				"stopIDs": null
		    } 
        }
        res = await request(app).put("/api/v1/users/updateDriverFavor").set("Cookie", [...header["set-cookie"]]).send(
            newData
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Update driver favorite route successfully");
    });

    test("Update Leo driver driver BACK favorite", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;

        const newData = {
            "GO": {
				"address": null,
				"time": null,
				"stopIDs": null
            },
            "BACK": {
				"address": "台北市大安區羅斯福路四段一號",
				"time": "23:07:20",
				"stopIDs": [111, 2, 7, 63, 24, 12]
		    } 
        }
        res = await request(app).put("/api/v1/users/updateDriverFavor").set("Cookie", [...header["set-cookie"]]).send(
            newData
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Update driver favorite route successfully");
    });

    test("Update Leo passenger GO favorite", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;

        const newData = {
            "GO": {
				"address": "台北市大安區羅斯福路四段一號",
				"boardTime": "07:00:00",
				"passengerCnt": 1
            },
            "BACK": {
				"address": null,
				"boardTime": null,
				"passengerCnt": null
		    } 
        }
        res = await request(app).put("/api/v1/users/updatePassengerFavor").set("Cookie", [...header["set-cookie"]]).send(
            newData
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Update passenger favorite route successfully");
    });

    test("Update Leo passenger BACK favorite", async () => {
        let res = await request(app).post("/api/v1/auth/signin").send({
            "userName": "Leo",
            "password": "Leopassword"
        });
        const { header } = res;

        const newData = {
            "GO": {
				"address": null,
				"boardTime": null,
				"passengerCnt": null
            },
            "BACK": {
				"address": "台北市大安區羅斯福路四段一號",
				"boardTime": "22:07:20",
				"passengerCnt": 1
		    } 
        }
        res = await request(app).put("/api/v1/users/updatePassengerFavor").set("Cookie", [...header["set-cookie"]]).send(
            newData
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Update passenger favorite route successfully");

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
            "userName": "Leo",
            "email": "leo@gamil.com",
            "isDriver": true,
            "gender": "M",
            "phone": "0912-345-678",
            "addressCompany": "No. 8, Lixing 6th Rd., East Dist., Hsinchu City 30078, Taiwan (R.O.C.)",
            "addressHome": "No. 1, Sec. 4, Roosevelt Rd., Daan Dist., Taipei City 106319, Taiwan (R.O.C.)",
            "nCancel": 0,
            "rating": "0.0",
            "CarInfo": {
                "carPlate": "ABCD-8349",
                "seat": 4,
                "brand": 2,
                "type": "SUV",
                "color": 1,
                "electric": true
            },
            "Wallet": {
                "balance": 0
            },
            "favorRoute":{
				"passenger": {       
                    "GO": {
                        "address": "台北市大安區羅斯福路四段一號",
                        "passengerCnt": 1,
                        "boardTime": "07:00:00" 
                    },
                    "BACK": {
                        "address": "台北市大安區羅斯福路四段一號",
                        "passengerCnt": 1,
                        "boardTime": "22:07:20"
                    }
				},
				"driver": {
                    "GO": {
                        "address": "台北市大安區羅斯福路四段一號",
                        "time": "07:00:00",
                        "stopIDs": [12, 24, 63, 7, 2, 111],
                        "stopAddresses": ["新竹縣華興五街/華興街口(西北側)", "新竹縣和江街9號(西側)", "新北市烏塗里1-1號與碇格路二段口", "新竹市中華路五段420巷246號旁", "新竹市中華路二段188號(前人行道)", "新竹縣寶山鄉園區二路168號"],
                        "stopNames": ["蝴蝶公園", "至善公園", "烏塗窟聚福宮", "香山天后宮", "國賓大飯店", "台積電"]
                    },
                    "BACK": {
                        "address": "台北市大安區羅斯福路四段一號",
                        "time": "23:07:20",
                        "stopIDs": [111, 2, 7, 63, 24, 12],
                        "stopAddresses": ["新竹縣寶山鄉園區二路168號",  "新竹市中華路二段188號(前人行道)", "新竹市中華路五段420巷246號旁", "新北市烏塗里1-1號與碇格路二段口", "新竹縣和江街9號(西側)", "新竹縣華興五街/華興街口(西北側)"],
                        "stopNames": ["台積電", "國賓大飯店", "香山天后宮", "烏塗窟聚福宮", "至善公園", "蝴蝶公園"]
                    }  
				}
		    }
        });
    });
});
