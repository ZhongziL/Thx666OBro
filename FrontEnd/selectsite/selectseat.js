window.onload = function () {
    login_register_part();
};

function addSeat(seat) {
    var no_select = $("#no-select");
    if (no_select.css("visibility") !== "hidden")
       no_select.css("visibility", "hidden");
    var ul = $("#selected-seats").children("ul");
    ul.append("<li>" + seat[0] + "排" + seat[1] + "座</li>");
}

function rmSeat(seat) {
    var ul = $("#selected-seats").children("ul");
    if (ul.children().length - 1 === 0)
        $("#no-select").css("visibility", "visible");
    ul.children().each(function (index, el) {
       if (el.innerText === seat[0] + "排" + seat[1] + "座")
           el.remove();
    });
}

function renew_count(count_delta, money_delta) {
    var count_span = $("#count");
    count_span.html(parseInt(count_span.html()) + count_delta + "张");

    var money_span = $("#money");
    var money = parseFloat(money_span.html()) + money_delta;
    money_span.html(money.toFixed(2));
}
