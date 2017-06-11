window.onload = function () {
    login_register_part();
    // 事件绑定
    // var choices = $("#choices").children("p");
    // $(choices[0]).click(function() {
    //     if (!$(choices[0]).hasClass("cinema-comment-selected")) {
    //         $(choices[0]).addClass("cinema-comment-selected");
    //         $(choices[1]).removeClass("cinema-comment-selected");
    //         $("#cinema-part").css("visibility", "visible");
    //         $("#comment-part").css("visibility", "hidden");
    //     }
    // });
    // $(choices[0]).click();
    // $(choices[1]).click(function() {
    //     if (!$(choices[1]).hasClass("cinema-comment-selected")) {
    //         $(choices[1]).addClass("cinema-comment-selected");
    //         $(choices[0]).removeClass("cinema-comment-selected");
    //         $("#cinema-part").css("visibility", "hidden");
    //         $("#comment-part").css("visibility", "visible");
    //     }
    // });

    // TODO: 获取各种信息啊
    var movie_name = window.location.href.split('?')[1];
    $.get('/getFilmProFile?film_name=' + movie_name, function (data) {
        $("#video-poster img").attr("src", data.picture_url);
        $("#movie-name").html(data.film_name);
        $("#introduce span").html(data.film_detail);
        $("#movie-language span").html(data.film_classify);
        $("#directior span").html(data.show_date);
        $("#actors span").html(data.score);
        play_video(data.video_url);
    });

    $.get('/get_comment?film_name=' + movie_name, function (data, textStatus) {
        if (textStatus === "success") {
            var comments = data.data;
            comments.forEach(function (el) {
                var date = new Date(el.timeStamp);
                var dateStr = date.getYear() + date.getMonth() + date.getDay() + " " + date.getHours() + ":" + date.getMinutes();
                $("#comment-part").append('<li>' +
                    '<p><span class="comment-user">' + el.username + '</span><span class="comment-time">' + dateStr + '</span></p>' +
                    '<p class="comment-detail">' + el.content + '</p>' +
                    '</li>');
            });
        }
    });

    $("#release-comment button").click(function () {
        var username = $("#avatar-part > p > span").html();
        if (username !== "12345678900") {
            $.post("/add_comment", {
                username: username,
                file_name: movie_name,
                content: $("textarea").val()
            }, function (data, textStatus) {
                if (textStatus === "success")
                    alert("评论成功");
            })
        } else {
            alert("请先登录");
        }
    });


    $("#star-bar").click(function () {
        var x = event.pageX - $("#star-bar").offset().left;
        $("#star-bar-bottom").width(x);
        $("#star-bar-top").width(270 - x);
        x = x - 19;
        var score = Math.ceil(x / 24) - 1;
        var dec = x - score * 24;
        if (dec > 15)
            score += 1;
        else
            score += dec / 15;
        if (score >= 10)
            $("#your-score").html("10.0");
        else
            $("#your-score").html(score.toFixed(1));
    });


};
