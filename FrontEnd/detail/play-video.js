function play_video(video_src) {
    $("#play").click(function(event) {
        console.log("ri");
        $("#play-video p").after("<embed src='"+video_src+"' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>");
        $("#play-video").css('visibility', 'visible');
        $("body").css({
            'height': '100vh',
            'overflow-y': 'hidden',
            'overflow-x': 'scroll'
        });
    });
    $("#play-video > p").click(function(event) {
        $("#play-video").css('visibility', 'hidden');
        $("#play-video embed").remove();
        $("body").css("height", "auto");
        $("body").css("overflow", "unset");
    });
}
