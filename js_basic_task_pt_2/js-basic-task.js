// 7. Every, some

function customEvery(sourceArray, someFunction) {

    for (item of sourceArray) {
        if (!someFunction(item)) {
            return false
        }
    }

    return true;
}

function customSome(sourceArray, someFunction) {

    for (item of sourceArray) {
        if (someFunction(item)) {
            return true
        }
    }

    return false;
}

console.log(customEvery([1, 4, NaN, 6], Number.isNaN));
console.log(customEvery([NaN, NaN], Number.isNaN));
console.log(customSome([1, 2, 6], Number.isNaN));
console.log(customSome([1, 4, NaN, 6], Number.isNaN));

// 8. Repeat

function multiplyOrThrow(a, b) {
    if (Math.random() < 0.5) {
        return a * b;
    }
    else {
        throw "MultiplicatorUnitFailure";
    }
}

//console.log(multiplyOrThrow(2, 3))

function finallyMultiply (a, b) {

    while(1) {
        try {
            if (Math.random() < 0.5) {
                return a * b;
            }
            else {
                throw "MultiplicatorUnitFailure";
            }
        }
        catch(e) {
            if (e === "MultiplicatorUnitFailure") {
                console.log(e);
            }
        }
    }
}

console.log(finallyMultiply(2, 3));

// 9. Replace quotes

function replaceQuotes(sourceString) {

    return sourceString.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
}

console.log(replaceQuotes("I'm 'hero'"));

// 10. Find numbers

function findNumbers(sourceArray) {

    var numbersExp = /^[+,-]?\d+\.?\d*([e,E][+,-]?)?\d*$/;
    var newArray = [];

    for (item of sourceArray) {
        if (numbersExp.test(item)) {
            newArray.push(item);
        }
    }

    return newArray;
}

console.log(findNumbers(["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]));
console.log(findNumbers(["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]));

// 11. Day and month

function getNames(date) {

    var months = [
        "January",
        "Febriary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    var weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    // return months[date.getMonth()] + ", " + weekdays[date.getDay()];
    return `${date.toLocaleString("en-US", {month: "long"})}, ${date.toLocaleString("en-US", {weekday: "long"})}`;
}

console.log(getNames(new Date()));

// 12. Difference in years

function differenceInYears(firstDate, secondDate) {

    var firstDateDays = firstDate.getMonth() * 30 + firstDate.getDate();
    var secondDateDays = secondDate.getMonth() * 30 + secondDate.getDate();

    var difference = Math.abs(firstDate.getYear() - secondDate.getYear()) + Math.abs(firstDateDays - secondDateDays) / 365;

    return difference.toFixed(1);
}

console.log(differenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)));
console.log(differenceInYears(new Date(2014, 0), new Date(2014, 6)));