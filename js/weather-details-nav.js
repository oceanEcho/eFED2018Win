const tempBtn = document.querySelector('#temp-btn');
const probOfPrecBtn = document.querySelector('#prob-of-precip-btn');
const windBtn = document.querySelector('#wind-btn');

const tempChart = document.querySelector('#tempChart');
const precipChart = document.querySelector('#precipChart');
const windChart = document.querySelector('#windChart');

const chartList = document.querySelectorAll('.chart');
const innerNavBtns = document.querySelectorAll('.inner.nav-btn');

function changeTab(tab, tablist, btns) {
    if (tablist.length == btns.length) {
        for (let i = 0; i < tablist.length; i++) {
            tablist[i].classList.remove('visible');
            btns[i].classList.remove('active');
        }
    }

    tab.classList.add('visible');
    event.target.classList.add('active');
}

tempBtn.addEventListener('click', changeTab.bind(this, tempChart, chartList, innerNavBtns));
probOfPrecBtn.addEventListener('click', changeTab.bind(this, precipChart, chartList, innerNavBtns));
windBtn.addEventListener('click', changeTab.bind(this, windChart, chartList, innerNavBtns));

const todayBtn = document.querySelector('#todayBtn');
const fiveDaysBtn = document.querySelector('#fiveDaysBtn');
const historyBtn = document.querySelector('#historyBtn');

const todayContent = document.querySelector('#today');
const fiveDaysContent = document.querySelector('#fiveDays');
const historyContent = document.querySelector('#history');

const tabList = document.querySelectorAll('.tab-content');
const mainNavBtns = document.querySelectorAll('.main.nav-btn');

todayBtn.addEventListener('click', changeTab.bind(this, todayContent, tabList, mainNavBtns));
fiveDaysBtn.addEventListener('click', changeTab.bind(this, fiveDaysContent, tabList, mainNavBtns));
historyBtn.addEventListener('click', changeTab.bind(this, historyContent, tabList, mainNavBtns));
