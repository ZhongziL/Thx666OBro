function login_register_part() {
    // 输入限制
    $("[name='phonenum']").keyup(function(event) {
        reg = new RegExp('[0-9]+');
        val = $("[name='phonenum']").val();
        $("[name='phonenum']").val(val.match(reg));
    });
    $("[name='password']").keyup(function(event) {
        reg = new RegExp('[a-zA-Z0-9]+');
        val = $("[name='password']").val();
        $("[name='password']").val(val.match(reg));
    });
    $("[name='check-word']").keyup(function(event) {
        val = $("[name='check-word']").val();
        if (val.length >= 4) {
            $("[name='check-word']").val(val.substring(0, 4));
        } else {
            reg = new RegExp('[0-9]+');
            $("[name='check-word']").val(val.match(reg));
        }
    });

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

    $("#get-check-word").click(function(event) {  // 获取验证码
        var reg = new RegExp("^[0-9]{11}$");
        phone_num = $("[name='phonenum']").val()
        if (!reg.test(phone_num)) {  // 号码长度不对
            $("#error-num").css('visibility', 'visible');
        } else {
            // TODO: 完善验证码URL
            $("#get-check-word").css({
                'disabled': 'disabled',
                'background-color': 'gray'
            });
            sec_s = 60; // 60s后才能重新获取
            clock = setInterval(function() {
                if (sec_s == 0) {
                    $("#get-check-word").css({
                        'disabled': '',
                        'background-color': '#C4263F'
                    });;
                    $("#get-check-word").html("重新获取");
                    clearInterval(clock);
                } else {
                    $("#get-check-word").html(--sec_s + "s后可重新获取");
                }
            }, 1000);
            // $.get('check word?username='+ phone_num, function(data) {
            // TODO: 获取验证码之后的成功失败相应操作
            // });
        }
    });

    // 关闭错误提示
    $("[name='phonenum']").focus(function(event) {
        $("#error-num").css('visibility', 'hidden');
    });
    $("[name='password']").focus(function(event) {
        $("#error-pwd").css('visibility', 'hidden');
    });
    $("[name='check-word']").focus(function(event) {
        $("#error-check").css('visibility', 'hidden');
    });

    $("#close").click(function() { // 关闭弹窗
        if ($("#login-register").css("visibility") == "visible") {
            $("#login-register").css("visibility", "hidden");
            $(".error").each(function(index, el) {
                $(el).css("visibility", "hidden");
            });
            $("body").css("height", "auto");
            $("body").css("overflow", "unset");
            document.onmousewheel = function() {
                return true;
            };
        }
    });

    $("#login+button").click(function(event) { // 注册或登录
        username_input   = $("[name='phonenum']").val();
        password_input   = $("[name='password']").val();
        check_word_input = $("[name='check-word']").val();

        // 校验
        flag = true;
        if (!RegExp("[0-9]{11}").test(username_input)) {
            flag = false;
            $("#error-num").css('visibility', 'visible');
        }
        if (!RegExp("[a-zA-Z0-9]{6,20}").test(password_input)) {
            flag = false;
            $("#error-pwd").css('visibility', 'visible');
        }
        if (!RegExp("[0-9]{4}").test(check_word_input)) {
            flag = false;
            $("#error-check").css('visibility', 'visible');
        }
        if (!$('[name="agree"]').is(':checked')) {
            flag = false;
            alert("请先阅读并同意用户注册协议！");
        }

        if (flag) {
            // TODO: 未完善
            $("#login+button").attr('disabled', 'disabled');
            $("#login+button").css("background-color", "gray");
            if ($("#login+button").html() == "注册")
                post_url = "";
            else
                post_url = "";
            $.post(post_url,
                { // 数据
                    username: username_input,
                    password: password_input,
                    check_word: check_word_input
                },
                function(data, textStatus, xhr) {
                    if (textStatus == "true") { // 登录或注册成功
                        document.cookie = data.split(";")[0];
                        login_status();
                    } else {    // 登录失败
                        alert("手机号或者密码错误？");
                        $("#login+button").attr('disabled', '');
                        $("#login+button").css("background-color", "#C4263F");
                    }
                }
            );
        }
    });

    $("#logout button").click(function(event) { // 切换到未登录
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // 删除cookie
        logout_status();
    });

    // 已经登录的情况下的事件绑定
    function login_status() {
        // TODO: 可能需要跳个人页面
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
                $("#login+button").css("background-color", "#C4263F");
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
