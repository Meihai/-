//
//
//
var UI = {
    View: {},
    APP: angular.module("ITCabApp", ["itcabControllers", "itcabServices", "itcabDirectives", "n3-pie-chart", "chart.js", "ui.bootstrap", "ui.router", "ngSanitize"]),
    Controllers: angular.module("itcabControllers", ["itcabServices"]),
    Services: angular.module("itcabServices", ["ngResource"]),
    Directives: angular.module("itcabDirectives", ["itcabServices"])

};
var Event = {
    handles: {},
};
	
UI.APP.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/Index");
    //
    // Now set up the states
    $stateProvider
    .state('Index', {
        url: "/Index",
        templateUrl: 'Template/Index.html'
    })
    .state('Menu', {
        url: "/Index",
        templateUrl: 'Template/Index.html'
    })
    .state("Module", {
        url: "/Module/:name",
        views: {
            "": {
                templateUrl: "Template/Module.html"
            },
            "lay": {
                templateUrl: function ($stateParams) { return "Template/" + $stateParams.name + ".html" }
            }
        }
    });
});