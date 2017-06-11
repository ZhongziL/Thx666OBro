window.onload = function() {
    login_register_part();
    play_video("http://player.youku.com/player.php/sid/XMjc5ODU5OTU3Ng==/v.swf");
    $("#star-bar").click(function() {
        var x = event.pageX - $("#star-bar").offset().left;
        $("#star-bar-bottom").width(x);
        $("#star-bar-top").width(270-x);
        x = x - 19;
        var score = Math.ceil(x / 24) - 1;
        var dec = x - score * 24;
        if (dec > 15)
            score += 1;
        else
            score += dec /15;
        if (score >= 10)
            $("#your-score").html("10.0");
        else
            $("#your-score").html(score.toFixed(1));
    });
};
