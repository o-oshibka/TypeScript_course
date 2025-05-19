interface IUser {
    readonly id: number;
    userName: string;
    surname: string;
    coins: number;
    age?: number;
    addCoin(amount: number): void;
    removeCoin(amount: number): void;
    getCoins(): string;
}

interface IExtendedUser extends IUser {
    email: string;
}

interface IPremiumUser extends IExtendedUser {
    premiumSince: Date;
}

class Users implements IPremiumUser {
    constructor(
        public readonly id: number,
        public userName: string,
        public surname: string,
        public coins: number,
        public email: string,
        public premiumSince: Date,
        public age?: number
    ) {}

    addCoin(amount: number): void {
        this.coins += amount;
    }

    removeCoin(amount: number): void {
        this.coins -= amount;
    }

    getCoins(): string {
        return `Количество монет ${this.coins}`;
    }
}

const ivan: IPremiumUser = new Users(
    1,
    "Ivan",
    "Ivanov",
    5,
    "ivan@example.com",
    new Date(),
    25
);

console.log(ivan.getCoins());

const petr: IPremiumUser = new Users(
    2,
    "Petr",
    "Petrov",
    10,
    "petr@example.com",
    new Date()
);

console.log(petr.getCoins());