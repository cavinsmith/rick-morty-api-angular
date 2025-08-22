import { isEqual } from './is-equal';

describe('isEqual utility', () => {
  it('should return true for identical objects', () => {
    const obj1 = { name: 'Rick', age: 60 };
    const obj2 = { name: 'Rick', age: 60 };

    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for objects with different values', () => {
    const obj1 = { name: 'Rick', age: 60 };
    const obj2 = { name: 'Morty', age: 14 };

    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should return false for objects with different number of keys', () => {
    const obj1 = { name: 'Rick', age: 60 };
    const obj2 = { name: 'Rick', age: 60, dimension: 'C-137' };

    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should return true for empty objects', () => {
    expect(isEqual({}, {})).toBe(true);
  });

  it('should return false when one object is empty', () => {
    const obj1 = {};
    const obj2 = { name: 'Rick' };

    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should handle objects with null values', () => {
    const obj1 = { name: 'Rick', value: null };
    const obj2 = { name: 'Rick', value: null };

    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should handle objects with undefined values', () => {
    const obj1 = { name: 'Rick', value: undefined };
    const obj2 = { name: 'Rick', value: undefined };

    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for null vs undefined values', () => {
    const obj1 = { name: 'Rick', value: null };
    const obj2 = { name: 'Rick', value: undefined };

    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should handle different key orders', () => {
    const obj1 = { name: 'Rick', age: 60 };
    const obj2 = { age: 60, name: 'Rick' };

    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should handle primitive values', () => {
    expect(isEqual('test', 'test')).toBe(true);
    expect(isEqual(123, 123)).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(isEqual('test', 'other')).toBe(false);
    expect(isEqual(123, 456)).toBe(false);
    expect(isEqual(true, false)).toBe(false);
  });

  it('should handle string vs number comparison', () => {
    const obj1 = { value: '123' };
    const obj2 = { value: 123 };

    expect(isEqual(obj1, obj2)).toBe(false);
  });

  it('should handle boolean vs string comparison', () => {
    const obj1 = { active: true };
    const obj2 = { active: 'true' };

    expect(isEqual(obj1, obj2)).toBe(false);
  });
});
