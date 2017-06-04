function play_video() {
    movie_name = $("#movie-name").html();
    movie_src = "";

    $("#play").click(function(event) {
        $("#play-video").css('visibility', 'visible');
        $("body").css({
            'height': '100vh',
            'overflow-y': 'hidden',
            'overflow-x': 'scroll'
        });

        if (movie_src == "") {
            // TODO: 视频功能，URL需补全
            // $.get('?moviename=' + movie_name, function(data) {
            //     $("#play-video p").after("<embed src='"+ data
            //         +"' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>");
            // });
        } else {
            // $("#play-video p").after("<embed src='"+ movie_src
            //     +"' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>");
        }
    });

    $("#play-video > p").click(function(event) {
        $("#play-video").css('visibility', 'hidden');
        $("#play-video embed").remove();
        $("body").css("height", "auto");
        $("body").css("overflow", "unset");
    });
}
