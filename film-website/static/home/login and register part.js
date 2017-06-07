function login_register_part() {
    // 绑定组件的事件，这些在不同状态下不会有影响
    $("#login").click(function(event) { // 切换登录的按钮
        if ($("#login").html() == "已有账号，去登录") {
            $("#login").html("还没有账号，去注册");
            $("#login+button").html("登录");
        } else {
            $("#login").html("已有账号，去登录");
            $("#login+button").html("注册");
        }
    });

    $("#close").click(function() { // 关闭弹窗
        if ($("#login-register").css("visibility") == "visible") {
            $("#login-register").css("visibility", "hidden");
            $("body").css("height", "auto");
            $("body").css("overflow", "unset");
            document.onmousewheel = function() {
                return true;
            };
        }
    });

    $("#login+button").click(function(event) { // 注册或登录
        //$("#login+button").attr('disabled', 'disabled');
        // 包装数据
        username_input = $("[name='phonenum']").html();
        password_input = $("[name='password']").html();
        check_word_input = $("[name='check-word']").html();

        // TODO: 未完善
        if ($("#login+button").html() == "注册")
            post_url = "/register";
        else
            post_url = "/register";


        $.post(post_url, {
                username: username_input,
                password: password_input,
                check_word: check_word_input
            },
            function(data, textStatus, xhr) {
                if (textStatus == "true") { // 登录或注册成功
                    document.cookie = data.split(";")[0];
                }
                login_status();
                return false;
            }
        );

    });

    $("#logout button").click(function(event) { // 切换到未登录
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // 删除cookie
        logout_status();
    });

    // 已经登录的情况下的事件绑定
    function login_status() {
        $("#head-icon").click(null);
        $("#head-icon").mouseover(function(event) {
            $("#logout").css('visibility', 'visible');
        });
        $("#logout").mouseleave(function(event) {
            $("#logout").css('visibility', 'hidden');
        });
    }

    // 未登录的情况下的事件绑定
    function logout_status() {
        $("#head-icon").mouseover(null); // 删除鼠标覆盖事件
        $("#head-icon").click(function() { // 增加点击弹窗事件
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
    }

    // 检查cookie是否已经登录
    if (document.cookie.length != 0) {
        cookies = document.cookie.split(";");
        cookies.each(function(index, cookie) {
            if (cookie.index("username=") == 0)
                username = cookie.substring("username=".length, cookie.length);
        });
    }

    if (typeof(username) != "undefined") { // 已登录
        // 请求头像
        // url_get = "?username=" + username;
        // $.get(url_get, function(data) {
        //     $("#head-icon").attr('src', data);
        // });
        login_status();
    } else { // 未登录
        $("#login-register").css('visibility', 'hidden');
        logout_status();
    }
}
