function login_register_part() {
    // 相关控件
    var phone_num_input = $("[name='phonenum']");
    var password_input = $("[name='password']");
    var check_word_input = $("[name='check-word']");

    // 输入限制
    phone_num_input.keyup(function() {
        var reg = new RegExp('[0-9]+');
        var val = phone_num_input.val();
        phone_num_input.val(val.match(reg));
    });
    password_input.keyup(function() {
        var reg = new RegExp('[a-zA-Z0-9]+');
        var val = password_input.val();
        password_input.val(val.match(reg));
    });
    check_word_input.keyup(function() {
        var val = check_word_input.val();
        if (val.length >= 4) {
            check_word_input.val(val.substring(0, 4));
        } else {
            var reg = new RegExp('[0-9]+');
            check_word_input.val(val.match(reg));
        }
    });

    // 绑定组件的事件，这些在不同状态下不会有影响
    var login_toggle = $("#login");
    var login_button = login_toggle.next("button");
    login_toggle.click(function() { // 切换登录的按钮
        if (login_toggle.html() === "已有账号，去登录") {
            login_toggle.html("还没有账号，去注册");
            login_button.html("登录");
        } else {
            login_toggle.html("已有账号，去登录");
            login_button.html("注册");
        }
    });

    $("#get-check-word").click(function() {  // 获取验证码
        var reg = new RegExp("^[0-9]{11}$");
        var phone_num = phone_num_input.val();
        if (!reg.test(phone_num)) {  // 号码长度不对
            $("#error-num").css('visibility', 'visible');
        } else {
            // TODO: 完善验证码URL
            var get_check_word_button = $("#get-check-word");
            get_check_word_button.css({
                'disabled': 'disabled',
                'background-color': 'gray'
            });
            var sec_s = 60; // 60s后才能重新获取
            var clock = setInterval(function() {
                if (sec_s === 0) {
                    get_check_word_button.css({
                        'disabled': '',
                        'background-color': '#C4263F'
                    });
                    get_check_word_button.html("重新获取");
                    clearInterval(clock);
                } else {
                    get_check_word_button.html(--sec_s + "s后可重新获取");
                }
            }, 1000);
            // $.get('check word?username='+ phone_num, function(data) {
            // TODO: 获取验证码之后的成功失败相应操作
            // });
        }
    });

    // 关闭错误提示
    phone_num_input.focus(function() {
        $("#error-num").css('visibility', 'hidden');
    });
    password_input.focus(function() {
        $("#error-pwd").css('visibility', 'hidden');
    });
    check_word_input.focus(function() {
        $("#error-check").css('visibility', 'hidden');
    });

    var login_register = $("#login-register");
    $("#close").click(function() { // 关闭弹窗
        if (login_register.css("visibility") === "visible") {
            login_register.css("visibility", "hidden");
            $(".error").each(function(index, el) {
                $(el).css("visibility", "hidden");
            });
            var body = $("body");
            body.css("height", "auto");
            body.css("overflow", "unset");
            document.onmousewheel = function() {
                return true;
            };
        }
    });

    login_button.click(function() { // 注册或登录
        var username   = phone_num_input.val();
        var password   = password_input.val();
        var check_word = check_word_input.val();

        // 校验
        var flag = true;
        if (!new RegExp("[0-9]{11}").test(username)) {
            flag = false;
            $("#error-num").css('visibility', 'visible');
        }
        if (!new RegExp("[a-zA-Z0-9]{6,20}").test(password)) {
            flag = false;
            $("#error-pwd").css('visibility', 'visible');
        }
        if (!new RegExp("[0-9]{4}").test(check_word)) {
            flag = false;
            $("#error-check").css('visibility', 'visible');
        }
        if (!$('[name="agree"]').is(':checked')) {
            flag = false;
            alert("请先阅读并同意用户注册协议！");
        }

        if (flag) {
            // TODO: 未完善
            var post_url = "";
            login_button.attr('disabled', 'disabled');
            login_button.css("background-color", "gray");
            if (login_button.html() === "注册")
                post_url = "";
            else
                post_url = "";
            $.post(post_url,
                { // 数据
                    username: username,
                    password: password,
                    check_word: check_word
                },
                function(data, textStatus) {
                    if (textStatus === "true") { // 登录或注册成功
                        document.cookie = data.split(";")[0];
                        login_status();
                    } else {    // 登录失败
                        alert("手机号或者密码错误？");
                        login_button.attr('disabled', '');
                        login_button.css("background-color", "#C4263F");
                    }
                }
            );
        }
    });

    $("#logout").children("button").click(function() { // 切换到未登录
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // 删除cookie
        logout_status();
    });

    // 已经登录的情况下的事件绑定
    var head_icon =  $("#head-icon");
    function login_status() {
        // TODO: 可能需要跳个人页面
        head_icon.click(null);
        head_icon.mouseover(function() {
            $("#logout").css('visibility', 'visible');
        });
        $("#logout").mouseleave(function() {
            $("#logout").css('visibility', 'hidden');
        });
    }

    // 未登录的情况下的事件绑定
    function logout_status() {
        head_icon.mouseover(null); // 删除鼠标覆盖事件
        head_icon.click(function() { // 增加点击弹窗事件
            if (login_register.css("visibility") === "hidden") {
                login_register.css("visibility", "visible");
                login_button.css("background-color", "#C4263F");
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
    if (document.cookie.length !== 0) {
        var cookies = document.cookie.split(";");
        cookies.each(function(index, cookie) {
            if (cookie.index("username=") === 0)
                var username = cookie.substring("username=".length, cookie.length);
        });
    }

    if (typeof(username) !== "undefined") { // 已登录
        // 请求头像
        // url_get = "?username=" + username;
        // $.get(url_get, function(data) {
        //     $("#head-icon").attr('src', data);
        // });
        login_status();
    } else { // 未登录
        login_register.css('visibility', 'hidden');
        logout_status();
    }
}
