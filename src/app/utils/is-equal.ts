export const isEqual = (obj1: unknown, obj2: unknown): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 == null || obj2 == null) {
    return obj1 === obj2;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  const obj1known = obj1 as Record<string, unknown>;
  const obj2known = obj2 as Record<string, unknown>;
  const keys1 = Object.keys(obj1known);
  const keys2 = Object.keys(obj2known);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1known[key] !== obj2known[key]) {
      return false;
    }
  }

  return true;
};
