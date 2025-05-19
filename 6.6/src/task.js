// Безопасное получение ключей интерфейса
var carSample = {
    model: '',
    price: 0,
    dynamic_1: {
        key_1: '',
        key_2: '',
        key_3: '',
        extraKey: '' // Допустимо благодаря индексной сигнатуре
    },
    dynamic_2: {
        key_1: 0,
        customKey: 1 // Допустимо
    },
    tuple: ['', 0, '']
};
var keys = (Object.keys(carSample));
console.log('Keys of Car interface:', keys);
function add(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    return a.toString() + b.toString();
}
// Тесты с явными проверками типов
var numResult = add(1, 2);
var strResult = add('1', '2');
var mixedResult = add(1, '2');
console.log('add numbers:', numResult, typeof numResult); // 3 number
console.log('add strings:', strResult, typeof strResult); // "12" string
console.log('add mixed:', mixedResult, typeof mixedResult); // "12" string
// Примеры использования
var partialCar = {
    model: 'Tesla',
    dynamic_1: { key_1: 'test' }
};
var readonlyCar = {
    model: 'BMW',
    price: 50000,
    dynamic_1: { key_1: 'value', key_2: '', key_3: '' },
    dynamic_2: { key_1: 1, customKey: 2 },
    tuple: ['a', 1, 'b']
};
// readonlyCar.model = 'Audi'; // Ошибка: нельзя изменять readonly свойство
// Валидация кортежа (тип-гвард)
function isCarTuple(tuple) {
    return Array.isArray(tuple) &&
        tuple.length === 3 &&
        typeof tuple[0] === 'string' &&
        typeof tuple[1] === 'number' &&
        typeof tuple[2] === 'string';
}
// Тест валидации
var testTuple = ['test', 1, 'ok'];
if (isCarTuple(testTuple)) {
    console.log('Valid tuple:', testTuple);
}
else {
    console.log('Invalid tuple');
}
// Вывод результатов
console.log('PartialCar:', partialCar);
console.log('ReadonlyCar:', readonlyCar);
console.log('Car keys check:', keys.includes('model')); // true
console.log('Tuple validation:', isCarTuple(['valid', 42, 'tuple'])); // true
