var tempBtn = document.querySelector("#temp-btn");
var probOfPrecBtn = document.querySelector("#prob-of-precip-btn");
var windBtn = document.querySelector("#wind-btn");

var tempChart = document.querySelector("#tempChart");
var precipChart = document.querySelector("#precipChart");
var windChart = document.querySelector("#windChart");

var chartList = document.querySelectorAll(".chart-img");
var innerNavBtns = document.querySelectorAll(".inner.nav-btn");

console.log(innerNavBtns);

function showChart(button, chart) {
    for (item of chartList) {
        item.classList.remove("visible");
    }

    for (btn of innerNavBtns) {
        btn.classList.remove("active");
    }

    chart.classList.add("visible");
    button.classList.add("active");
}

tempBtn.addEventListener("click", function (x, y) {
    return function () { showChart(x, y) }
}(tempBtn, tempChart));

probOfPrecBtn.addEventListener("click", function (x, y) {
    return function () { showChart(x, y) }
}(probOfPrecBtn, precipChart));

windBtn.addEventListener("click", function (x, y) {
    return function () { showChart(x, y) }
}(windBtn, windChart));