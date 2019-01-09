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
    var avgTemp = 0;
    var counter = 0;

    for (item of sourceArray[location.city][location.date.getFullYear()][location.date.getMonth()]) {
        avgTemp += item.temp;
        counter++;
    }

    avgTemp = avgTemp / counter;

    return avgTemp;
}

array = {
    "Izhevsk": {
        "2013": [

        ],
        "2014": [
            [
                {
                    temp: -12
                },
                {
                    temp: -10
                },
                {
                    temp: -12
                },
                {
                    temp: -5
                },
                {
                    temp: 0
                },
                {
                    temp: 7
                },
                {
                    temp: 10
                },
                {
                    temp: 20
                },
                {
                    temp: 15
                },
                {
                    temp: 7
                },
                {
                    temp: -3
                },
                {
                    temp: -12
                },
                {
                    temp: -12
                },
                {
                    temp: -10
                },
                {
                    temp: -12
                },
                {
                    temp: -5
                },
                {
                    temp: 0
                },
                {
                    temp: 7
                },
                {
                    temp: 10
                },
                {
                    temp: 20
                },
                {
                    temp: 15
                },
                {
                    temp: 7
                },
                {
                    temp: -3
                },
                {
                    temp: -12
                },
                {
                    temp: -12
                },
                {
                    temp: -10
                },
                {
                    temp: -12
                },
                {
                    temp: -5
                },
                {
                    temp: 0
                },
                {
                    temp: 7
                },
                {
                    temp: 10
                },
                {
                    temp: 20
                },
                {
                    temp: 15
                },
                {
                    temp: 7
                },
                {
                    temp: -3
                },
                {
                    temp: -12
                },
                {
                    temp: -12
                },
                {
                    temp: -10
                },
                {
                    temp: -12
                },
                {
                    temp: -5
                },
                {
                    temp: 0
                },
                {
                    temp: 7
                },
                {
                    temp: 10
                },
                {
                    temp: 20
                },
                {
                    temp: 15
                },
                {
                    temp: 7
                },
                {
                    temp: -3
                },
                {
                    temp: -12
                },
                {
                    temp: -12
                }
            ],
            [
                {
                    temp: 12
                }
            ]
        ],
        "2015": [

        ]
    }
    
}

console.log(weatherStat(array, {city: "Izhevsk", date: new Date(2014, 0)}));
console.log(new Date(2014, 0));