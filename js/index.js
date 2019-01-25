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

nextArrow.addEventListener("click", function () {
    if (visibleDay < daysList.length - 1) {
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

prevArrow.addEventListener("click", function () {
    if (visibleDay == 0) {
        hideDay(visibleDay);
        visibleDay = daysList.length - 1;
        showDay(visibleDay);
    }
    else {
        hideDay(visibleDay);
        visibleDay--;
        showDay(visibleDay);
    }
});

function goToDay() {
    var currDay = Array.prototype.indexOf.call(daysMarkerList, event.target);
    hideDay(visibleDay);
    showDay(currDay);
    visibleDay = currDay;
}

for (var i = 0; i < daysMarkerList.length; i++) {
    daysMarkerList[i].addEventListener("click", function() {
        return function () { goToDay() }
    }()
    );
}
