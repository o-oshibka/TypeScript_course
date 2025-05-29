import { validateDate } from '../validate/validateDate.ts';

describe('Date Validator', () => {
  test('пропускает дату в формате ДД.ММ.ГГГГ', () => {
    expect(validateDate('15.05.2023')).toBe(true);
    expect(validateDate('01.12.2024')).toBe(true);
  });

  test('не пропускает спецсимволы', () => {
    expect(validateDate('15.05.202@')).toBe(false);
    expect(validateDate('15.0#.2023')).toBe(false);
    expect(validateDate('1$.05.2023')).toBe(false);
  });

  test('не пропускает буквенные значения', () => {
    expect(validateDate('aa.bb.cccc')).toBe(false);
    expect(validateDate('15.May.2023')).toBe(false);
    expect(validateDate('1a.05.2023')).toBe(false);
  });

  test('выдаёт предупреждение, если дата раньше текущей', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getDate().toString().padStart(2, '0')}.${(yesterday.getMonth() + 1).toString().padStart(2, '0')}.${yesterday.getFullYear()}`;
    
    expect(validateDate(yesterdayStr)).toBe(false);
  });

  test('пропускает корректные даты в будущем', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = `${tomorrow.getDate().toString().padStart(2, '0')}.${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}.${tomorrow.getFullYear()}`;
    
    expect(validateDate(tomorrowStr)).toBe(true);
  });
});