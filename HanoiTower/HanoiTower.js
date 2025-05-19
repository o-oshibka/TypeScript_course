var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (item) {
        this.items.push(item);
    };
    Stack.prototype.pop = function () {
        return this.items.pop();
    };
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    };
    Stack.prototype.size = function () {
        return this.items.length;
    };
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    return Stack;
}());
var HanoiTower = /** @class */ (function () {
    function HanoiTower(disks) {
        this.disks = disks;
        this.towers = [new Stack(), new Stack(), new Stack()];
        for (var i = disks; i >= 1; i--) {
            this.towers[0].push(i);
        }
    }
    HanoiTower.prototype.moveDisks = function () {
        this.solve(this.disks, 0, 2, 1);
    };
    HanoiTower.prototype.solve = function (n, from, to, aux) {
        if (n === 0)
            return;
        this.solve(n - 1, from, aux, to);
        var disk = this.towers[from].pop();
        if (disk === undefined)
            throw new Error("No disk to move");
        var top = this.towers[to].peek();
        if (top !== undefined && disk > top) {
            throw new Error("Cannot place larger disk on smaller one");
        }
        this.towers[to].push(disk);
        console.log("Move disk ".concat(disk, " from tower ").concat(from + 1, " to tower ").concat(to + 1));
        this.solve(n - 1, aux, to, from);
    };
    HanoiTower.prototype.printTowers = function () {
        this.towers.forEach(function (tower, index) {
            console.log("Tower ".concat(index + 1, ":"), tower);
        });
    };
    return HanoiTower;
}());
var hanoi = new HanoiTower(3);
console.log("Initial state:");
hanoi.printTowers();
console.log("\nMoving disks:");
hanoi.moveDisks();
console.log("\nFinal state:");
hanoi.printTowers();
