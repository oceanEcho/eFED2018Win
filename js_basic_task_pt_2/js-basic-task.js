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

console.log(replaceQuotes("I'm 'hero' '"));