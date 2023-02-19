//Type Helpers
type TObject = Record<string, unknown>;
type TNullish = undefined | null;
type TMap = Map<unknown, unknown>;
type TSet = Set<unknown>;
type TArray = unknown[];
type TFunction = (...args: unknown[]) => unknown;
type TPredicate<T> = (x: unknown) => x is T;

export const not = (x: boolean) => !x;

export const isUndefined: TPredicate<undefined> = (x): x is undefined =>
  x === undefined;

export const isNull: TPredicate<null> = (x): x is null => x === null;

export const isNullish: TPredicate<TNullish> = (x): x is TNullish =>
  isUndefined(x) || isNull(x);

//Any reference type
export const isObject: TPredicate<TObject> = (x): x is TObject =>
  x instanceof Object;

export const isMap: TPredicate<TMap> = (x): x is TMap => x instanceof Map;

export const isSet: TPredicate<TSet> = (x): x is TSet => x instanceof Set;

//References type sub objects
export const isArray: TPredicate<TArray> = (x): x is TArray =>
  x instanceof Array;

export const isDate: TPredicate<Date> = (x): x is Date => x instanceof Date;

export const isFunction: TPredicate<TFunction> = (x): x is TFunction =>
  x instanceof Function;

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

export const deepCloningSync = <T extends TObject>(object: T): T => {
  return _deepCloning(object) as T;
};

export const deepCloning = <T extends TObject>(object: T): Promise<T> => {
  return new Promise((resolve) => {
    resolve(_deepCloning(object) as T);
  });
};
