export type Primitives =
  | string
  | Date
  | number
  | boolean
  | bigint
  | null
  | undefined;

export type NestedObject = {
  [key: string]: Primitives | NestedObject | NestedObject[];
};

export function flatten(
  obj: NestedObject,
  exclude: string[] = [],
  parentKey: string = '',
  result: {
    [key: string]: Primitives;
  } = {}
): { [key: string]: Primitives } {
  for (const key in obj) {
    if (exclude.includes(key)) continue;

    if (obj === null) {
      result[parentKey] = '';
    } else if (obj === undefined) {
      result[parentKey] = '';
    } else if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'object' && !Array.isArray(value)) {
        flatten(value as NestedObject, exclude, newKey, result);
      } else if (
        Array.isArray(value) &&
        typeof value === 'object' &&
        value.length > 0
      ) {
        value.forEach((v, index) => {
          flatten(v as NestedObject, exclude, `${newKey}[${index}]`, result);
        });
      } else {
        result[newKey] = value as Primitives;
      }
    }
  }
  return result;
}

export type FlattenedDictionary = {
  key: string;
  value: Primitives;
};

export function flattenToDictionary(
  obj: NestedObject | null | undefined,
  exclude: string[] = []
): FlattenedDictionary[] {
  if (obj === null || obj === undefined) return [];
  const flat = flatten(obj, exclude, '', {});
  return Object.keys(flat).map((k) => {
    return {
      key: k,
      value: toDisplay(flat[k]),
    };
  });
}

export function toDisplay(input: Primitives) {
  if (typeof input === 'number') {
    return input.toFixed(2);
  } else {
    return input;
  }
}
