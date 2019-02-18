var tempBtn = document.querySelector("#temp-btn");
var probOfPrecBtn = document.querySelector("#prob-of-precip-btn");
var windBtn = document.querySelector("#wind-btn");

var tempChart = document.querySelector("#tempChart");
var precipChart = document.querySelector("#precipChart");
var windChart = document.querySelector("#windChart");

var chartList = document.querySelectorAll(".chart-img");
var innerNavBtns = document.querySelectorAll(".inner.nav-btn");

function changeChart(chart) {
    if (chartList.length == innerNavBtns.length) {
        for (var i = 0; i < chartList.length; i++) {
            chartList[i].classList.remove("visible");
            innerNavBtns[i].classList.remove("active");
        }
    }

    chart.classList.add("visible");
    event.target.classList.add("active");
}

tempBtn.addEventListener("click", function (x) {
    return function () { changeChart(x) }
}(tempChart));

probOfPrecBtn.addEventListener("click", function (x) {
    return function () { changeChart(x) }
}(precipChart));

windBtn.addEventListener("click", function (x) {
    return function () { changeChart(x) }
}(windChart));