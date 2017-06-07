window.onload = function() {
    // TODO: 点击座位和父页面的交互
    $(".seat").each(function(index, el) {
        var seat = new Array(2);
        $(el).click(function() {
            if ($(el).attr("class").indexOf("selected") !== -1) {
                return;
            }
            if ($(el).attr("class").indexOf("empty")  !== -1) { // 座位为空（普通座） => 切到被选
                $(el).removeClass('empty');
                $(el).addClass('select');

                seat.length = 0;
                seat[0] = el.getAttribute("row");
                seat[1] = el.getAttribute("col");
                parent.addSeat(seat);
            } else if ($(el).attr('class').indexOf("cp-right-select") !== -1) { // 当前被选（情侣座右） => 切到空
                $(el).removeClass('cp-right-select');
                $(el).addClass('cp-right');
                $(el).prev('li').removeClass('cp-left-select');
                $(el).prev('li').addClass('cp-left');

                seat.length = 0;
                seat[0] = el.getAttribute("row");
                seat[1] = el.getAttribute("col");
                parent.rmSeat(seat);
                seat[0] = $(el).prev('li')[0].getAttribute("row");
                seat[1] = $(el).prev('li')[0].getAttribute("col");
                parent.rmSeat(seat);
            } else if ($(el).attr('class').indexOf("cp-left-select") !== -1) { // 当前被选（情侣座左） => 切到空
                $(el).removeClass('cp-left-select');
                $(el).addClass('cp-left');
                $(el).next('li').removeClass('cp-right-select');
                $(el).next('li').addClass('cp-right');

                seat.length = 0;
                seat[0] = el.getAttribute("row");
                seat[1] = el.getAttribute("col");
                parent.rmSeat(seat);
                seat.length = 0;
                seat[0] = $(el).next('li')[0].getAttribute("row");
                seat[1] = $(el).next('li')[0].getAttribute("col");
                parent.rmSeat(seat);
            } else if ($(el).attr('class').indexOf("select") !== -1) { // 当前被选（普通座） => 切到空
                $(el).removeClass('select');
                $(el).addClass('empty');

                seat.length = 0;
                seat[0] = el.getAttribute("row");
                seat[1] = el.getAttribute("col");
                parent.rmSeat(seat);
            } else if ($(el).attr('class').indexOf("cp-left") !== -1) { // 座位为空（情侣座左） => 切到被选
                $(el).removeClass('cp-left');
                $(el).addClass('cp-left-select');
                $(el).next('li').removeClass('cp-right');
                $(el).next('li').addClass('cp-right-select');

                seat.length = 0;
                seat[0] = el.getAttribute("row");
                seat[1] = el.getAttribute("col");
                parent.addSeat(seat);
                seat.length = 0;
                seat[0] = $(el).next('li')[0].getAttribute("row");
                seat[1] = $(el).next('li')[0].getAttribute("col");
                parent.addSeat(seat);
            } else if ($(el).attr('class').indexOf("cp-right") !== -1) { // 座位为空（情侣座右） => 切到被选
                $(el).removeClass('cp-right');
                $(el).addClass('cp-right-select');
                $(el).prev('li').removeClass('cp-left');
                $(el).prev('li').addClass('cp-left-select');

                seat.length = 0;
                seat[0] = $(el).prev('li')[0].getAttribute("row");
                seat[1] = $(el).prev('li')[0].getAttribute("col");
                parent.addSeat(seat);
                seat.length = 0;
                seat[0] = el.getAttribute("row");
                seat[1] = el.getAttribute("col");
                parent.addSeat(seat);
            }
        });
    });
};
