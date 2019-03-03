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
    return new Promise(function (resolve, reject) {
        let timeout = 1000;
        setTimeout(function () {
            if (isNaN(value1) || isNaN(value2) || value1 == null || value2 == null) {
                reject(new Error('Arguments passing error'));
            }
            else {
                resolve(code);
            }
        }, timeout);
    });
}

compare(1, 2)
    .then(
        result => {
            return console.log(result);
        }
    )
    .catch(
        error => {
            return console.log(error.message);
        }
    );

compare(1, 'qwe')
    .then(
        result => {
            return console.log(result);
        }
    )
    .catch(
        error => {
            return console.log(error.message);
        }
    );

compare(1)
    .then(
        result => {
            return console.log(result);
        }
    )
    .catch(
        error => {
            return console.log(error.message);
        }
    );

// 3a. Promise chain

function firstRandom(sumWith) {
    return new Promise(function (resolve) {
        let timeout = Math.random() * 3000;
        setTimeout(function () {
            resolve(Math.random() * 3 + sumWith);
        }, timeout);
    });
}

firstRandom(5)
    .then(function (result) {
        console.log(result);
        return firstRandom(result);
    })
    .then(function (result) {
        console.log(result);
        return firstRandom(result);
    })
    .then(function (result) {
        console.log(result);
    });


// 3b. Promise chain

function secondRandom() {
    return new Promise(function (resolve) {
        let timeout = Math.random() * 3000;
        setTimeout(function () {
            resolve(Math.random() * 3);
        }, timeout);
    });
}


let container = [];
let newSecondRandom = secondRandom();
for (let i = 0; i < 7; i++) {
    newSecondRandom = newSecondRandom
        .then(function (result) {
            container.push(result);
            console.log(container);
            return secondRandom();
        });
}

// 4.Closures

function makeCounter() {
    let currentCount = 1;
    let stack = [];

    return {
        prev: function () {
            if (stack.length == 10) {
                stack.splice(0, 1);
            }
            stack.push(this.currentCount);
            return currentCount++;
        },
        next: function () {
            if (stack.length == 10) {
                stack.splice(0, 1);
            }
            stack.push(this.currentCount);
            return currentCount--;
        },
        getStack: function () {
            return stack;
        }
    };
}

let newCounter = makeCounter();
console.log(newCounter.next());
console.log(newCounter.prev());
console.log(newCounter.prev());
console.log(newCounter.prev());
console.log(newCounter.prev());
console.log(newCounter.next());
console.log(newCounter.next());
console.log(newCounter.next());
console.log(newCounter.next());
console.log(newCounter.next());
console.log(newCounter.next());
console.log(newCounter.next());
console.log(newCounter.next());
console.log(newCounter.getStack());

// 5. Carrying

function sumWith(number) {
    return this.currentValue += number;
}

let number = 2;

let someObject = {
    currentValue: 3
};

console.log(sumWith.call(someObject, number));
console.log(sumWith.apply(someObject, [number]));

let newSumWith = sumWith.bind(someObject, number);

console.log(newSumWith());

function makeDoubleCounter() {
    let value = -1;

    return function () {
        return value += 2;
    };
}

newDoubleCounter = makeDoubleCounter();

console.log(newDoubleCounter());
console.log(newDoubleCounter());
console.log(newDoubleCounter());
console.log(newDoubleCounter());

// 6. setInterval

let timerId = setInterval(function () {
    console.log('Some text...');
}, 1000);

let interval = 1000;

let newTimerId = setTimeout(function tick() {
    console.log('Some text with interval ' + interval);
    interval += 2000;
    newTimerId = setTimeout(tick, interval);
}, 1000);
