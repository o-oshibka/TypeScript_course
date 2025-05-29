import { validateCityName } from '../validate/validateCity.ts';

describe('City Validator', () => {
  test('выдаёт предупреждение при наличии экранирования', () => {
    expect(validateCityName('<script>alert("xss")</script>')).toBe(false);
    expect(validateCityName('City" onmouseover="alert(1)')).toBe(false);
    expect(validateCityName('Ağrı & Co')).toBe(true); // & допустим в названиях
  });

  test('пропускает название с восклицательным знаком или дефисами', () => {
    expect(validateCityName('Saint-Louis-du-Ha! Ha!')).toBe(true);
    expect(validateCityName('O\'Reilly')).toBe(true);
    expect(validateCityName('Test-City')).toBe(true);
  });

  test('пропускает название со спецсимволами в Unicode', () => {
    expect(validateCityName('Ağrı')).toBe(true);
    expect(validateCityName('München')).toBe(true);
    expect(validateCityName('Łódź')).toBe(true);
  });

  test('пропускает название из одной буквы', () => {
    expect(validateCityName('A')).toBe(true);
    expect(validateCityName('Я')).toBe(true);
    expect(validateCityName('ß')).toBe(true);
  });

  test('не пропускает пустую строку', () => {
    expect(validateCityName('')).toBe(false);
    expect(validateCityName('   ')).toBe(false);
  });
});