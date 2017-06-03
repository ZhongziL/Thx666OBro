function login_register_part() {
    function login(username, password) {}

    function register(username, password) {}


    $("#login+button").click(function(event) {
        if ($("#login+button").html() == "注册")
            register();
        else
            login();
    });

    $("#login").click(function(event) {
        if ($("#login").html() == "已有账号，去登录") {
            $("#login").html("还没有账号，去注册");
            $("#login+button").html("登录");
        } else {
            $("#login").html("已有账号，去登录");
            $("#login+button").html("注册");
        }
    });
    $("#head-icon").click(function() {
        if ($("#login-register").css("visibility") == "hidden") {
            $("#login-register").css("visibility", "visible");
            $("body").css({
                'height': '100vh',
                'overflow-y': 'hidden',
                'overflow-x': 'scroll'
            });
            document.onmousewheel = function() {
                return false;
            };
        }
    });

    $("#close").click(function() {
        if ($("#login-register").css("visibility") == "visible") {
            $("#login-register").css("visibility", "hidden");
            $("body").css("height", "auto");
            $("body").css("overflow", "unset");
            document.onmousewheel = function() {
                return true;
            };
        }
    });
}
