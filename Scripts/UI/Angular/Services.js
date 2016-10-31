//定义angular界面所需的服务和常量
UI.Services.factory("TemplateService", ["$http", function ($http) {
    var getTemplate = function (url) {
        return $http.get(url + ".html");
    };

    return { getTemplate: getTemplate };
}]);

var unlockPw = "6666";

UI.Services.factory("SystemService", function () {
    return {
        getInfo: function (callBack) {
            var json;
            try {
                json = eval('(' + AndroidInterface.SystemService() + ')');
            } catch (ex) {
                json = [{}];
                json = [{ deviceName: "广州电信机房-MIC-020301", isLogin: "1" }];
            }
            callBack(json);
        },
        login: function (params, callBack) {
            var json = [{ result: false, msg: "登录失败" }];
            if (params.account == "admin" && params.pwd == "123456") {
                json = [{ result: true, msg: "登录成功" }];
            }
            callBack(json);
        },
        logout: function (callBack) {
            var json = [];
            callBack(json);
        },
        unlock: function (params, callBack) {
            var json = [{ result: false, msg: "登录失败" }];
            if (params.password == unlockPw) {
                json = [{ result: true, msg: "登录成功" }];
            }
            callBack(json);
        },
        modifyLoginPwd: function (params, callBack) {
            var json = [{ result: true, msg: "修改成功" }];
            callBack(json);
        },
        modifyUnlockPwd: function (params, callBack) {
            var json = [{ result: true, msg: "修改成功" }];
            if (params.password == undefined || params.password.length != 4) {
                json = [{ result: false, msg: "密码长度必须是4位" }];
            } else {
                unlockPw = params.password;
            }
            callBack(json);
        },
        getUserList: function (params, callBack) {
            var json = [{ id: 1, account: "admin", pwd: "", loginAt: new Date() }, { id: 2, account: "earth", pwd: "", loginAt: new Date(2016, 10, 1, 12, 13, 14) }, { id: 3, account: "betty", pwd: "", loginAt: null }];
            callBack(json);
        },
        addUser: function (params, callBack) {
            /*parms.account, params.pwd */
            var json = [{ result: true, msg: "添加成功" }];
            callBack(json);
        },
        editUser: function (params, callBack) {
            /*parms.account, params.pwd pwd留空表示不用修改 */
            var json = [{ result: true, msg: "修改成功" }];
            callBack(json);
        },
        delUser: function (params, callBack) {
            /*parms.account, params.pwd */
            var json = [{ result: true, msg: "删除成功" }];
            callBack(json);
        }
    };
});

function sleep(n)
{
    return;
    var start=new Date().getTime();
    while(true) if(new Date().getTime()-start>n) break;
}


UI.Services.factory("PduService", function () {
    return {
        getInfo: function (callBack) {
            var json = [{ model: "Keydak2015-NT", state: "1", voltageInput: "230", voltageOutput: "220.1", currentInput: "12.8", currentOutput: "12.8", power: "1080" }];

            callBack(json);
        },
        getPduList: function (callBack) {
            var json = [];
            for (var i = 1; i < 6; i++) {
                json.push({ displayName: "PDU" + i, model: "Keydak2015-NT", state: "1", voltageInput: "230", voltageOutput: "220.1", currentInput: "12.8", currentOutput: "12.8", power: "1080" });
            }

            callBack(json);
        },
        getList: function (callBack) {
            var json = [];
            for (var i = 1; i <= 2; i++) {
                var pdu = { id: "1", displayName: "P" + i.toString(), voltage: "220", items: [] };
                for (var j = 1; j <= 10; j++) {
                    if (j % 4 == 0)
                        pdu.items.push({ displayName: "P" + i.toString() + "-" + j.toString(), current: "0" });
                    else
                        pdu.items.push({ displayName: "P" + i.toString() + "-" + j.toString(), current: "1.2" });
                }
                json.push(pdu);
            }
            callBack(json);
        },
        getChart: function (params, callBack) {
            var json = { values: [], sampleTime: [] };
            if (params.type == "HOUR") {
                for (var i = 0; i < 24; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 2; i++) {
                    var entity = { id: i, displayName: i, record: [] };
                    for (var j = 0; j < 24; j++) {
                        if ((i + j) % 5 == 0)
                            entity.record.push((100 + Math.random() * 10).toString());
                        else
                            entity.record.push((100).toString());
                    }
                    json.values.push(entity);
                }
            } else if (params.type == "DAY") {
                for (var i = 0; i < 31; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 2; i++) {
                    var entity = { id: i, displayName: i, record: [] };
                    for (var j = 0; j < 31; j++) {
                        entity.record.push((100 + Math.random()).toString());
                    }
                    json.values.push(entity);
                }
            } else {
                for (var i = 0; i < 12; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 2; i++) {
                    var entity = { id: i, displayName: i, record: [] };
                    for (var j = 0; j < 12; j++) {
                        entity.record.push((100 + Math.random()).toString());
                    }
                    json.values.push(entity);
                }
            }
            sleep(5000);
            callBack(json);
        }
    };
});

UI.Services.factory("BoxService", function () {
    return {
        getInfo: function (callBack) {
            var json = [{ model: "Keydak2015-NT", state: "1", voltageInput: "230", voltageOutput: "220.1", currentInput: "12.8", currentOutput: "12.8", power: "1080" }];
            callBack(json);
        },
        getList: function (callBack) {
            var json = [];
            json.push({ id: "1", displayName: "PDU", voltage: "220", current: "1.2", state: "1", dutyRatio: "75" });
            json.push({ id: "2", displayName: "风机", voltage: "220", current: "1.1", state: "1", dutyRatio: "100" });
            json.push({ id: "3", displayName: "交换机", voltage: "220", current: "1.2", state: "1", dutyRatio: "50" });
            json.push({ id: "4", displayName: "闲置", voltage: "0", current: "0", state: "0", dutyRatio: "0" });
            json.push({ id: "5", displayName: "未知", voltage: "220", current: "1.4", state: "1", dutyRatio: "90" });
            json.push({ id: "6", displayName: "未知", voltage: "220", current: "1.5", state: "1", dutyRatio: "75" });
            json.push({ id: "7", displayName: "闲置", voltage: "0", current: "0", state: "0", dutyRatio: "0" });
            json.push({ id: "8", displayName: "未知", voltage: "220", current: "0", state: "0", dutyRatio: "75" });
            json.push({ id: "9", displayName: "未知", voltage: "220", current: "1.2", state: "1", dutyRatio: "75" });
            json.push({ id: "10", displayName: "未知", voltage: "220", current: "1.1", state: "1", dutyRatio: "101" });
            callBack(json);
        },
        getChart: function (params, callBack) {
            console.debug(params);
            var json = { values: [], sampleTime: [] };
            if (params.type == "HOUR") {
                for (var i = 0; i < 24; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 10; i++) {
                    var entity = { id: i, displayName: i, record: [] };
                    for (var j = 0; j < 24; j++) {
                        if ((i + j) % 5 == 0)
                            entity.record.push((100 + Math.random() * 10).toString());
                        else
                            entity.record.push((100).toString());
                    }
                    json.values.push(entity);
                }
            } else if (params.type == "DAY") {
                for (var i = 0; i < 31; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 10; i++) {
                    var entity = { id: i, displayName: i, record: [] };
                    for (var j = 0; j < 31; j++) {
                        entity.record.push((100 + Math.random()).toString());
                    }
                    json.values.push(entity);
                }
            } else {
                for (var i = 0; i < 12; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 10; i++) {
                    var entity = { id: i, displayName: i, record: [] };
                    for (var j = 0; j < 12; j++) {
                        entity.record.push((100 + Math.random()).toString());
                    }
                    json.values.push(entity);
                }
            }
            callBack(json);
        },
        getPowerTeam: function (callBack) {
            var json = [{ id: "1", displayName: "", state: "1", frequency: "53", activePower: "31", coolantTemperature: "32.1", runtime: "98天", batteryVoltage: "220", oilPressure: "20" }];
            callBack(json);
        }
    };
});

UI.Services.factory("AlertService", function () {
    return {
        getStatus: function (callBack) {
            var json = [{ power: "0", safe: "0", environmental: "1", other: "0", front: "0", back: "0" }];
            callBack(json);
        },
        getList: function (params, callBack) {
            var json = [];
            for (var i = 0; i < 15; i++) {
                json.push({ id: i.toString(), displayName: "温度", time: "2015-12-12 12:18", description: "温度38度，超过边界线" + i.toString() });
            }
            callBack(json);
        },
        getPagedList: function (params, callBack) {
            /*params.type 1最近1天 2最近1周 3最近一个月 4所有*/
            var json = { totalItems: 109, pageCount: 8, list: [] };
            for (var i = 0; i < 14; i++) {
                json.list.push({ id: i.toString(), displayName: "温度一二三四五六七八九十一二三", time: "2015-12-12 12:18", description: "温度38度，超过边界线" + i.toString() });
            }
            callBack(json);
        },
        getDefines: function (params, callBack) {
            var json = { totalItems: 109, pageCount: 8, list: [] };
            for (var i = 0; i < 5; i++) {
                json.list.push({ id: i.toString(), title: "温度", limit: "12.8", enable: true });
                json.list.push({ id: i.toString(), title: "湿度", limit: "54", enable: false });
            }
            callBack(json);
        },
        saveDefine: function (params, callBack) {
            var json = { code: "0", msg: "保存成功" };
            callBack(json);
        },
        resetDefines: function (params, callBack) {
            var json = { code: "0", msg: "操作成功" };
            callBack(json);
        }
    };
});


UI.Services.factory("SfService", function () {
    return {
        getList: function (callBack) {
            var json = [{ id: "1", displayName: "门禁", time: "201512121218", description: "打开" }, { id: "2", displayName: "烟感", time: "201512121218", description: "烟雾报警" }];
            callBack(json);
        }
    };
});


UI.Services.factory("UpsService", function () {
    return {
        getStatus: function (callBack) {
            var json = [{ displayName: "UPS名称", electricQuantity: "75.2", electricCompare: "down", outputCurrent: "1", inputVoltage: "250", inputFaultVoltage: "25", ouputVoltage: "240", outputCurrent: "0", outputFrequency: "51", batteryVoltage: "242", temperature: "36", UPSStatus0: "1", UPSStatus1: "1", UPSStatus2: "1", UPSStatus3: "1", ratingVoltage: "229", ratingCurrent: "120", rateBatteryVoltage: "110", rateFrequency: "48" }];
            callBack(json);
        },
        getChart: function (params, callBack) {
            var json = { values: [], sampleTime: [] };
            if (params.type == "HOUR") {
                for (var i = 0; i < 24; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 1; i++) {
                    var entity = { id: i, displayName: i, record: [] };
                    for (var j = 0; j < 24; j++) {
                        entity.record.push((Math.random() * 100).toString());
                    }
                    json.values.push(entity);
                }
            } else if (params.type == "DAY") {
                for (var i = 0; i < 31; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 1; i++) {
                    var entity = { id: i, displayName: i, record: [] };
                    for (var j = 0; j < 31; j++) {
                        entity.record.push((Math.random() * 100).toString());
                    }
                    json.values.push(entity);
                }
            } else {
                for (var i = 0; i < 12; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 1; i++) {
                    var entity = { id: i, displayName: i, record: [] };
                    for (var j = 0; j < 12; j++) {
                        entity.record.push((Math.random() * 100).toString());
                    }
                    json.values.push(entity);
                }
            }
            callBack(json);
        }
    };
});


UI.Services.factory("NetService", function () {
    return {
        getStatus: function (callBack) {
            var json = [{ speed: "188", displayName: "Keydak-16F", state: "1" }];
            callBack(json);
        },
        getSsidList: function (callBack) {
            var json = [{ ssid: "earth1", state: "1", safe: "1" }, { ssid: "earth2", state: "0", safe: "1" }, { ssid: "earth3", state: "0", safe: "1" }, { ssid: "earth4", state: "0", safe: "1" }, { ssid: "earth5", state: "0", safe: "0" }];
            callBack(json);
        },
        saveSetting: function (params, callBack) {
            //params.ssid
            var json = [{ result: false, msg: "密码错误" }];
            if (params.password == "12345678") {
                json = [{ result: true, msg: "登录成功" }];
            }
            callBack(json);
        }
    };
});


UI.Services.factory("VideoService", function () {
    return {
        getList: function (callBack) {
            var json = [{ id: "local:1", displayName: "前摄像头", state: "正常", editable: "1", video: "http://192.168.0.187:28090/?action=snapshot" }, { id: "local:2", displayName: "后摄像头", state: "异常", editable: "1", video: "2" }, { id: "hello", displayName: "未知", state: "异常", editable: "0", video: "2" }];
            json = [{ id: "local:1", displayName: "前摄像头", state: "正常", editable: "1", video: "http://192.168.0.187:28090/?action=stream" }, { id: "local:2", displayName: "后摄像头", state: "异常", editable: "1", video: "http://192.168.0.187:28090/?action=snapshot" }, { id: "hello", displayName: "未知", state: "异常", editable: "0", video: "http://192.168.0.187:28090/?action=snapshot" }];
            callBack(json);
        },
        saveInfo: function (params, callBack) {
            //params.id params.video 多个摄像头调用多次
            var json = [{ result: true, msg: "" }];
            callBack(json);
        }
    };
});


UI.Services.factory("AssetsService", function () {
    return {
        getList: function (callBack) {
            var json = [];
            json.push({ id: 1, displayName: "配电系统", description: "Keyday P220-8  低压配电，2路自动切换输入，8路输出", startU: 1, endU: 2, className: "power", posX: "50", posY: "310", posW: "120", posH: "50" });
            json.push({ id: 2, displayName: "空调", description: "艾默生K1280 2P", startU: 3, endU: 4, className: "ac", posX: "50", posY: "360", posW: "125", posH: "120" });
            json.push({ id: 4, displayName: "DELL-0001", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "30", posW: "120", posH: "20" });
            json.push({ id: 4, displayName: "DELL-0002", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "52", posW: "120", posH: "20" });
            json.push({ id: 4, displayName: "DELL-0003", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "74", posW: "120", posH: "20" });
            json.push({ id: 4, displayName: "DELL-0004", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "96", posW: "120", posH: "20" });
            json.push({ id: 4, displayName: "DELL-0005", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "118", posW: "120", posH: "20" });
            callBack(json);
        }
    };
});


UI.Services.factory("AcService", function () {
    return {
        getStatus: function (callBack) {
            var json = [{ id: "1", displayName: "A2机柜空调", currentFrontHumidity: "56", currentBackHumidity: "52", currentFrontTemperature: "23.5", compareFrontTemperature: "up", currentBackTemperature: "26.7", compareBackTemperature: "down", presetTemperature: "25", current: "12", voltage: "220", power: "13", outTemperature: "16", outHumidity: "33", inTemperature: "22", inHumidity: "52" }];
            callBack(json);
        },
        getHumidityHistory: function (params, callBack) {
            var json = { values: [{ id: "1", displayName: "湿度", record: [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 80, 56, 56, 22, 56, 56, 56, 56, 56] }], sampleTime: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] };
            callBack(json);
        },
        getTemperatureHistory: function (params, callBack) {
            console.info("getTemperatureHistory parms:");
            console.debug(params);
            var json = { values: [{ id: "1", displayName: "温度", record: [36, 12, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 19, 36, 36, 36, 15, 36, 36, 36, 36, 36, 36] }], sampleTime: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] };
            callBack(json);
        }
    };
});


UI.Services.factory("EnvironmentalService", function () {
    return {
        getStatus: function (callBack) {
            var json = [{ id: "1", displayName: "A2机柜空调", currentFrontHumidity: "56", currentBackHumidity: "52", currentFrontTemperature: "23.5", compareFrontTemperature: "up", currentBackTemperature: "26.7", compareBackTemperature: "down", presetTemperature: "25", current: "12", voltage: "220", power: "13", outTemperature: "16", outHumidity: "33", inTemperature: "22", inHumidity: "52" }];
            callBack(json);
        },
        getList: function (callBack) {
            var json = [];
            for (var i = 1; i < 6; i++) {
                json.push({ displayName: "设备" + i, smoke: (i % 4 == 0 ? "1" : "0"), founder: (i % 3 == 0 ? "1" : "0"), front: (i % 2 == 0 ? "1" : "0"), back: (i % 5 == 0 ? "1" : "0"), currentFrontTemperature: 22.6, currentFrontHumidity: 41, currentBackTemperature: 25.6, currentBackHumidity: 42 });
            }

            callBack(json);
        },
        getHumidityHistory: function (params, callBack) {
            var json = { values: [{ id: "1", displayName: "湿度", record: [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 80, 56, 56, 22, 56, 56, 56, 56, 56] }], sampleTime: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] };
            callBack(json);
        },
        getTemperatureHistory: function (params, callBack) {
            console.info("getTemperatureHistory parms:");
            console.debug(params);
            var json = { values: [{ id: "1", displayName: "温度", record: [36, 12, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 19, 36, 36, 36, 15, 36, 36, 36, 36, 36, 36] }], sampleTime: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] };
            callBack(json);
        }
    };
});




UI.Services.factory("StatService", function () {
    return {
        getEnergyStat: function (callBack) {
            var json = [];
            json.push({ id: "1", displayName: "空调", value: "35" });
            json.push({ id: "2", displayName: "照明", value: "5" });
            json.push({ id: "3", displayName: "安防", value: "15" });
            json.push({ id: "4", displayName: "IT设备", value: "45" });
            callBack(json);
        },
        getPueStat: function (callBack) {
            var json = [{ pue: "2.5", total: "320", it: "120", other: "200" }];
            json[0].pue = (Math.random() * 2 + 1).toFixed(1);
            json[0].pue = parseFloat(json[0].pue.toString());
            callBack(json);
        },
        getEnergyChart: function (params, callBack) {
            var json = { values: [], sampleTime: [] };
            if (params.type == "HOUR") {
                for (var i = 0; i < 24; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 2; i++) {
                    var entity = { id: i, displayName: i == 1 ? "IT" : "Other", record: [] };
                    for (var j = 0; j < 24; j++) {
                        if ((i + j) % 5 == 0)
                            entity.record.push((100 + Math.random() * 10).toString());
                        else
                            entity.record.push((100).toString());
                    }
                    json.values.push(entity);
                }
            } else if (params.type == "DAY") {
                for (var i = 0; i < 31; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 2; i++) {
                    var entity = { id: i, displayName: i == 1 ? "IT" : "Other", record: [] };
                    for (var j = 0; j < 31; j++) {
                        entity.record.push((100 + Math.random()).toString());
                    }
                    json.values.push(entity);
                }
            } else {
                for (var i = 0; i < 12; i++) {
                    json.sampleTime.push(i.toString());
                }
                for (var i = 1; i <= 2; i++) {
                    var entity = { id: i, displayName: i == 1 ? "IT" : "Other", record: [] };
                    for (var j = 0; j < 12; j++) {
                        entity.record.push((100 + Math.random()).toString());
                    }
                    json.values.push(entity);
                }
            }
            callBack(json);
        },
        getPueChart: function (params, callBack) {
            var json = { values: [{ id: "1", displayName: "PUE", record: [2.5, 1.2, 2.2, 1.8, 1.2, 1.2, 1.5, 1.7, 1.9, 2.6, 1.15, 2.5, 1.4, 1.5, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1] }], sampleTime: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] };
            callBack(json);
        }
    };
});