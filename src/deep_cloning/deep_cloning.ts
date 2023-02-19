import {
  isArray,
  isDate,
  isFunction,
  isMap,
  isObject,
  isSet,
  not,
  TObject,
} from "../helpers/predicate_helpers.ts";

export const _deepCloning = (value: unknown): unknown => {
  if (not(isObject(value))) {
    return value;
  }

  if (isMap(value)) {
    const mapEntries = [...value];

    const clonedEntries: [unknown, unknown][] = [];

    for (const [key, mapValue] of mapEntries) {
      clonedEntries.push([key, _deepCloning(mapValue)]);
    }

    return new Map(clonedEntries);
  }

  if (isSet(value)) {
    const setValues = [...value];

    const clonedEntries: unknown[] = [];

    for (const setValue of setValues) {
      clonedEntries.push(_deepCloning(setValue));
    }

    return new Set(clonedEntries);
  }

  if (isArray(value)) {
    const clone: unknown[] = [];

    for (let index = 0; index < value.length; index++) {
      clone.push(_deepCloning(value[index]));
    }

    return clone;
  }

  if (isDate(value)) {
    return new Date(value);
  }

  //Does not copy functions, passes reference
  if (isFunction(value)) {
    return value;
  }

  if (isObject(value)) {
    const objectClone: TObject = {};
    for (const key in value) {
      objectClone[key] = _deepCloning(value[key]);
    }

    return objectClone;
  }
};
/**
 * @description Clones object deeply synchronously.
 */
export const deepCloningSync = <T extends TObject>(object: T): T => {
  return _deepCloning(object) as T;
};

/**
 * @description Clones object deeply asynchronously.
 */
export const deepCloning = <T extends TObject>(object: T): Promise<T> => {
  return new Promise((resolve) => {
    resolve(_deepCloning(object) as T);
  });
};
