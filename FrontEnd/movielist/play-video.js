function play_video() {
    function getVideoSrc(movie_name) {
        return "http://player.youku.com/player.php/sid/XMTUzOTM5MjAxNg==/v.swf";
    }

    $(".play").each(function(index, button) {
        $(button).click(function(event) {
            $("#play-video").css('visibility', 'visible');
            $("body").css({
                'height': '100vh',
                'overflow-y': 'hidden',
                'overflow-x': 'scroll'
            });

            movie_name = $(button).parents("li").children('.message').children('.name').html();
            // TODO: URL需补全
            // $.get('?moviename=' + movie_name, function(data) {
            //     $("#play-video p").after("<embed src='"+ data
            //         +"' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>");
            // });
        });
    });
    $("#play-video > p").click(function(event) {
        $("#play-video").css('visibility', 'hidden');
        $("#play-video embed").remove();
        $("body").css("height", "auto");
        $("body").css("overflow", "unset");
    });
}
