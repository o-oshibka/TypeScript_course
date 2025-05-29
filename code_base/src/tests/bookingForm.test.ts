import { generateBookings } from '../utils/generateBookings.ts';
import { getRandomDateInNextMonth } from '../utils/getRandomDateInNextMonth.ts';
import { Apartment } from '../utils/stub.ts';

describe('Booking Form Generation', () => {
  const mockApartments: Apartment[] = [
    { id: 1, name: 'Cozy Studio', location: 'Paris' },
    { id: 2, name: 'Luxury Penthouse', location: 'New York' },
    { id: 3, name: 'Beach Villa', location: 'Bali' },
  ];

  test('генерирует указанное количество бронирований', () => {
    const numOfBookings = 5;
    const bookings = generateBookings(mockApartments, numOfBookings);
    expect(bookings.length).toBe(numOfBookings);
  });

  test('каждое бронирование имеет уникальный bookingId', () => {
    const bookings = generateBookings(mockApartments, 3);
    const ids = bookings.map(b => b.bookingId);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('дата заезда находится в следующем месяце', () => {
    const bookings = generateBookings(mockApartments, 1);
    const today = new Date();
    const nextMonth = today.getMonth() + 1;
    const checkInDate = new Date(bookings[0].checkIn);
    
    expect(checkInDate.getMonth()).toBe(nextMonth % 12);
    expect(checkInDate.getFullYear()).toBeGreaterThanOrEqual(today.getFullYear());
  });

  test('дата выезда позже даты заезда', () => {
    const bookings = generateBookings(mockApartments, 1);
    const checkInDate = new Date(bookings[0].checkIn);
    const checkOutDate = new Date(bookings[0].checkOut);
    
    expect(checkOutDate.getTime()).toBeGreaterThan(checkInDate.getTime());
  });

  test('длительность пребывания от 1 до 7 дней', () => {
    const bookings = generateBookings(mockApartments, 1);
    const checkInDate = new Date(bookings[0].checkIn);
    const checkOutDate = new Date(bookings[0].checkOut);
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    expect(diffDays).toBeGreaterThanOrEqual(1);
    expect(diffDays).toBeLessThanOrEqual(7);
  });

  test('все бронирования имеют изображение', () => {
    const bookings = generateBookings(mockApartments, 3);
    bookings.forEach(booking => {
      expect(booking.img).toBeDefined();
      expect(booking.img).not.toBe('');
    });
  });

  test('использует квартиры из переданного массива', () => {
    const bookings = generateBookings(mockApartments, 3);
    const apartmentIds = mockApartments.map(a => a.id);
    
    bookings.forEach(booking => {
      expect(apartmentIds).toContain(booking.apartmentId);
      expect(mockApartments.some(a => a.name === booking.apartmentName)).toBe(true);
      expect(mockApartments.some(a => a.location === booking.location)).toBe(true);
    });
  });
});

describe('getRandomDateInNextMonth', () => {
    test('возвращает дату в следующем месяце', () => {
      const today = new Date();
      const nextMonth = today.getMonth() + 1;
      const adjustedNextMonth = nextMonth % 12;
      
      const randomDate = getRandomDateInNextMonth();
      
      expect(randomDate.getFullYear()).toBeGreaterThanOrEqual(today.getFullYear());
      expect(randomDate.getMonth()).toBe(adjustedNextMonth);
      expect(randomDate.getDate()).toBeGreaterThanOrEqual(1);
      expect(randomDate.getDate()).toBeLessThanOrEqual(31);
    });
  
    test('корректно обрабатывает переход через год', () => {
      const december = new Date();
      december.setMonth(11);
      
      const randomDate = getRandomDateInNextMonth();
      
      if (december.getMonth() === 11) {
        expect(randomDate.getFullYear()).toBe(december.getFullYear() + 1);
        expect(randomDate.getMonth()).toBe(0);
      }
    });
  });