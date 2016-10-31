//定义angular界面所需的服务和常量
UI.Services.factory("TemplateService", ["$http", function ($http) {
    var getTemplate = function (url) {
        return $http.get(url + ".html");
    };

    return { getTemplate: getTemplate };
}]);


 
UI.Services.factory("SystemService", function () {
    return {
        getInfo: function (callBack) {
            var json;
            try {
                var url = "resources/SystemJsInt/getInfo";
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();

            } catch (ex) {
                // json = [{ deviceName: "广州电信机房-MIC-020301", isLogin: "1" }];
                json = [];
                callBack(json);
            }
        },
        login: function (params, callBack) {
            console.debug('login params:');
            console.debug(params);
            var json = [{ result: true, msg: "登录成功" }];
            callBack(json);
            // try {
            //     var url = "resources/UserJsInt/login?account=" + params.account + "&pwd=" + params.pwd;
            //     var req = new XMLHttpRequest();
            //     req.open("GET", url, true);
            //     req.setRequestHeader("Accept", "text/plain");
            //     req.onreadystatechange = function () {
            //         if (req.readyState == 4 && req.status == 200) {
            //             console.debug('login return:');
            //             console.debug(req.responseText);
            //             json = eval('(' + req.responseText + ')');
            //             callBack(json);
            //         }
            //     };
            //     req.send();
            // } catch (ex) {
            //     console.debug('login exception:');
            //     console.debug(ex);
            //     json = [{ result: false, msg: "登录失败" }];
            //     callBack(json);
            // }
        },
        logout: function (callBack) {
            var json = [];
            try {
                var url = "resources/SystemJsInt/logout";
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                json = [];
                callBack(json);
            }
        },
        openDormer: function (params, callBack) {
            var json = [{ result: false, msg: "打开天窗失败" }];
            try {
                var url = "resources/ControllerJsInt/sendCommand?command=open_Dormer";
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                json = [{ result: false, msg: "操作失败" }];
                callBack(json);
            }
        },
        closeDormer: function (params, callBack) {
            var json = [{ result: false, msg: "关闭天窗失败" }];
            try {
                var url = "resources/ControllerJsInt/sendCommand?command=close_Dormer";
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                json = [{ result: false, msg: "操作失败" }];
                callBack(json);
            }
        },
        modifyLoginPwd: function (params, callBack) {
            var json = [{ result: false, msg: "修改登录密码失败" }];
            try {
                var url = "resources/UserJsInt/editPwd?account=" + params.account +　"&oldPwd=" + params.oldPwd
                    +　"&newPwd=" + params.newPwd;
                console.debug(url);
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                json = [{ result: false, msg: "修改登录密码失败" }];
                callBack(json);
            }
        },
        modifyUnlockPwd: function (params, callBack) {
            var json = [{ result: false, msg: "修改失败" }];
            try {
                var url = "resources/SystemJsInt/modifyUnLockPwd?params=" + params.password;
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                json = [{ result: false, msg: "修改失败" }];
                callBack(json);
            }
        },
        getUserList: function (params, callBack) {
            var json = [{ result: false, msg: "获取失败" }];
            try {
                var url = "resources/UserJsInt/getUserList";
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                json = [{ result: false, msg: "获取失败" }];
                callBack(json);
            }
        },
        addUser: function (params, callBack) {
            var json = [{ result: false, msg: "增加失败" }];
            try {
                var url = "resources/UserJsInt/addUser?account=" + params.account + "&pwd=" + params.pwd;
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                json = [{ result: false, msg: "增加失败" }];
                callBack(json);
            }
        },
        editUser: function (params, callBack) {
            var json = [{ result: false, msg: "编辑失败" }];
            try {
                var url = "resources/UserJsInt/editUser?account=" + params.account + "&pwd=" + params.pwd
                    + "&id=" + params.id;
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                json = [{ result: false, msg: "编辑失败" }];
                callBack(json);
            }
        },
        delUser: function (params, callBack) {
            var json = [{ result: false, msg: "删除失败" }];
            try {
                var url = "resources/UserJsInt/deleteUser?id=" + params.id;
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                json = [{ result: false, msg: "删除失败" }];
                callBack(json);
            }
        }
    };
});

UI.Services.factory("PduService", function () {
    return {
        getInfo: function (callBack) {
            var json;
            try {
                var req = new XMLHttpRequest();
                req.open("GET", "resources/RealTimeDataJsInt/getInfo?controlName=pdu_list", true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                console.debug('pdu_list exception:');
                console.debug(ex);
                json = [];
                callBack(json);
            }
        },
        getList: function (callBack) {
            var json;
            try {
                var req = new XMLHttpRequest();
                req.open("GET", "resources/RealTimeDataJsInt/getInfo?controlName=pdu_list", true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            } catch (ex) {
                console.debug('pdu_list exception:');
                console.debug(ex);
                json = [];
                callBack(json);
            }
        },
        getChart: function (params, callBack) {
            var json;
            try {
                var url = "";
                if(params.type == "HOUR"){
                    url = "resources/HistoryDataJsInt/getChart?name=pdu_chart&type=day&date="+params.date + "&id="+params.id;
                }else if(params.type == "DAY"){
                    url = "resources/HistoryDataJsInt/getChart?name=pdu_chart&type=month&date="+params.date + "&id="+params.id;
                }else {
                    url = "resources/HistoryDataJsInt/getChart?name=pdu_chart&type=year&date="+params.date + "&id="+params.id;
                }

                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };

                req.send();
            }catch(ex){
                json = { values: [], sampleTime: [] };
                callBack(json);
            }
        }
    };
});

UI.Services.factory("BoxService", function () {
    return {
        getInfo: function (callBack) {
            var json;
            try{
                var req = new XMLHttpRequest();
                req.open("GET", "resources/RealTimeDataJsInt/getInfo?controlName=fc_info", true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                json = [];
                callBack(json);
            }
        },
        getList: function (callBack) {
            var json;
            try{
                var req = new XMLHttpRequest();
                req.open("GET", "resources/RealTimeDataJsInt/getInfo?controlName=fc_list", true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                json = [];
                callBack(json);
            }
        },
        getChart: function (params, callBack) {
            var json;
            try {
                var url = "";
                if(params.type == "HOUR"){
                    url = "resources/HistoryDataJsInt/getChart?name=fc_chart&type=day&date="+params.date + "&id="+params.id;
                }else if(params.type == "DAY"){
                    url = "resources/HistoryDataJsInt/getChart?name=fc_chart&type=month&date="+params.date + "&id="+params.id;
                }else {
                    url = "resources/HistoryDataJsInt/getChart?name=fc_chart&type=year&date="+params.date + "&id="+params.id;
                }

                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();

            }catch(ex){
                json = { values: [], sampleTime: [] };
                callBack(json);
            }
        },
        getPowerTeam: function (callBack) {
            var json = [{ id:"1",displayName:"", state:"1",frequency:"53",activePower:"31",coolantTemperature:"32.1",runtime:"98天",batteryVoltage:"220",oilPressure:"20" }];
            callBack(json);
        }
    };
});

UI.Services.factory("AlertService", function () {
    return {
        getStatus: function (callBack) {
            var json;
            try{
                var url = "resources/AlertDataJsInt/getStatus";
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                // json = [{ power: "0", safe: "0", environmental: "0", other: "0", front: "0", back: "1" }];
                json = [];
                callBack(json);
            }
        },
        getList: function (params, callBack) {
            var json = [];
            try{
                var url = "resources/AlertDataJsInt/getPagedList?category="+ params.category + "&pageSize="
                    + params.pageSize + "&pageNum=" + params.pageNo;
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                // for (var i = 0; i < 14; i++) {
                //     json.push({ id: i.toString(), displayName: "温度", time: "2015-12-12 12:18", description: "温度38度，超过边界线" + i.toString() });
                // }
                json = [];
                callBack(json);
            }
        },
        getPagedList: function (params, callBack) {
            var end = new Date().getTime();
            var start = end - 7 * 24 * 3600000;
            var json = [];
            try {
                var url = "resources/AlertDataJsInt/getTypedPagedList?category=" + params.category + "&pageSize="
                    + params.pageSize + "&pageNum=" + params.pageNo + "&type=" + params.type;
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                json = { totalItems: 0, pageCount: 0, list: [] };
                callBack(json);
            }
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
            var json;
            try{
                var req = new XMLHttpRequest();
                req.open("GET", "resources/RealTimeDataJsInt/getInfo?controlName=ups_list", true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                // json = [{ displayName:"UPS123", electricQuantity:"75.5", electricCompare:"down", outputCurrent: "1", inputVoltage: "250", inputFaultVoltage: "25", ouputVoltage: "240", outputCurrent: "0", outputFrequency: "51", batteryVoltage: "242", temperature: "36", UPSStatus0: "1", UPSStatus1: "1", UPSStatus2: "1", UPSStatus3: "1", ratingVoltage: "229", ratingCurrent: "120", rateBatteryVoltage: "110", rateFrequency: "48" }];
                json = [];
                callBack(json)
            }
        },
        getChart: function (params, callBack) {
            var json;
            try{
                var url = "";
                if(params.type == "HOUR"){
                    url = "resources/HistoryDataJsInt/getChart?name=ups_chart&type=day&date="+params.date + "&id="+params.id;
                }else if(params.type == "DAY"){
                    url = "resources/HistoryDataJsInt/getChart?name=ups_chart&type=month&date="+params.date + "&id="+params.id;
                }else {
                    url = "resources/HistoryDataJsInt/getChart?name=ups_chart&type=year&date="+params.date + "&id="+params.id;
                }

                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                json = [];
                callBack(json);
            }
        }
    };
});


UI.Services.factory("NetService", function () {
    return {
        getStatus: function (callBack) {
            var json;
            try{
                var req = new XMLHttpRequest();
                req.open("GET", "resources/NetworkJsInt", true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                console.error(ex);
                json = [{}];
                callBack(json)
            }
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
            var json = [{"displayName":"前摄像头","editable":0,"id":"1","state":"正常","video":"local:1"}];
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
            try{
                var url = "resources/AssertJsInt/getAssertData?startX=0&startY=0&width=145&height=500";
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                json = [];
                // json.push({ id: 1, displayName: "配电系统", description: "Keyday P220-8  低压配电，2路自动切换输入，8路输出", startU: 1, endU: 2, className: "power", posX: "50", posY: "310", posW: "120", posH: "50" });
                // json.push({ id: 2, displayName: "空调", description: "艾默生K1280 2P", startU: 3, endU: 4, className: "ac", posX: "50", posY: "360", posW: "125", posH: "120" });
                // json.push({ id: 4, displayName: "DELL-0001", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "30", posW: "120", posH: "20" });
                // json.push({ id: 4, displayName: "DELL-0002", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "52", posW: "120", posH: "20" });
                // json.push({ id: 4, displayName: "DELL-0003", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "74", posW: "120", posH: "20" });
                // json.push({ id: 4, displayName: "DELL-0004", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "96", posW: "120", posH: "20" });
                // json.push({ id: 4, displayName: "DELL-0005", description: "Dell服务器 PowerEdege 2250 8核 256G内存 RAID5", startU: 9, endU: 10, className: "server", posX: "50", posY: "118", posW: "120", posH: "20" });
            }
            callBack(json);
        }
    };
});


UI.Services.factory("AcService", function () {
    return {
        getStatus: function (callBack) {
            var json;
            try{
                var req = new XMLHttpRequest();
                req.open("GET", "resources/RealTimeDataJsInt/getInfo?controlName=air_info", true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                // json = [{ id: "1", displayName: "A2机柜空调", currentFrontHumidity: "56", currentBackHumidity: "52", currentFrontTemperature: "23.5", compareFrontTemperature: "up", currentBackTemperature: "26.7", compareBackTemperature: "down", presetTemperature: "25", current: "12", voltage: "220", power: "13", outTemperature: "16", outHumidity: "33", inTemperature: "22", inHumidity: "52" }];
                json = [];
                callBack(json);
            }
        },
        getList: function (callBack) {
            var json;
            try{
                var req = new XMLHttpRequest();
                req.open("GET", "resources/RealTimeDataJsInt/getInfo?controlName=air_list", true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex)
            {
                json = [];
                // for(var i=1;i<=10;i++){
                //     json.push({ id: i, displayName: i.toString(), currentFrontHumidity: "56", currentBackHumidity: "52", currentFrontTemperature: "23.5", atmosphericPressure: "1.25" });
                // }
                callBack(json);

            }
        },
        getHumidityHistory: function (params, callBack) {
            var json;
            try {
                var url = "";
                if(params.type == "HOUR"){
                    url = "resources/HistoryDataJsInt/getChart?name=air_chart_humidity&type=day&date="+params.date + "&id="+params.id;
                }else if(params.type == "DAY"){
                    url = "resources/HistoryDataJsInt/getChart?name=air_chart_humidity&type=month&date="+params.date + "&id="+params.id;
                }else {
                    url = "resources/HistoryDataJsInt/getChart?name=air_chart_humidity&type=year&date="+params.date + "&id="+params.id;
                }

                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };

                req.send();

            }catch(ex){
                // json = { values: [{ id: "1", displayName: "湿度", record: [56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 80, 56, 56, 22, 56, 56, 56, 56, 56] }], sampleTime: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] };
                json = [];
                callBack(json);
            }
        },
        getTemperatureHistory: function (params, callBack) {
            var json;
            try {
                var url = "";
                if(params.type == "HOUR"){
                    url = "resources/HistoryDataJsInt/getChart?name=air_chart_temperature&type=day&date="+params.date + "&id="+params.id;
                }else if(params.type == "DAY"){
                    url = "resources/HistoryDataJsInt/getChart?name=air_chart_temperature&type=month&date="+params.date + "&id="+params.id;
                }else {
                    url = "resources/HistoryDataJsInt/getChart?name=air_chart_temperature&type=year&date="+params.date + "&id="+params.id;
                }

                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                // json = { values: [{ id: "1", displayName: "温度", record: [36, 12, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 19, 36, 36, 36, 15, 36, 36, 36, 36, 36, 36] }], sampleTime: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] };
                json = [];
                callBack(json);
            }
        }
    };
});

UI.Services.factory("StatService", function () {
    return {
        getEnergyStat: function (callBack) {
            var json;
            try{
                var url = "resources/HistoryDataJsInt/getPowerConsumeUIInfo?name=pue&type=day&date="+params.date;
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };

                req.send();
            }catch(ex){
                json = [];
                // json.push({ id: "1", displayName: "空调", value: "35" });
                // json.push({ id: "2", displayName: "照明", value: "5" });
                // json.push({ id: "3", displayName: "安防", value: "15" });
                // json.push({ id: "4", displayName: "IT设备", value: "45" });
            }
            callBack(json);
        },
        getPueStat: function (callBack) {
            var json;
            try{
                var req = new XMLHttpRequest();
                req.open("GET", "resources/RealTimeDataJsInt/getInfo?controlName=pue", true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                // json = [{ pue: "1.7", total: "320", it: "120", other: "200" }];
                // json[0].pue = (Math.random() * 2 + 1).toFixed(1);
                // json[0].pue = parseFloat(json[0].pue.toString());
                json = [];
                callBack(json);
            }
        },
        getEnergyChart: function (params, callBack) {
            var json;
            try {
                var url = "";
                if(params.type == "HOUR"){
                    url = "resources/HistoryDataJsInt/getEnertyChart2?name=Enerty&type=day&date="+params.date;
                }else if(params.type == "DAY"){
                    url = "resources/HistoryDataJsInt/getEnertyChart2?name=Enerty&type=month&date="+params.date;
                }else {
                    url = "resources/HistoryDataJsInt/getEnertyChart2?name=Enerty&type=year&date="+params.date;
                }

                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };

                req.send();
            }catch(ex){
                json = { values: [], sampleTime: [] };
                callBack(json);
            }
        },
        getPueChart: function (params, callBack) {
            var json;
            try {
                var url = "";
                if(params.type == "HOUR"){
                    url = "resources/HistoryDataJsInt/getPueChart2?tag=it&name=pue&type=day&date="+params.date;
                }else if(params.type == "DAY"){
                    url = "resources/HistoryDataJsInt/getPueChart2?tag=it&name=pue&type=month&date="+params.date;
                }else {
                    url = "resources/HistoryDataJsInt/getPueChart2?tag=it&name=pue&type=year&date="+params.date;
                }

                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                // json = { values: [{ id: "1", displayName: "PUE", record: [2.5, 1.2, 2.2, 1.8, 1.2, 1.2, 1.5, 1.7, 1.9, 2.6, 1.15, 2.5, 1.4, 1.5, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1] }], sampleTime: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"] };
                json = [];
                callBack(json);
            }
        }
    };
});

UI.Services.factory("LedService", function () {
    return {
        getInfo: function (callBack) {
            var json = [{ temperature:23.5 }];
            callBack(json);
        },
        saveInfo: function (params, callBack) {
            var json = [{ result: false, msg: "操作失败" }];;
            try{
                var req = new XMLHttpRequest();
                req.open("GET", "resources/ControllerJsInt/setLedTempure?temperature=" + params.temperature, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        callBack(json);
                    }
                };
                req.send();
            }catch(ex){
                callBack(json);
            }
        }
    };
});