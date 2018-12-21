// 1. Char count


function CountChar(sourceString, requiredLetter) {

    var lettersCount = 0;

    for (letter of sourceString) {
        if ((letter == requiredLetter) || letter == requiredLetter.toUpperCase()) {
            lettersCount++;
        }
    }

    return lettersCount;
}

console.log(CountChar("A true master is an eternal student.", "a"));

// 2. Deep compare

function DeepCompare(firstObject, secondObject) {

    for (key in firstObject) {
        if (!!secondObject[key]) {
            if ((typeof firstObject[key] == String) || (typeof firstObject[key] == Number) ||
            (typeof firstObject[key] == Boolean) || (typeof firstObject[key] == null)) {
                if ((typeof secondObject[key] == String) || (typeof secondObject[key] == Number) ||
                (typeof secondObject[key] == Boolean) || (typeof secondObject[key] == null)) {
                    if (firstObject[key] === secondObject[key]) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                if (firstObject[key] == secondObject[key]) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    }

    return false;
}

console.log(DeepCompare({ one: 1, two: "2" }, { one: 1, two: "2" }));

// 3. Chess board

function ChessBoard(width, height) {

    var boardString = "";

    for (var i = 0; i < height; i++) {

        if ((i % 2) != 0) {
            boardString += " ";
        }

        for (var j = 0; j < width * 2 - 1; j++) {
            if ((j % 2) == 0) {
                boardString += "#";
            }
            else {
                boardString += " ";
            }
        }
        boardString += "\n";
    }

    return boardString;
}

console.log(ChessBoard(9, 4));

// 4. Make array

function MakeArray(head, tail, step) {

    var newArray = [];

    if (step == undefined) {
        step = 1;
    }

    if (tail < head) {

        step = -step;

        for (var currentNumber = head; currentNumber >= tail; currentNumber += step) {
            newArray.push(currentNumber); 
        }
    }
    else {
        for (var currentNumber = head; currentNumber <= tail; currentNumber += step) {
            newArray.push(currentNumber);
        }
    }

    return newArray;
}

console.log(MakeArray(0, 10, 2));

// 5.1. Reverse array

function ReverseArray(sourceArray) {

    var reversedArray = [];

    for(var i = 0; i < sourceArray.length; i++) {

        reversedArray[i] = sourceArray[sourceArray.length - i - 1];
    }

    return reversedArray;
}

var testArray = ["A", "B", "C", "D", "E", "F", "G"];

console.log(ReverseArray(testArray));

// 5.2. Reverse array in place

function ReverseArrayInPlace(sourceArray) {

    for(var i = 0; i < sourceArray.length / 2; i++) {

        var temp;

        temp = sourceArray[i];
        sourceArray[i] = sourceArray[sourceArray.length - i - 1];
        sourceArray[sourceArray.length - i - 1] = temp;
    }
}

ReverseArrayInPlace(testArray)

console.log(testArray);

// 6. Merging

function MergeArrays() {

    var newArray = [];

    for (currentArray of arguments) {
        newArray = [...newArray, ...currentArray];
    }

    for (var i = 0; i < newArray.length; i++) {
        for (var j = i + 1; j < newArray.length; j++) {
            if (newArray[j] == newArray[i]) {
                newArray.splice(j, 1);
            }
        }
    }

    return newArray;
}

arrOne = [1, 20, 2, 3];
arrTwo = [3, 4];
arrThree = [1, 4, 5, -5, 5, 6, 7];

console.log(MergeArrays(arrOne, arrTwo, arrThree));