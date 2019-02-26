// 2. Promise

function compare(value1, value2) {
    let code;
    if (value1 < value2) {
        code = -1;
    }
    else if (value1 == value2) {
        code = 0;
    }
    else if (value1 > value2) {
        code = 1;
    }
    return new Promise(function (resolve) {
        let timeout = 1000;
        setTimeout(function () {
            resolve(code);
        }, timeout);
    });
}

console.log(compare(1, 2));
console.log(compare(2, 2));
console.log(compare(3, 2));
console.log(compare(-1, 1));
console.log(compare(-1, -1));
console.log(compare(2, -2));

// 3a. Promise chain

function firstRandom(sumWith) {
    return new Promise(function(resolve) {
        var timeout = Math.random() * 3000;
        setTimeout(function(){
            resolve(Math.random() * 3 + sumWith);
        }, timeout);
    });
}

firstRandom(5)
    .then(function(result) {
        console.log(result);
        return firstRandom(result);
    })
    .then(function(result) {
        console.log(result);
        return firstRandom(result);
    })
    .then(function(result) {
        console.log(result);
    });


// 3b. Promise chain

function secondRandom() {
    return new Promise(function(resolve) {
        var timeout = Math.random()*3000;
        setTimeout(function(){
            resolve(Math.random()*3);
        }, timeout);
    });
}


let container = [];
let newSecondRandom = secondRandom();
for (let i = 0; i < 7; i++) {
    newSecondRandom = newSecondRandom
        .then(function(result) {
            container.push(result);
            console.log(container);
            return secondRandom();
        });
}

// 4.Closures

function makeCounter() { 
    var currentCount = 1;
    return function() {
        return currentCount++;
    };
}

var counter = makeCounter();
alert( counter() );
alert( counter() );








