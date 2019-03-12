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

// 2. *Используя функциональное наследование повторить задачу из п2.

function Vehicle (speed) {
    this.speed = speed;

    this.valueOf = function () {
        return this.speed;
    };
    
    this.toString = function () {
        return this.speed.toString();
    };
    
    this.move = function () {
        this.speed++;
    };
    
    this.stop = function () {
        this.speed = 0;
    };
}

function Bike (speed) {
    Vehicle.call(this, speed);

    this.wheelsCount = 2;

    this.valueOf = function () {
        return {
            speed: this.speed,
            wheelsCount: this.wheelsCount
        };
    };
    
    this.toString = function () {
        return `Speed: ${this.speed}, wheels count: ${this.wheelsCount}`;
    };
    

    const parentMove = this.move;
    this.move = function () {
        parentMove.call(this);
        console.log('Vzhhhhhhhh...');
    };
}

function Car (speed, doorsCount) {
    Car.count++;

    Vehicle.call(this, speed);

    this.wheelsCount = 4;
    this.doorsCount = doorsCount;
    this.openedDoors = 0;

    this.valueOf = function () {
        return {
            speed: this.speed,
            wheelsCount: this.wheelsCount,
            doorsCount: this.doorsCount
        };
    };
    
    this.toString = function () {
        return `Speed: ${this.speed}, wheels count: ${this.wheelsCount}, doors count ${this.doorsCount}`;
    };
    
    this.openDoor = function() {
        if (this.openedDoors < this.doorsCount) {
            this.openedDoors++;
            console.log('Opened doors: ' + this.openedDoors);
            console.log('Closed doors: ' + (this.doorsCount - this.openedDoors));
        }
        else {
            console.log('All doors is opened.');
        }
    };
    
    this.closeDoor = function() {
        if (this.openedDoors > 0) {
            this.openedDoors--;
            console.log('Opened doors: ' + this.openedDoors);
            console.log('Closed doors: ' + (this.doorsCount - this.openedDoors));
        }
        else {
            console.log('All doors is closed.');
        }
    };
}

Car.count = 0;

Car.getCount = function() {
    return this.count;
};

function MonsterTruck (speed, doorsCount, wheelsSize) {
    Car.call(this, speed, doorsCount);

    this.wheelsSize = wheelsSize;

    this.valueOf = function () {
        return {
            speed: this.speed,
            wheelsCount: this.wheelsCount,
            doorsCount: this.doorsCount,
            wheelsSize: this.wheelsSize
        };
    };
    
    this.toString = function () {
        return `Speed: ${this.speed},
         wheels count: ${this.wheelsCount},
         doors count: ${this.doorsCount},
         wheels size: ${this.wheelsSize}`;
    };
    
    this.openDoor = function() {
        setTimeout(this.openDoor.bind(this), 1000);
    };
    
    this.closeDoor = function() {
        setTimeout(this.closeDoor.bind(this), 1000);
    };
}

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

console.log(Car.getCount());

let truck = new MonsterTruck(140, 2, 50);
truck.openDoor();
truck.closeDoor();
console.log(truck);
let truck2 = new MonsterTruck(200, 4, 70);
console.log(truck2);
console.log(truck2.valueOf());
