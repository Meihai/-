var areaTime = 1000;
var flashTime = 500;
var index = "index";

var array = ["box", "pdu", "ups", "ac", "stat", "video", "net", "assets", "alert", "set"];
for (var i = 0; i < array.length; i++) {
    $("body").append('<div class="page '+array[i]+'" module="'+array[i]+'">'+$(".hide").html()+'</div>');
}

$(".page").each(function () {
    var module = $(this).attr("module");
    $(this).append("<img src='images/" + module + ".jpg?1=1' alt='" + module + "'/>");
});

$(".area").each(function () {
    var top = $(this).attr("top");
    var left = $(this).attr("left");
    var width = $(this).attr("width");
    var height = $(this).attr("height");
    var url = $(this).attr("url");
    $(this).css("top", top + "px").css("left", left + "px").css("width", width + "px").css("height", height + "px");
    $(this).click(function () {
        $(".page").hide();
        var page = $("." + url);
        var ctrl = $(page).find(".ctrl");
        $(page).fadeIn(flashTime);
        if ($(ctrl).length > 0) {
            $(ctrl).hide();
            $(page).find(".c1").unbind("click");
            $(page).find(".c2").unbind("click");
            $(page).find(".c3").unbind("click");
            var ran = Math.round(Math.random() * 10);
            if (ran % 2 == 0) {
                $(page).find(".c1").show();
            } else {
                $(page).find(".c2").show();
            }
            $(page).find(".c1").click(function () {
                $(this).hide();
                $(this).parent().find(".c3").show();
                console.info("c1");
            });
            $(page).find(".c2").click(function () {
                $(this).hide();
                $(this).parent().find(".c3").show();
                console.info("c2");
            });
            $(page).find(".c3").click(function () {
                $(this).hide();
                $(this).parent().find(".c1").show();
                console.info("c3");
            });
        }
    });
});

$(".ctrl").each(function () {
    var top = $(this).attr("top");
    var left = $(this).attr("left");
    var width = $(this).attr("width");
    var height = $(this).attr("height");
    $(this).css("top", top + "px").css("left", left + "px").css("width", width + "px").css("height", height + "px");
});

$("." + index).fadeIn(flashTime);