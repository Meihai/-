//控制器
/*通知页面刷新数据时*/
function loadData() {
    Event.Fire("LoadData");
}
/*告警有变更时*/
function loadAlert() {
    Event.Fire("LoadAlert");
}

/*日期格式化*/
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

UI.Controllers.controller("MainCtrl", ["$scope", "$state", "$interval", "SystemService", "AlertService",
    function ($scope, $state, $interval, SystemService, AlertService) {
        var timer = null;
        $scope.dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        $scope.colours = ["#666666", "#cccccc", "#ff6600", "#f74eb3", "#f80395", "#f5f803", "#26f803", "#03f8ea", "#bb03f8", "#f74eb3", "#a5f74e"];
        $scope.time = {};
        $scope.alert = {};
        $scope.showAlert = false;
        $scope.time.now = new Date();
        $scope.account = "admin";
        $scope.time.week = $scope.dayNames[$scope.time.now.getDay()]
        timer = $interval(function () {
            $scope.time.now = new Date();
            $scope.time.week = $scope.dayNames[$scope.time.now.getDay()]
        }, 1000, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });
        $scope.switchAccount = function (acc) {
            $scope.account = acc;
        };
        SystemService.getInfo(function (resp) {
            if (resp.length > 0) {
                $scope.system = resp[0];
            }
            $("body").removeClass("kap-loading");
        });
        $scope.checkLogin = function () {
            SystemService.getInfo(function (resp) {
                $scope.system = resp[0];
                if ($scope.system.isLogin == "0")
                    window.location.href = "#/Index"
            });
        };
        $scope.logout = function () {
            SystemService.logout(function (resp) {
                window.location.href = "#/Index";
            });
        };
        $scope.loadAlert = function () {
            console.info("loadAlert");
            AlertService.getStatus(function (resp) {
                if (resp.length > 0) {
                    $scope.alert = resp[0];
                }
            });
        };
        $scope.loadAlert();
        $scope.switchAlert = function (s) {
            $scope.showAlert = s;
        };
        $scope.navi = function (menu) {
            layer.load();
            if (menu == "index" || menu == "menu")
                window.location.href = "#/" + menu.substring(0, 1).toUpperCase() + menu.substring(1);
            else
                window.location.href = "#/Module/" + menu.substring(0, 1).toUpperCase() + menu.substring(1);
        };
        $scope.naviAlert = function (category) {
            $scope.showAlert = false;
            window.location.href = "#/Module/Alert?key=" + category;
        }
        $scope.layContent = false;
        $scope.switchLay = function (st) {
            $scope.layContent = st;
        };
    }]);

UI.Controllers.controller("IndexCtrl", ["$scope", "$interval", "SystemService", "NetService", "BoxService", "UpsService", "AcService",
    function ($scope, $interval, SystemService, NetService, BoxService, UpsService, AcService) {
        $scope.switchLay(false);
        $scope.system = {};
        $scope.box = {};
        $scope.net = {};
        $scope.ac = {};
        $scope.account = "";
        $scope.password = "";
        $scope.password2 = "";
        $scope.errCount = 0;
        $scope.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "Enter"];
        $scope.loadData = function () {
            console.info("loadIndexData");
            SystemService.getInfo(function (resp) {
                if (resp.length > 0 && resp[0].deviceName != undefined) {
                    $scope.system = resp[0];

                    BoxService.getInfo(function (resp) {
                        if (resp.length > 0) {
                            $scope.box = resp[0];
                        }
                    });

                    NetService.getStatus(function (resp) {
                        if (resp.length > 0) {
                            $scope.net = resp[0];
                        }
                    });

                    AcService.getStatus(function (resp) {
                        if (resp.length > 0) {
                            $scope.ac = resp[0];
                        }
                        setTimeout('$("body").removeClass("kap-loading");', 500);
                    });
                }
            });
        };
        $scope.loadData();
        $scope.login = function () {
            $scope.errCount = 0;
            $(".modUnlock").hide();
            $(".modIndexLogin").show();
            $(".modIndexLogin input").removeClass("err");
        };
        $scope.unlock = function ($event) {
            $event.stopPropagation();
            $(".modIndexLogin").hide();
            $(".modUnlock").show();
            $(".modUnlock input").removeClass("err");
        };
        $scope.openLock = function () {
            SystemService.unlock({ password: $scope.password2 }, function (resp) {
                if (resp.length > 0) {
                    if (resp[0].result) {
                        $scope.password2 = "";
                        $(".modUnlock").hide();
                        layer.msg("门禁解锁成功");
                    } else {
                        $(".modUnlock input").addClass("err");
                        $scope.password2 = "";
                        $scope.errCount++;
                        if ($scope.errCount >= 3) {
                            $scope.errCount = 0;
                            $(".modUnlock").hide();
                        }
                    }
                } else {
                    $scope.password2 = "";
                    $(".modUnlock input").addClass("err");
                }
            });
        };
        $scope.pressNum = function (key) {
            $(".modUnlock input").removeClass("err");
            if (key == "Clear") {
                $scope.password2 = "";
                return;
            }
            if (key == "Enter") {
                $scope.openLock();
                return;
            }
            if ($scope.password2.length < 4) {
                $scope.password2 += key;
            }
            if ($scope.password2.length == 4) {
                $scope.openLock();
            }
        };
        $scope.loginSystem = function () {
            if ($scope.account == "") {
                layer.msg("请输入账号");
            }
            else if ($scope.password == "") {
                layer.msg("请输入密码");
            }
            else {
                SystemService.login({ account: $scope.account, pwd: $scope.password }, function (resp) {
                    if (resp.length > 0) {
                        if (resp[0].result) {
                            $scope.switchAccount($scope.account);
                            window.location.href = "#/Menu";
                        } else {
                            layer.msg(resp[0].msg);
                        }
                    } else {
                        layer.msg("账号或密码错误");
                    }
                });
            }
        };
        $scope.cancelLogin = function () {
            $(".modIndexLogin").hide();
        };
        $scope.$on('$stateChangeStart', function (event, to, toParams, from, fromParams) {
            console.info("$stateChangeStart to.self, toParams, from.self, fromParams).defaultPrevented");
            layer.load();
        });
        $scope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
            console.info("$stateChangeSuccess to.self, toParams, from.self, fromParams");
            layer.closeAll();
        });

        $scope.hideable = true;
        $scope.modUnlockClick = function () {
            if ($scope.hideable)
            {
                $scope.password2 = "";
                $(".modUnlock").hide();
            }
            $scope.hideable = true;

        };

        $scope.boxClick = function () {
            $scope.hideable = false;
        };
    }]);

UI.Controllers.controller("MenuCtrl", ["$scope", "$interval", "SystemService",
    function ($scope, $interval, SystemService) {
        $scope.switchLay(false);
        $scope.system = {};
        $scope.checkLogin();
        $scope.$on('$stateChangeStart', function (event, to, toParams, from, fromParams) {
            console.info("$stateChangeStart to.self, toParams, from.self, fromParams).defaultPrevented");
            layer.load();
        });
        $scope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
            console.info("$stateChangeSuccess to.self, toParams, from.self, fromParams");
            layer.closeAll();
        });
    }]);

UI.Controllers.controller("ModuleCtrl", ["$scope", "$sce", "$location", "$stateParams", "$templateCache",
    function ($scope, $sce, $location, $stateParams, $templateCache) {
        $scope.switchLay(true);
        $scope.module = $stateParams.name;
        $scope.checkLogin();
        /*
        var html = $templateCache.get("Template/" + $stateParams.name + ".html");
        if (html != undefined) {
            //$scope.html = html;
            $(".layContent").html(html);
            $compile($(".layContent").contents())($scope);
            console.info("html done");
        }*/

        $("#alert_btn").bind("touchmove", function (event) {
            event.preventDefault();
            var touch = event.originalEvent.touches[0];
            $(this).css("left", (touch.pageX - 40) + 'px');
            $(this).css("top", (touch.pageY - 40) + 'px');
        });

        $("#alert_layer").bind("touchmove", function (event) {
            event.preventDefault();
            var touch = event.originalEvent.touches[0];
            $(this).css("left", (touch.pageX - 120) + 'px');
            $(this).css("top", (touch.pageY - 120) + 'px');
        });
        $scope.$on('$stateChangeStart', function (event, to, toParams, from, fromParams) {
            layer.load();
        });
        $scope.navi = function (name) {
            if ($stateParams.name != name) {
                layer.load();
                $location.url("/Module/" + name);
            }
        };
    }]);

UI.Controllers.controller("BoxCtrl", ["$scope", "BoxService",
    function ($scope, BoxService) {
        $scope.box = {};
        $scope.power = {};
        $scope.list = [];
        $scope.list1 = [];
        $scope.list2 = [];
        $scope.chart = { "labels": [], "series": [], "data": [] };
        $scope.group = "HOUR";
        $scope.date = new Date();

        $scope.switchGroup = function (g) {
            if (g != null) $scope.group = g;
            BoxService.getChart({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                $scope.chart = { "labels": [], "series": [], "data": [], "colours": [] };
                for (var i = 0; i < resp.sampleTime.length; i++) {
                    $scope.chart.labels.push(resp.sampleTime[i]);
                }
                for (var i = 0; i < resp.values.length; i++) {
                    $scope.chart.series.push(resp.values[i].displayName);
                    $scope.chart.data.push(resp.values[i].record);
                }
            });
        };

        $scope.loadData = function () {

            BoxService.getInfo(function (resp) {
                if (resp.length > 0) {
                    $scope.box = resp[0];
                    $scope.box.stateText = $scope.box.state == "1" ? "正常" : "异常";
                }
            });

            BoxService.getList(function (resp) {
                $scope.list1 = [];
                $scope.list2 = [];
                $scope.list = resp;
                for (var i = 0; i < $scope.list.length / 2; i++) {
                    $scope.list1.push($scope.list[i]);
                }
                for (var i = $scope.list.length / 2; i < $scope.list.length; i++) {
                    $scope.list2.push($scope.list[i]);
                }
            });

            BoxService.getPowerTeam(function (resp) {
                if (resp.length > 0) {
                    $scope.power = resp[0];
                    $scope.power.stateText = $scope.power.state == "1" ? "正常" : "异常";
                }
            });
            $scope.switchGroup(null);
        };
        $scope.loadData();

        $scope.set = function () {
            if ($scope.group == "HOUR") {
                $("#modBox .set input:eq(0)").prop("checked", true);
            } else if ($scope.group == "DAY") {
                $("#modBox .set input:eq(1)").prop("checked", true);
            } else {
                $("#modBox .set input:eq(2)").prop("checked", true);
            }
            $("#modBox .set").fadeIn();
        };

        $scope.click = function (g) {
            $scope.group = g;
        }

        $scope.cancel = function () {
            $("#modBox .set").fadeOut();
        };

        $scope.ok = function () {
            $scope.switchGroup($scope.group);
            $("#modBox .set").fadeOut();
        };

    }]);


UI.Controllers.controller("PduCtrl", ["$scope", "$interval", "PduService",
    function ($scope, $interval, PduService) {

        $scope.pdu = {};
        $scope.list = [];
        $scope.chart = { "labels": [], "series": [], "data": [] };
        $scope.group = "HOUR";
        $scope.date = new Date();

        $scope.switchGroup = function (g) {
            if (g != null) $scope.group = g;
            PduService.getChart({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                $scope.chart = { "labels": [], "series": [], "data": [], "colours": [] };
                for (var i = 0; i < resp.sampleTime.length; i++) {
                    $scope.chart.labels.push(resp.sampleTime[i]);
                }
                for (var i = 0; i < resp.values.length; i++) {
                    $scope.chart.series.push(resp.values[i].displayName);
                    $scope.chart.data.push(resp.values[i].record);
                }
            });
        };

        $scope.loadData = function () {
            PduService.getPduList(function (resp) {
                if (resp.length > 0) {
                    $scope.pduList = resp;
                    angular.forEach($scope.pduList, function (pdu) {
                        pdu.stateText = pdu.state == "1" ? "正常" : "异常";
                    });
                }
                layer.closeAll();
            });
            $scope.switchGroup(null);
        };


        var timer = $interval(function () {
            $scope.loadData();
            $interval.cancel(timer);
        }, 100, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });


        $scope.set = function () {
            if ($scope.group == "HOUR") {
                $("#modPdu .set input:eq(0)").prop("checked", true);
            } else if ($scope.group == "DAY") {
                $("#modPdu .set input:eq(1)").prop("checked", true);
            } else {
                $("#modPdu .set input:eq(2)").prop("checked", true);
            }
            $("#modPdu .set").fadeIn();
        };

        $scope.click = function (g) {
            $scope.group = g;
        }

        $scope.cancel = function () {
            $("#modPdu .set").fadeOut();
        };

        $scope.ok = function () {
            $scope.switchGroup($scope.group);
            $("#modPdu .set").fadeOut();
        };

    }]);

UI.Controllers.controller("UpsCtrl", ["$scope", "$interval", "UpsService",
    function ($scope, $interval, UpsService) {

        $scope.ups = {};
        $scope.chart = { "labels": [], "series": [], "data": [] };
        $scope.group = "HOUR";
        $scope.date = new Date();

        $scope.switchGroup = function (g) {
            if (g != null) $scope.group = g;
            UpsService.getChart({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                $scope.chart = { "labels": [], "series": [], "data": [], "colours": [] };
                for (var i = 0; i < resp.sampleTime.length; i++) {
                    $scope.chart.labels.push(resp.sampleTime[i]);
                }
                for (var i = 0; i < resp.values.length; i++) {
                    $scope.chart.series.push(resp.values[i].displayName);
                    $scope.chart.data.push(resp.values[i].record);
                }
            });
        };

        $scope.loadData = function () {

            UpsService.getStatus(function (resp) {
                if (resp.length > 0) {
                    $scope.ups = resp[0];
                    if ($scope.ups.UPSStatus == "0") {
                        $scope.ups.stateText = "在线供电";
                    } else if ($scope.ups.UPSStatus == "1") {
                        $scope.ups.stateText = "旁路供电";
                    } else if ($scope.ups.UPSStatus == "2") {
                        $scope.ups.stateText = "均不供电";
                    } else if ($scope.ups.UPSStatus == "3") {
                        $scope.ups.stateText = "电池供电";
                    } else {
                        $scope.ups.stateText = "异常";
                    }
                }
                layer.closeAll();
            });
            $scope.switchGroup(null);
        };
        var timer = $interval(function () {
            $scope.loadData();
            $interval.cancel(timer);
        }, 100, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });


        $scope.set = function () {
            if ($scope.group == "HOUR") {
                $("#modUps .set input:eq(0)").prop("checked", true);
            } else if ($scope.group == "DAY") {
                $("#modUps .set input:eq(1)").prop("checked", true);
            } else {
                $("#modUps .set input:eq(2)").prop("checked", true);
            }
            $("#modUps .set").fadeIn();
        };

        $scope.click = function (g) {
            $scope.group = g;
        }

        $scope.cancel = function () {
            $("#modUps .set").fadeOut();
        };

        $scope.ok = function () {
            $scope.switchGroup($scope.group);
            $("#modUps .set").fadeOut();
        };
    }]);


UI.Controllers.controller("AcCtrl", ["$scope", "$interval", "AcService", "AlertService",
    function ($scope, $interval, AcService, AlertService) {
        $scope.ac = {};
        $scope.chart = { "labels": [], "series": [], "data": [] };
        $scope.group = "HOUR";
        $scope.type = "T";
        $scope.date = new Date();

        $scope.switchGroup = function (g) {
            if (g != null) $scope.group = g;
            if ($scope.type == "T") {
                AcService.getTemperatureHistory({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                    $scope.chart = { "labels": [], "series": [], "data": [], "colours": [] };
                    for (var i = 0; i < resp.sampleTime.length; i++) {
                        $scope.chart.labels.push(resp.sampleTime[i]);
                    }
                    for (var i = 0; i < resp.values.length; i++) {
                        $scope.chart.series.push(resp.values[i].displayName);
                        $scope.chart.data.push(resp.values[i].record);
                    }
                });

            } else {
                AcService.getHumidityHistory({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                    $scope.chart = { "labels": [], "series": [], "data": [], "colours": [] };
                    for (var i = 0; i < resp.sampleTime.length; i++) {
                        $scope.chart.labels.push(resp.sampleTime[i]);
                    }
                    for (var i = 0; i < resp.values.length; i++) {
                        $scope.chart.series.push(resp.values[i].displayName);
                        $scope.chart.data.push(resp.values[i].record);
                    }
                });
            }
        };

        $scope.loadData = function () {
            AcService.getStatus(function (resp) {
                if (resp.length > 0) {
                    $scope.ac = resp[0];
                }
                layer.closeAll();
            });
            $scope.switchGroup(null);
        };
        var timer = $interval(function () {
            $scope.loadData();
            $interval.cancel(timer);
        }, 100, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });


        $scope.set = function () {
            if ($scope.type == "T") {
                $("#modAc .set input:eq(0)").prop("checked", true);
            } else {
                $("#modAc .set input:eq(1)").prop("checked", true);
            }
            if ($scope.group == "HOUR") {
                $("#modAc .set input:eq(2)").prop("checked", true);
            } else if ($scope.group == "DAY") {
                $("#modAc .set input:eq(3)").prop("checked", true);
            } else {
                $("#modAc .set input:eq(4)").prop("checked", true);
            }
            $("#modAc .set").fadeIn();
        };

        $scope.change = function (t) {
            $scope.type = t;
        }

        $scope.click = function (g) {
            $scope.group = g;
        }

        $scope.cancel = function () {
            $("#modAc .set").fadeOut();
        };

        $scope.ok = function () {
            $scope.switchGroup($scope.group);
            $("#modAc .set").fadeOut();
        };

        $scope.openFan = function () {
            try{
                var json = [];
                var url = "resources/ControllerJsInt/openFan";
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        if (json.length > 0) {
                            if (json[0].result) {
                                layer.msg(json[0].msg);
                            } else {
                                layer.msg(json[0].msg);
                            }
                        } else {
                            layer.msg("风机打开失败");
                        }
                    }
                };
                req.send();
            }catch(ex){
                layer.msg("风机打开失败");
            }
        };

        $scope.resetFan = function () {
            try{
                var json = [];
                var url = "resources/ControllerJsInt/resetFan";
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.setRequestHeader("Accept", "text/plain");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200) {
                        json = eval('(' + req.responseText + ')');
                        if (json.length > 0) {
                            if (json[0].result) {
                                layer.msg(json[0].msg);
                            } else {
                                layer.msg(json[0].msg);
                            }
                        } else {
                            layer.msg("风机复位失败");
                        }
                    }
                };
                req.send();
            }catch(ex){
                layer.msg("风机复位失败");
            }

        };
    }]);



UI.Controllers.controller("EnvironmentalCtrl", ["$scope", "$interval", "EnvironmentalService",
    function ($scope, $interval, EnvironmentalService) {
        $scope.ac = {};
        $scope.chart = { "labels": [], "series": [], "data": [] };
        $scope.group = "HOUR";
        $scope.type = "T";
        $scope.date = new Date();

        $scope.switchGroup = function (g) {
            if (g != null) $scope.group = g;
            if ($scope.type == "T") {
                EnvironmentalService.getTemperatureHistory({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                    $scope.chart = { "labels": [], "series": [], "data": [], "colours": [] };
                    for (var i = 0; i < resp.sampleTime.length; i++) {
                        $scope.chart.labels.push(resp.sampleTime[i]);
                    }
                    for (var i = 0; i < resp.values.length; i++) {
                        $scope.chart.series.push(resp.values[i].displayName);
                        $scope.chart.data.push(resp.values[i].record);
                    }
                });

            } else {
                EnvironmentalService.getHumidityHistory({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                    $scope.chart = { "labels": [], "series": [], "data": [], "colours": [] };
                    for (var i = 0; i < resp.sampleTime.length; i++) {
                        $scope.chart.labels.push(resp.sampleTime[i]);
                    }
                    for (var i = 0; i < resp.values.length; i++) {
                        $scope.chart.series.push(resp.values[i].displayName);
                        $scope.chart.data.push(resp.values[i].record);
                    }
                });
            }
        };

        $scope.loadData = function () {
            EnvironmentalService.getStatus(function (resp) {
                if (resp.length > 0) {
                    $scope.ac = resp[0];
                }
                layer.closeAll();
            });
            $scope.switchGroup(null);
        };
        var timer = $interval(function () {
            $scope.loadData();
            $interval.cancel(timer);
        }, 100, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });


        $scope.set = function () {
            if ($scope.type == "T") {
                $("#modEnvironmental .set input:eq(0)").prop("checked", true);
            } else {
                $("#modEnvironmental .set input:eq(1)").prop("checked", true);
            }
            if ($scope.group == "HOUR") {
                $("#modEnvironmental .set input:eq(2)").prop("checked", true);
            } else if ($scope.group == "DAY") {
                $("#modEnvironmental .set input:eq(3)").prop("checked", true);
            } else {
                $("#modEnvironmental .set input:eq(4)").prop("checked", true);
            }
            $("#modEnvironmental .set").fadeIn();
        };

        $scope.change = function (t) {
            $scope.type = t;
        }

        $scope.click = function (g) {
            $scope.group = g;
        }

        $scope.cancel = function () {
            $("#modEnvironmental .set").fadeOut();
        };

        $scope.ok = function () {
            $scope.switchGroup($scope.group);
            $("#modEnvironmental .set").fadeOut();
        };
    }]);



UI.Controllers.controller("EnvironmentalMultCtrl", ["$scope", "$interval", "EnvironmentalService",
    function ($scope, $interval, EnvironmentalService) {
        $scope.ac = {};
        $scope.chart = { "labels": [], "series": [], "data": [] };
        $scope.group = "HOUR";
        $scope.type = "T";
        $scope.date = new Date();

        $scope.switchGroup = function (g) {
            if (g != null) $scope.group = g;
            if ($scope.type == "T") {
                EnvironmentalService.getTemperatureHistory({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                    $scope.chart = { "labels": [], "series": [], "data": [], "colours": [] };
                    for (var i = 0; i < resp.sampleTime.length; i++) {
                        $scope.chart.labels.push(resp.sampleTime[i]);
                    }
                    for (var i = 0; i < resp.values.length; i++) {
                        $scope.chart.series.push(resp.values[i].displayName);
                        $scope.chart.data.push(resp.values[i].record);
                    }
                });

            } else {
                EnvironmentalService.getHumidityHistory({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                    $scope.chart = { "labels": [], "series": [], "data": [], "colours": [] };
                    for (var i = 0; i < resp.sampleTime.length; i++) {
                        $scope.chart.labels.push(resp.sampleTime[i]);
                    }
                    for (var i = 0; i < resp.values.length; i++) {
                        $scope.chart.series.push(resp.values[i].displayName);
                        $scope.chart.data.push(resp.values[i].record);
                    }
                });
            }
        };

        $scope.loadData = function () {
            EnvironmentalService.getList(function (resp) {
                if (resp.length > 0) {
                    $scope.deviceList = resp;
                }
                layer.closeAll();
            });
            $scope.switchGroup(null);
        };
        var timer = $interval(function () {
            $scope.loadData();
            $interval.cancel(timer);
        }, 100, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });


        $scope.set = function () {
            if ($scope.type == "T") {
                $("#modEnvironmentalMult .set input:eq(0)").prop("checked", true);
            } else {
                $("#modEnvironmentalMult .set input:eq(1)").prop("checked", true);
            }
            if ($scope.group == "HOUR") {
                $("#modEnvironmentalMult .set input:eq(2)").prop("checked", true);
            } else if ($scope.group == "DAY") {
                $("#modEnvironmentalMult .set input:eq(3)").prop("checked", true);
            } else {
                $("#modEnvironmentalMult .set input:eq(4)").prop("checked", true);
            }
            $("#modEnvironmentalMult .set").fadeIn();
        };

        $scope.change = function (t) {
            $scope.type = t;
        }

        $scope.click = function (g) {
            $scope.group = g;
        }

        $scope.cancel = function () {
            $("#modEnvironmentalMult .set").fadeOut();
        };

        $scope.ok = function () {
            $scope.switchGroup($scope.group);
            $("#modEnvironmentalMult .set").fadeOut();
        };
    }]);



UI.Controllers.controller("StatCtrl", ["$scope", "$interval", "StatService",
    function ($scope, $interval, StatService) {
        $scope.energies = { labels: [], data: [] };
        $scope.pue = {};
        $scope.chartEnergy = {};
        $scope.chartPue = {};

        $scope.group = "HOUR";
        $scope.type = "E";
        $scope.date = new Date();



        $scope.switchGroup = function (g) {
            if (g != null) $scope.group = g;
            if ($scope.type == "E") {
                StatService.getEnergyChart({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                    $scope.chart = { labels: [], series: [], data: [] };
                    for (var i = 0; i < resp.sampleTime.length; i++) {
                        $scope.chart.labels.push(resp.sampleTime[i]);
                    }
                    for (var i = 0; i < resp.values.length; i++) {
                        $scope.chart.series.push(resp.values[i].displayName);
                        $scope.chart.data.push(resp.values[i].record);
                    }
                });

            } else {
                StatService.getPueChart({ type: $scope.group, date: $scope.date.Format("yyyy-MM-dd") }, function (resp) {
                    $scope.chart = { labels: [], series: [], data: [] };
                    for (var i = 0; i < resp.sampleTime.length; i++) {
                        $scope.chart.labels.push(resp.sampleTime[i]);
                    }
                    for (var i = 0; i < resp.values.length; i++) {
                        $scope.chart.series.push(resp.values[i].displayName);
                        $scope.chart.data.push(resp.values[i].record);
                    }
                });
            }
        };

        $scope.loadData = function () {

            StatService.getEnergyStat(function (resp) {
                $scope.energies = { labels: [], data: [] };
                angular.forEach(resp, function (data) {
                    $scope.energies.labels.push(data.displayName + ":" + data.value + "%");
                    $scope.energies.data.push(data.value);
                });
                //console.debug($scope.energies);
                layer.closeAll();
            });
            StatService.getPueStat(function (resp) {
                $scope.pue = resp[0];
                $scope.pue.deg = 90 * $scope.pue.pue - 180;
                $("td.pue .chart span").css("transform", "rotate(" + $scope.pue.deg.toFixed(0) + "deg)");
                layer.closeAll();
            });
            $scope.switchGroup(null);
        };

        var timer = $interval(function () {
            $scope.loadData();
            $interval.cancel(timer);
        }, 100, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });


        $scope.set = function () {
            if ($scope.type == "E") {
                $("#modStat .set input:eq(0)").prop("checked", true);
            } else {
                $("#modStat .set input:eq(1)").prop("checked", true);
            }
            if ($scope.group == "HOUR") {
                $("#modStat .set input:eq(2)").prop("checked", true);
            } else if ($scope.group == "DAY") {
                $("#modStat .set input:eq(3)").prop("checked", true);
            } else {
                $("#modStat .set input:eq(4)").prop("checked", true);
            }
            $("#modStat .set").fadeIn();
        };

        $scope.change = function (t) {
            $scope.type = t;
        }

        $scope.click = function (g) {
            $scope.group = g;
        }

        $scope.cancel = function () {
            $("#modStat .set").fadeOut();
        };

        $scope.ok = function () {
            $scope.switchGroup($scope.group);
            $("#modStat .set").fadeOut();
        };
    }]);

UI.Controllers.controller("VideoCtrl", ["$scope", "$interval", "VideoService", "$sce",
    function ($scope, $interval, VideoService, $sce) {

        /*var timer = $interval(function () {
            $scope.loadCamera(null);
        }, 500, 0);*/

        $scope.Cameras = [];
        $scope.Camera = null;
        /*$scope.Index = 1;*/

        $scope.loadCamera = function (camera) {
            if (camera != null) {
                angular.forEach($scope.Cameras, function (c) {
                    c.on = false;
                });
                $scope.Camera = camera;
                $scope.on = true;
            }
            $scope.Index = $scope.Index + 1;
            $scope.Camera.url = $scope.Camera.video + "&n=" + Math.random();
        };

        $scope.loadData = function () {
            VideoService.getList(function (data) {
                $scope.Cameras = data;
                $scope.loadCamera($scope.Cameras[0]);
                layer.closeAll();
            });
        };

        $scope.loadData();
        /*
        $scope.$on("$destroy", function () {
            $interval.cancel(timer);
        });*/
    }]);

UI.Controllers.controller("NetCtrl", ["$scope", "$interval", "NetService",
    function ($scope, $interval, NetService) {
        $scope.net = { state: "0", stateText: "", displayName: "", speed: "10" };
        $scope.loadData = function () {
            NetService.getStatus(function (resp) {
                if (resp.length > 0) {
                    $scope.net = resp[0];
                    $scope.net.stateText = $scope.net.state == "1" ? "正常" : "异常";
                }
                layer.closeAll();
            });
        };
        var timer = $interval(function () {
            $scope.loadData();
            $interval.cancel(timer);
        }, 100, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });
    }]);


UI.Controllers.controller("AssetsCtrl", ["$scope", "$interval", "AssetsService",
    function ($scope, $interval, AssetsService) {
        $scope.assets = [];
        $scope.itemClick = function (item) {
            angular.forEach($scope.assets, function (data) {
                data.focus = false;
            });
            item.focus = true;
            $(".zone .line").css("left", item.posX + "px")
            .css("top", item.posY + "px")
            .css("width", item.posW + "px")
            .css("height", item.posH + "px");
        };
        $scope.loadData = function () {
            AssetsService.getList(function (resp) {
                $scope.assets = resp;
                if ($scope.assets.length > 0) {
                    $scope.assets[0].focus = true;
                    $(".zone .line").css("left", $scope.assets[0].posX + "px")
                    .css("top", $scope.assets[0].posY + "px")
                    .css("width", $scope.assets[0].posW + "px")
                    .css("height", $scope.assets[0].posH + "px");
                }
                layer.closeAll();
            });
        };
        var timer = $interval(function () {
            $scope.loadData();
            $interval.cancel(timer);
        }, 100, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });
    }]);

UI.Controllers.controller("AlertCtrl", ["$scope", "$interval", "$log", "$stateParams", "AlertService",
    function ($scope, $interval, $log, $stateParams, AlertService) {
        $scope.categories = [{ name: "所有警告", key: "all", selected: true }, { name: "电力", key: "power", selected: false }, { name: "安全", key: "safe", selected: false }, { name: "环境", key: "environmental", selected: false }, { name: "其他", key: "other", selected: false }];
        console.info($stateParams.key);
        $scope.category = $stateParams.key;
        $scope.typies = [{ key: 1, name: "最近一天", selected: true }, { key: 2, name: "最近一周", selected: false }, { key: 3, name: "最近一月", selected: false }, { key: 4, name: "所有", selected: false }];
        $scope.type = $scope.typies[0];
        if ($scope.category == undefined)
            $scope.category = $scope.categories[0].key;
        $scope.currentPage = 1,
        $scope.totalItems = 0;

        $scope.loadData = function () {
            console.info($scope.category);
            AlertService.getPagedList({ type:$scope.type.key, category: $scope.category, pageNo: $scope.currentPage, pageSize: 14 }, function (resp) {
                $scope.list = resp.list;
                if ($scope.totalItems == 0) {
                    $scope.totalItems = resp.totalItems;
                    $scope.totalPages = resp.pageCount;
                }
                layer.closeAll();
            });
        };
        var timer = $interval(function () {
            $scope.loadData();
            $interval.cancel(timer);
        }, 100, 0);
        $scope.$on("$destroy", function () {
            if (timer != null) {
                $interval.cancel(timer);
            }
        });

        $scope.pageChanged = function () {
            $scope.loadData();
        };

        $scope.switchType = function (type) {
            angular.forEach($scope.typies, function (data) {
                data.selected = false;
            });
            type.selected = true;
            $scope.type = type;
            $scope.currentPage = 1;
            $scope.loadData();
        };

        $scope.switchCategory = function (cate) {
            angular.forEach($scope.categories, function (data) {
                data.selected = false;
            });
            cate.selected = true;
            $scope.category = cate.key;
            $scope.currentPage = 1;
            $scope.loadData();
        };
    }]);


UI.Controllers.controller("SetCtrl", ["$scope", "$interval",
    function ($scope, $interval) {
        $scope.category = null;
        $scope.switchCategory = function (c) {
            switch (c) {
                case "net":
                    if (NetWorkJsInt)
                        NetWorkJsInt.Setting();
                    else
                        alert("NetWorkJsInt not found");
                    break;
                case "time":
                    if (TimeJsInt)
                        TimeJsInt.Setting();
                    else
                        alert("TimeJsInt not found");
                    break;
                default:
                    $scope.category = c;
                    break;
            }
        };
        layer.closeAll();
    }]);


UI.Controllers.controller("SetPasswordCtrl", ["$scope", "SystemService",
    function ($scope, SystemService) {
        $scope.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "Enter"];
        $scope.oldPwd = "";
        $scope.newPwd = "";
        $scope.confirmPwd = "";
        $scope.result = "";

        $scope.savePwd = function () {
            $scope.result = "";
            if ($scope.oldPwd.length == 0) {
                $scope.result = "请输入旧密码";
            } else if ($scope.newPwd.length == 0) {
                $scope.result = "请输入新密码";
            } else if ($scope.newPwd != $scope.confirmPwd) {
                $scope.reset = "两次密码输入不一致";
            } else {
                SystemService.modifyLoginPwd({ account: $scope.account, oldPwd: $scope.oldPwd, newPwd: $scope.newPwd }, function (resp) {
                    if (resp.length > 0) {
                        if (resp[0].result) {
                            $scope.result = "修改密码成功";
                            $("#modSet .password .result .succ").show();
                        } else {
                            $scope.result = resp[0].msg;
                        }
                    }
                });
            }
        };
    }]);


UI.Controllers.controller("SetUsersCtrl", ["$scope", "SystemService",
    function ($scope, SystemService) {
        $scope.list = [];
        $scope.user = null;

        $scope.load = function () {
            SystemService.getUserList(null, function (resp) {
                $scope.list = resp;
            });
        };
        $scope.load();

        $scope.add = function () {
            $scope.user = {id:0, account:"", password:"", isnew:true};
        };

        $scope.edit = function (u) {
            $scope.user = u;
            $scope.user.pwd = "";
        };

        $scope.del = function (u) {
            layer.confirm("您确定要删除用户[" + u.account + "]", function () {
                SystemService.delUser({ id: u.id }, function (resp) {
                    layer.msg("删除成功");
                    $scope.load();
                });
                layer.closeAll();
            }, function () {
                layer.closeAll();
            })
        };

        $scope.save = function () {
            if ($scope.user.account == "") {
                layer.msg("请输入账号");
            }
            else {
                if ($scope.user.id == 0) {
                    SystemService.addUser($scope.user, function (resp) {
                        if (resp[0].result) {
                            layer.msg("添加成功");
                            $scope.user = null;
                            $scope.load();
                        } else {
                            layer.msg(resp[0].msg);
                        }
                    });
                } else {
                    SystemService.editUser($scope.user, function (resp) {
                        if (resp[0].result) {
                            layer.msg("修改成功");
                            $scope.user = null;
                            $scope.load();
                        } else {
                            layer.msg(resp[0].msg);
                        }
                    });
                }
            }
        };
    }]); 


UI.Controllers.controller("SetAccessCtrl", ["$scope", "SystemService",
    function ($scope, SystemService) {
        $scope.nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "Enter"];
        $scope.password = "";
        $scope.password2 = "";
        $scope.pressPwd = function (num) {
            if (num == "Clear") {
                $scope.password = "";
                return;
            }
            if (num == "Enter") {
                $scope.password2 = "";
                $("#modSet .password .first").hide();
                $("#modSet .password .second").show();
                $("#modSet .password .result").hide();
                return;
            }
            if ($scope.password.length < 4) {
                $scope.password += num;
            }

            if ($scope.password.length == 4) {
                $scope.password2 = "";
                $("#modSet .password .first").hide();
                $("#modSet .password .second").show();
                $("#modSet .password .result").hide();
            }
        }

        $scope.reset = function () {
            $scope.password = "";
            $scope.password2 = "";
            $("#modSet .password .second").hide();
            $("#modSet .password .first").show();
            $("#modSet .password .result").hide();
        };

        $scope.savePwd = function () {
            if ($scope.password != $scope.password2) {
                $("#modSet .password .second").hide();
                $("#modSet .password .first").hide();
                $("#modSet .password .result").show();
                $("#modSet .password .result div").hide();
                $("#modSet .password .result .warn").show();
                $("#modSet .password .result .warn label").html("两次密码输入不一致，请重新设置");
                return;
            }

            SystemService.modifyUnlockPwd({ password: $scope.password }, function (resp) {
                $("#modSet .password .second").hide();
                $("#modSet .password .first").hide();
                $("#modSet .password .result").show();
                $("#modSet .password .result div").hide();
                if (resp.length > 0) {
                    if (resp[0].result) {
                        $("#modSet .password .result .succ").show();
                    } else {
                        $("#modSet .password .result .warn").show();
                        $("#modSet .password .result .warn label").html(resp[0].msg);
                    }
                }
            });
        };

        $scope.pressPwdAg = function (num) {
            if (num == "Clear") {
                $scope.password2 = "";
                return;
            }
            if (num == "Enter") {
                $scope.savePwd();
                return;
            }

            if ($scope.password2.length < 4) {
                $scope.password2 += num;
            }

            if ($scope.password2.length == 4) {
                $scope.savePwd();
            }
        }
    }]);


UI.Controllers.controller("SetVideoCtrl", ["$scope", "VideoService",
    function ($scope, VideoService) {
        $scope.Cameras = [];
        VideoService.getList(function (data) {
            $scope.Cameras = data;
        });
        $scope.save = function () {
            angular.forEach($scope.Cameras, function (camera) {
                if (camera.editable == "1") {
                    VideoService.saveInfo({ id: camera.id, video: camera.video }, function (resp) { });
                }
            });
            $scope.result = "保存设置成功";
        };
    }]);


UI.Controllers.controller("SetAlertDefineCtrl", ["$scope", "AlertService",
    function ($scope, AlertService) {
        $scope.currentPage = 1,
        $scope.totalItems = 0;

        $scope.loadData = function () {
            AlertService.getDefines({ pageNo: $scope.currentPage, pageSize: 10 }, function (resp) {
                $scope.list = resp.list;
                if ($scope.totalItems == 0) {
                    $scope.totalItems = resp.totalItems;
                    $scope.totalPages = resp.pageCount;
                }
            });
        };
        $scope.loadData();
        $scope.pageChanged = function () {
            $scope.loadData();
        };
        $scope.save = function (de) {
            AlertService.saveDefine(de, function (resp) {
                layer.msg(resp.msg);
            });
        };
        $scope.reset = function () {
            layer.confirm("您确定要将报警设置恢复到出厂状态吗?", function () {
                layer.closeAll();
                AlertService.resetDefines(null, function (resp) {
                    layer.msg(resp.msg);
                    if (resp.code == "0") {
                        $scope.currentPage = 1;
                        $scope.loadData();
                    }
                });
            }, function () {
                layer.closeAll();
            })
        };
    }]); 