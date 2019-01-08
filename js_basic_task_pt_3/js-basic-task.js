// 12. Find anomaly

function findAnomaly(sourceArray, param) {

    for (var i = 0; i < sourceArray.length; i++) {
        if (!sourceArray[i].hasOwnProperty(param)) {
            return "Not all objects contain the specified parameter.";
        }
    }

    var min = sourceArray[0].param;
    var max = sourceArray[0].param;
    var minId = 0;
    var maxId = 0;

    for (var i = 0; i < sourceArray.length; i++) {
        if (min > sourceArray[i].param) {
            min = sourceArray[i].param;
            minId = i;
        }

        if (max < sourceArray[i].param) {
            max = sourceArray[i].param;
            maxId = i;
        }
    }

    var anomalyObject = {
        min: {
            id: minId,
            param: min
        },
        max: {
            id: maxId,
            param: max
        }
    };

    return anomalyObject;
}

array = [
    {
        param: 9
    },
    {
        param: 0
    },
    {
        param: -3
    }
];

console.log(findAnomaly(array, "param"));

// 13. Weather statistic

function weatherStat(sourceArray, location) {

    return avgTemp;
}

console.log(weatherStat(array, {city: "Izhevsk", date: new Date(2014, 0)}));