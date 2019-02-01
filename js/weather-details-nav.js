const tempBtn = document.querySelector('#temp-btn');
const probOfPrecBtn = document.querySelector('#prob-of-precip-btn');
const windBtn = document.querySelector('#wind-btn');

const tempChart = document.querySelector('#tempChart');
const precipChart = document.querySelector('#precipChart');
const windChart = document.querySelector('#windChart');

const chartList = document.querySelectorAll('.chart');
const innerNavBtns = document.querySelectorAll('.inner.nav-btn');

function changeChart(chart) {
    if (chartList.length == innerNavBtns.length) {
        for (let i = 0; i < chartList.length; i++) {
            chartList[i].classList.remove('visible');
            innerNavBtns[i].classList.remove('active');
        }
    }

    chart.classList.add('visible');
    event.target.classList.add('active');
}

tempBtn.addEventListener('click', function (x) {
    return function () { changeChart(x); };
}(tempChart));

probOfPrecBtn.addEventListener('click', function (x) {
    return function () { changeChart(x); };
}(precipChart));

windBtn.addEventListener('click', function (x) {
    return function () { changeChart(x); };
}(windChart));