export const isEqual = (obj1: unknown, obj2: unknown): boolean => {
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
