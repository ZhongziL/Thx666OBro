function child() {
    console.log("gettahle")
}

window.onload = function() {
    console.log("seattable")
    // TODO: 点击座位和父页面的交互
    $(".seat").each(function(index, el) {
        $(el).click(function(event) {
            if ($(el).attr("class").indexOf("empty") != -1) { // 座位为空（普通座）
                alert(window.parent)
                $(el).removeClass('empty');
                $(el).addClass('select');
            } else if ($(el).attr('class').indexOf("cp-right-select") != -1) { // 当前被选（情侣座右）
                $(el).removeClass('cp-right-select');
                $(el).addClass('cp-right');
                $(el).prev('li').removeClass('cp-left-select');
                $(el).prev('li').addClass('cp-left');
            } else if ($(el).attr('class').indexOf("cp-left-select") != -1) { // 当前被选（情侣座左）
                $(el).removeClass('cp-left-select');
                $(el).addClass('cp-left');
                $(el).next('li').removeClass('cp-right-select');
                $(el).next('li').addClass('cp-right');
            } else if ($(el).attr('class').indexOf("select") != -1) { // 当前被选（普通座）
                $(el).removeClass('select');
                $(el).addClass('empty');
            } else if ($(el).attr('class').indexOf("cp-left") != -1) { // 座位为空（情侣座左）
                $(el).removeClass('cp-left');
                $(el).addClass('cp-left-select');
                $(el).next('li').removeClass('cp-right');
                $(el).next('li').addClass('cp-right-select');
            } else if ($(el).attr('class').indexOf("cp-right") != -1) { // 座位为空（情侣座右）
                $(el).removeClass('cp-right');
                $(el).addClass('cp-right-select');
                $(el).prev('li').removeClass('cp-left');
                $(el).prev('li').addClass('cp-left-select');
            }
        });
    });
}
