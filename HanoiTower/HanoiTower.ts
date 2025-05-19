class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

class HanoiTower {
    private readonly disks: number;
    private readonly towers: [Stack<number>, Stack<number>, Stack<number>];

    constructor(disks: number) {
        this.disks = disks;
        this.towers = [new Stack<number>(), new Stack<number>(), new Stack<number>()];
        
        for (let i = disks; i >= 1; i--) {
            this.towers[0].push(i);
        }
    }

    moveDisks(): void {
        this.solve(this.disks, 0, 2, 1);
    }

    private solve(n: number, from: number, to: number, aux: number): void {
        if (n === 0) return;
        
        this.solve(n - 1, from, aux, to);
        
        const disk = this.towers[from].pop();
        if (disk === undefined) throw new Error("No disk to move");
        
        const top = this.towers[to].peek();
        if (top !== undefined && disk > top) {
            throw new Error("Cannot place larger disk on smaller one");
        }
        
        this.towers[to].push(disk);
        console.log(`Move disk ${disk} from tower ${from + 1} to tower ${to + 1}`);
        
        this.solve(n - 1, aux, to, from);
    }

    printTowers(): void {
        this.towers.forEach((tower, index) => {
            console.log(`Tower ${index + 1}:`, tower);
        });
    }
}

const hanoi = new HanoiTower(3);
console.log("Initial state:");
hanoi.printTowers();

console.log("\nMoving disks:");
hanoi.moveDisks();

console.log("\nFinal state:");
hanoi.printTowers();