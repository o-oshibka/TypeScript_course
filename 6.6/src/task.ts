// ==================== Задание 1. Динамические объекты (Исправлено) ====================
interface Car {
    model: string;
    price: number;
    dynamic_1: { 
        key_1: string;
        key_2: string;
        key_3: string;
        [key: string]: string;
    };
    dynamic_2: {
        key_1: number;
        [key: string]: number;
    };
    tuple: [string, number, string];
}

const carSample: Car = {
    model: '',
    price: 0,
    dynamic_1: { 
        key_1: '', 
        key_2: '', 
        key_3: '',
        extraKey: ''
    },
    dynamic_2: { 
        key_1: 0,
        customKey: 1
    },
    tuple: ['', 0, '']
};

type CarKeys = keyof Car;
const keys: CarKeys[] = (Object.keys(carSample)) as CarKeys[];

console.log('Keys of Car interface:', keys);

// ==================== Задание 2. Перегрузка функции ====================
function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: string | number, b: string | number): string | number {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    return a.toString() + b.toString();
}

const numResult = add(1, 2);
const strResult = add('1', '2');
const mixedResult = add(1, '2');

console.log('add numbers:', numResult, typeof numResult);
console.log('add strings:', strResult, typeof strResult);
console.log('add mixed:', mixedResult, typeof mixedResult);

// ==================== Задание 3. Утилитарные типы ====================
// 1. Partial с явными полями
type PartialCar = Partial<Pick<Car, 'model' | 'price'>> & {
    dynamic_1?: Partial<Car['dynamic_1']>;
    tuple?: [string?, number?, string?];
};

// 2. Глубокий Readonly
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// 3. Pick с проверкой
type CarEssential = Pick<Car, 'model' | 'price'>;

// 4. Omit с созданием производного типа
type CarWithoutDynamic = Omit<Car, 'dynamic_1' | 'dynamic_2'>;

// 5. Глубокий Required
type DeepRequired<T> = {
    [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

// 6. Record для специфичных нужд
type StringRecord = Record<'id' | 'serial' | 'code', string>;

const partialCar: PartialCar = { 
    model: 'Tesla',
    dynamic_1: { key_1: 'test' }
};

const readonlyCar: DeepReadonly<Car> = {
    model: 'BMW',
    price: 50000,
    dynamic_1: { key_1: 'value', key_2: '', key_3: '' },
    dynamic_2: { key_1: 1, customKey: 2 },
    tuple: ['a', 1, 'b']
};

function isCarTuple(tuple: unknown): tuple is Car['tuple'] {
    return Array.isArray(tuple) && 
           tuple.length === 3 &&
           typeof tuple[0] === 'string' &&
           typeof tuple[1] === 'number' &&
           typeof tuple[2] === 'string';
}

const testTuple: unknown = ['test', 1, 'ok'];
if (isCarTuple(testTuple)) {
    console.log('Valid tuple:', testTuple);
} else {
    console.log('Invalid tuple');
}

console.log('PartialCar:', partialCar);
console.log('ReadonlyCar:', readonlyCar);
console.log('Car keys check:', keys.includes('model')); // true
console.log('Tuple validation:', isCarTuple(['valid', 42, 'tuple'])); // true
