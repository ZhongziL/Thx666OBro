function play_video() {
    function getVideoSrc(movie_name) {
        return "http://player.youku.com/player.php/sid/XMTUzOTM5MjAxNg==/v.swf";
    }

    $(".play").each(function(index, button) {
        src = getVideoSrc($(button).parents("li").children('message').children('.name').html());
        $(button).click(function(event) {
            $("#play-video p").after("<embed src='"+ src
                +"' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>");
            $("#play-video").css('visibility', 'visible');
            $("body").css({
                'height': '100vh',
                'overflow-y': 'hidden',
                'overflow-x': 'scroll'
            });
        });
    });
    $("#play-video > p").click(function(event) {
        $("#play-video").css('visibility', 'hidden');
        $("#play-video embed").remove();
        $("body").css("height", "auto");
        $("body").css("overflow", "unset");
    });
}
