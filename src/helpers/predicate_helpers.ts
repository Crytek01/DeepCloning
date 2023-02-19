//Type Helpers
export type TObject = Record<string, unknown>;
export type TNullish = undefined | null;
export type TMap = Map<unknown, unknown>;
export type TSet = Set<unknown>;
export type TArray = unknown[];
export type TFunction = (...args: unknown[]) => unknown;
export type TPredicate<T> = (x: unknown) => x is T;

export const not = (x: boolean) => !x;

export const isUndefined: TPredicate<undefined> = (x): x is undefined =>
  x === undefined;

export const isNull: TPredicate<null> = (x): x is null => x === null;

export const isNullish: TPredicate<TNullish> = (x): x is TNullish =>
  isUndefined(x) || isNull(x);

export const isObject: TPredicate<TObject> = (x): x is TObject =>
  x instanceof Object;

export const isMap: TPredicate<TMap> = (x): x is TMap => x instanceof Map;

export const isSet: TPredicate<TSet> = (x): x is TSet => x instanceof Set;

export const isArray: TPredicate<TArray> = (x): x is TArray =>
  x instanceof Array;

export const isDate: TPredicate<Date> = (x): x is Date => x instanceof Date;

export const isFunction: TPredicate<TFunction> = (x): x is TFunction =>
  x instanceof Function;
