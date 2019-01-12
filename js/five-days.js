console.log("hello");

var prevArrow = document.querySelector("#prevArrow");
var nextArrow = document.querySelector("#nextArrow");

var daysList = document.querySelectorAll(".day");
var daysMarkerList = document.querySelectorAll(".day-marker");

function showDay(dayNumber) {
    daysList[dayNumber].classList.add("current");
    daysMarkerList[dayNumber].classList.add("current");
}

function hideDay(dayNumber) {
    daysList[dayNumber].classList.remove("current");
    daysMarkerList[dayNumber].classList.remove("current");
}

var visibleDay = 0;

nextArrow.addEventListener("click", function nextDay() {
    if (visibleDay < 4) {
        hideDay(visibleDay);
        visibleDay++;
        showDay(visibleDay);
    }
    else {
        hideDay(visibleDay);
        visibleDay = 0;
        showDay(visibleDay);
    }
});

prevArrow.addEventListener("click", function prevDay() {
    if (visibleDay == 0) {
        hideDay(visibleDay);
        visibleDay = 4;
        showDay(visibleDay);
    }
    else {
        hideDay(visibleDay);
        visibleDay--;
        showDay(visibleDay);
    }
});

function goToDay(showingDay) {
    hideDay(visibleDay);
    showDay(showingDay);
    visibleDay = showingDay;
}

for (var i = 0; i < daysMarkerList.length; i++) {
    daysMarkerList[i].addEventListener("click", function (x) {
        return function () { goToDay(x) }
    }(i)
    );
}
