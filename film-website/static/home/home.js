window.onload = function() {
    login_register_part();

    // TODO: 买票，需跳页面带参数
    function buy_ticket(movie_name) {
        console.log(movie_name);
        // window.location.href="http://www.baidu.com"; 
    }

    function DirectionClick(num, direct) {
        return function() {
            if (num == 0) {
                ul = $("#showing-list ul");
                licount = $("#showing-list li").length;
            } else {
                ul = $("#show-soon-list ul");
                licount = $("#show-soon-list li").length;
            }
            // 页面容量和左边藏了几个
            maxCount = $(".list-part")[0].clientWidth / 210;
            hidCount = 0 - parseInt(ul.css("margin-left")) / 210;
            if (licount <= maxCount) // 页面上的就是全部
                return;

            if (direct == "left" && licount - hidCount > maxCount) { // 左边还能藏
                ul.css("margin-left", (0 - (hidCount + 1) * 210) + "px");
            } else if (direct == "right" && hidCount > 0) {
                ul.css("margin-left", (0 - (hidCount - 1) * 210) + "px");
            }
        };
    };
    $(".left-button")[0].onclick = DirectionClick(0, "right");
    $(".right-button")[0].onclick = DirectionClick(0, "left");
    $(".left-button")[1].onclick = DirectionClick(1, "right");
    $(".right-button")[1].onclick = DirectionClick(1, "left");

    function show_prevue() {
        $("#video-part-poster").removeClass("show");
        $("#video-part-poster").addClass("hidden");
        $("#video-part-message").removeClass("show");
        $("#video-part-message").addClass("hidden");
    }
    $("#video-part-poster").click(show_prevue);
    $("#video-part-message").click(show_prevue);

    buy_buttons = $(".buy-ticket");
    for (var i = buy_buttons.length - 1; i >= 0; i--) {
        $(buy_buttons[i]).click(
            (function(i) {
                return function() {
                    d = $(buy_buttons[i]);
                    d = d.next();
                    p = $(d.children());
                    buy_ticket(p.text());
                };
            })(i));
    }

    lis = $("li");
    for (var i = lis.length - 1; i >= 0; i--) {
        (function(li) {
            li.mouseover(function() {
                bros = li.siblings();
                for (var j = bros.length - 1; j >= 0; j--) {
                    $(bros[j]).children(".shade").css("visibility", "visible");
                }
            });
            li.mouseleave(function() {
                bros = li.siblings();
                for (var j = bros.length - 1; j >= 0; j--) {
                    $(bros[j]).children(".shade").css("visibility", "hidden");
                }
            });
        })($(lis[i]));
    }
};
