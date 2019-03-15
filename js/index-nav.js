const tempBtn = document.querySelector('#temp-btn');
const probOfPrecBtn = document.querySelector('#prob-of-precip-btn');
const windBtn = document.querySelector('#wind-btn');

const tempChart = document.querySelector('#tempChart');
const precipChart = document.querySelector('#precipChart');
const windChart = document.querySelector('#windChart');

const chartList = document.querySelectorAll('.chart');
const innerNavBtns = document.querySelectorAll('.inner.nav-btn');

function changeTab(btn, tab, tablist, btns) {
    if (tablist.length == btns.length) {
        for (let i = 0; i < tablist.length; i++) {
            tablist[i].classList.remove('visible');
            btns[i].classList.remove('active');
        }
    }

    tab.classList.add('visible');
    btn.classList.add('active');
}

tempBtn.addEventListener('click', changeTab.bind(this, tempBtn, tempChart, chartList, innerNavBtns));
probOfPrecBtn.addEventListener('click', changeTab.bind(this, probOfPrecBtn, precipChart, chartList, innerNavBtns));
windBtn.addEventListener('click', changeTab.bind(this, windBtn, windChart, chartList, innerNavBtns));

const todayBtn = document.querySelector('#todayBtn');
const fiveDaysBtn = document.querySelector('#fiveDaysBtn');
const historyBtn = document.querySelector('#historyBtn');

const todayContent = document.querySelector('#today');
const fiveDaysContent = document.querySelector('#fiveDays');
const historyContent = document.querySelector('#history');

const tabList = document.querySelectorAll('.tab-content');
const mainNavBtns = document.querySelectorAll('.main.nav-btn');

todayBtn.addEventListener('click', changeTab.bind(this, todayBtn, todayContent, tabList, mainNavBtns));
fiveDaysBtn.addEventListener('click', changeTab.bind(this, fiveDaysBtn, fiveDaysContent, tabList, mainNavBtns));
historyBtn.addEventListener('click', changeTab.bind(this, historyBtn, historyContent, tabList, mainNavBtns));
