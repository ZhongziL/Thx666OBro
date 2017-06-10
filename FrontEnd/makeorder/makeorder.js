window.onload = function () {
    login_register_part();

    // TODO: 买票，需跳页面带参数
    function buy_ticket(movie_name) {
        console.log(movie_name);
        // window.location.href="http://www.baidu.com"; 
    }

    function DirectionClick(direct) {
        return function () {
            var ul = $("#poster-part");
            var liCount = ul.children("li").length;
            // 页面容量和左边藏了几个
            var maxCount = 5;
            var hidCount = 0 - parseInt(ul.css("margin-left")) / 210;
            if (liCount <= maxCount) // 页面上的就是全部
                return;

            if (direct === "left" && liCount - hidCount > maxCount) { // 左边还能藏
                ul.css("margin-left", (0 - (hidCount + 1) * 210) + "px");
            } else if (direct === "right" && hidCount > 0) {
                ul.css("margin-left", (0 - (hidCount - 1) * 210) + "px");
            }
        };
    }

    $("#left-button").click(DirectionClick("left"));
    $("#right-button").click(DirectionClick("right"));

    var buy_buttons = $(".buy-ticket");
    for (var i = buy_buttons.length - 1; i >= 0; i--) {
        $(buy_buttons[i]).click(
            (function (i) {
                return function () {
                    var d = $(buy_buttons[i]);
                    d = d.next();
                    var p = $(d.children());
                    buy_ticket(p.text());
                };
            })(i));
    }

    var lis = $("li");
    for (i = lis.length - 1; i >= 0; i--) {
        (function (li) {
            li.mouseover(function () {
                var bros = li.siblings();
                for (var j = bros.length - 1; j >= 0; j--) {
                    $(bros[j]).children(".shade").css("visibility", "visible");
                }
            });
            li.mouseleave(function () {
                var bros = li.siblings();
                for (var j = bros.length - 1; j >= 0; j--) {
                    $(bros[j]).children(".shade").css("visibility", "hidden");
                }
            });
        })($(lis[i]));
    }

//    TODO: 除了登陆注册，其他事件都还没有写
};
