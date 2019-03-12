// 2.	Создать цепочку прототипов для следующих объектов: 

// Vehical - обобщеное траспортное средство с полями:
// speed - скорость перемещения

// Bike - мотоцикл с полями:
// wheelsCount = 2- количество колес

// Car - автомобиль с полями:
// wheelsCount - количество колес
// doorsCount - количество дверей

//  MonsterTruck - автомобиль( https://en.wikipedia.org/wiki/Monster_truck ) с полями:
// wheelsSize - размер колес

// Таким образом, чтобы были определены:
// Bike.speed,
// Car.speed,
// MonsterTruck.speed,
// MonsterTruck.wheelsCount,
// MonsterTruck.doorsCount

function Vehicle (speed) {
    this.speed = speed;
}

Vehicle.prototype.valueOf = function () {
    return this.speed;
};

Vehicle.prototype.toString = function () {
    return this.speed.toString();
};

Vehicle.prototype.move = function () {
    this.speed++;
};

Vehicle.prototype.stop = function () {
    this.speed = 0;
};

function Bike (speed) {
    Vehicle.call(this, speed);
    this.wheelsCount = 2;
}

Bike.prototype = Object.create(Vehicle.prototype);
Bike.prototype.constructor = Bike;

Bike.prototype.valueOf = function () {
    return {
        speed: this.speed,
        wheelsCount: this.wheelsCount
    };
};

Bike.prototype.toString = function () {
    return `Speed: ${this.speed}, wheels count: ${this.wheelsCount}`;
};

Bike.prototype.move = function () {
    this.move();
    console.log('Vzhhhhhhhh...');
};

function Car (speed, doorsCount) {
    Car.count++;
    Vehicle.call(this, speed);
    this.wheelsCount = 4;
    this.doorsCount = doorsCount;
    this.openedDoors = 0;
}
Car.count = 0;

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.valueOf = function () {
    return {
        speed: this.speed,
        wheelsCount: this.wheelsCount,
        doorsCount: this.doorsCount
    };
};

Car.prototype.toString = function () {
    return `Speed: ${this.speed}, wheels count: ${this.wheelsCount}, doors count ${this.doorsCount}`;
};

Car.prototype.openDoor = function() {
    if (this.openedDoors < this.doorsCount) {
        this.openedDoors++;
        console.log('Opened doors: ' + this.openedDoors);
        console.log('Closed doors: ' + (this.doorsCount - this.openedDoors));
    }
    else {
        console.log('All doors is opened.');
    }
};

Car.prototype.closeDoor = function() {
    if (this.openedDoors > 0) {
        this.openedDoors--;
        console.log('Opened doors: ' + this.openedDoors);
        console.log('Closed doors: ' + (this.doorsCount - this.openedDoors));
    }
    else {
        console.log('All doors is closed.');
    }
};

function MonsterTruck (speed, doorsCount, wheelsSize) {
    Car.call(this, speed, doorsCount);
    this.wheelsSize = wheelsSize;
}

MonsterTruck.prototype = Object.create(Car.prototype);
MonsterTruck.prototype.constructor = MonsterTruck;

MonsterTruck.prototype.valueOf = function () {
    return {
        speed: this.speed,
        wheelsCount: this.wheelsCount,
        doorsCount: this.doorsCount,
        wheelsSize: this.wheelsSize
    };
};

MonsterTruck.prototype.toString = function () {
    return `Speed: ${this.speed},
     wheels count: ${this.wheelsCount},
     doors count: ${this.doorsCount},
     wheels size: ${this.wheelsSize}`;
};

MonsterTruck.prototype.openDoor = function() {
    setTimeout(this.openDoor(), 1000);
};

MonsterTruck.prototype.closeDoor = function() {
    setTimeout(this.closeDoor(), 1000);
};

let bike = new Bike(250);
console.log(bike);
bike.move();
console.log(bike);

let car = new Car(200, 2);
console.log(car);
let car2 = new Car(210, 4);
car2.openDoor();
car2.openDoor();
car2.openDoor();
car2.openDoor();
car2.openDoor();
car2.closeDoor();
car2.closeDoor();
car2.closeDoor();
car2.closeDoor();
car2.closeDoor();
car2.closeDoor();
console.log(car2);

console.log(Car.count);

let truck = new MonsterTruck(140, 2, 50);
truck.openDoor();
truck.closeDoor();
console.log(truck);
let truck2 = new MonsterTruck(200, 4, 70);
console.log(truck2);
console.log(truck2.valueOf());
