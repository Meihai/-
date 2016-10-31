//自定义标签

UI.Directives.directive("jdEvent", [function () {
    return {
        link: function (scope, element, attr) {
            var list = attr["jdEvent"].split('|');
            for (var i = 0; i < list.length; i++)
            {
                var array = list[i].split(',');
                Event.Register(array[0], scope[array[1]]);
            }
        }
    };
}]);