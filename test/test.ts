import {
  assert,
  assertEquals,
  assertNotStrictEquals,
  assertStrictEquals,
  describe,
  it,
} from "../dev_depts.ts";

import {
  _deepCloning,
  deepCloning,
  deepCloningSync,
} from "../src/deep_cloning/deep_cloning.ts";

import {
  isNull,
  isNullish,
  isObject,
  isSet,
  isUndefined,
  not,
} from "../src/helpers/predicate_helpers.ts";

describe("not function test", () => {
  it("should return true if expression is false", () => {
    assert(not(true) === false);
  });

  it("should return false if expression is true", () => {
    assert(not(false) === true);
  });
});

describe("isUndefined function test", () => {
  it("should return true if variable is undefined", () => {
    assert(isUndefined(undefined) === true);
  });

  it("should return false if variable is not undefined", () => {
    assert(isUndefined({}) === false);
  });

  it("should return false if variable is not undefined", () => {
    assert(isUndefined(1) === false);
  });

  it("should return false if variable is not undefined", () => {
    assert(isUndefined("hi") === false);
  });

  it("should return false if variable is not undefined", () => {
    assert(isUndefined("") === false);
  });
});

describe("isNull function test", () => {
  it("should return true if variable is null", () => {
    assert(isNull(null) === true);
  });

  it("should return false if variable is not null", () => {
    assert(isNull({}) === false);
  });

  it("should return false if variable is not null", () => {
    assert(isNull(1) === false);
  });

  it("should return false if variable is not null", () => {
    assert(isNull("hi") === false);
  });

  it("should return false if variable is not null", () => {
    assert(isNull("") === false);
  });
});

describe("isNullish function test", () => {
  it("should return true if variable is falsy", () => {
    assert(isNullish(null) === true);
  });

  it("should return true if variable is falsy", () => {
    assert(isNullish(undefined) === true);
  });

  it("should return false if variable is not falsy", () => {
    assert(isNullish({}) === false);
  });

  it("should return false if variable is not falsy", () => {
    assert(isNullish(1) === false);
  });

  it("should return false if variable is not falsy", () => {
    assert(isNullish("hi") === false);
  });

  it("should return false if variable is not falsy", () => {
    assert(isNullish("") === false);
  });
});

describe("isObject function test", () => {
  it("should return true if variable is object", () => {
    assert(isObject({}) === true);
  });

  it("should return true if variable is object", () => {
    assert(isObject(new Set()) === true);
  });

  it("should return true if variable is object", () => {
    assert(isObject(new Date()) === true);
  });

  it("should return true if variable is object", () => {
    assert(isObject(new Map()) === true);
  });

  it("should return false if variable is not object", () => {
    assert(isObject(1) === false);
  });

  it("should return false if variable is not object", () => {
    assert(isObject("hi") === false);
  });
});

describe("isSet function test", () => {
  it("should return true if variable is set", () => {
    assert(isSet(new Set()) === true);
  });

  it("should return false if variable is not set", () => {
    assert(isSet({}) === false);
  });

  it("should return false if variable is not set", () => {
    assert(isSet(1) === false);
  });

  it("should return false if variable is not set", () => {
    assert(isSet("hi") === false);
  });

  it("should return false if variable is not set", () => {
    assert(isSet("") === false);
  });
});

describe("_deepCloning test", () => {
  it("should copy simple object", () => {
    const objectToClone = {
      name: "Clone",
      date: new Date(),
      parts: new Map(),
      uniqueParts: new Set(),
    };

    const clonedObject = _deepCloning(objectToClone) as typeof objectToClone;

    assertEquals(objectToClone, clonedObject);
    assertNotStrictEquals(objectToClone.date, clonedObject.date);
    assertNotStrictEquals(objectToClone.parts, clonedObject.parts);
    assertNotStrictEquals(objectToClone.uniqueParts, clonedObject.uniqueParts);

    assert(objectToClone !== clonedObject);
  });

  describe("primitives case", () => {
    it("should return the same value if it enters a number", () => {
      assertStrictEquals(_deepCloning(1), 1);
    });

    it("should return the same value if it enters a string", () => {
      assertStrictEquals(_deepCloning(""), "");
    });

    it("should return the same value if it enters an undefined", () => {
      assertStrictEquals(_deepCloning(undefined), undefined);
    });

    it("should return the same value if it enters an null", () => {
      assertStrictEquals(_deepCloning(null), null);
    });

    it("should return the same value if it enters a boolean", () => {
      assertStrictEquals(_deepCloning(true), true);
    });
  });

  describe("array case", () => {
    it("should clone array if it enter an array", () => {
      const value = [1, 2, 3, "hi"];
      const clonedValue = _deepCloning(value);

      assertEquals(value, clonedValue);
      assertNotStrictEquals(value, clonedValue);
    });
  });

  describe("set case", () => {
    it("should clone set if it enter a set", () => {
      const value = new Set([1, { hi: "hi!" }]);
      const clonedValue = _deepCloning(value) as typeof value;

      assertEquals(value, clonedValue);
      assertNotStrictEquals(value, clonedValue);

      const setValues = [...value];
      const clonedSetValues = [...clonedValue];

      assertNotStrictEquals(setValues.at(-1), clonedSetValues.at(-1));
      assertNotStrictEquals(setValues.at(-1), clonedSetValues.at(-1));
    });
  });

  describe("date case", () => {
    it("should clone date if it enter a date", () => {
      const value = new Date();
      const clonedValue = _deepCloning(value);

      assertEquals(value, clonedValue);
      assertNotStrictEquals(value, clonedValue);
    });
  });

  describe("map case", () => {
    it("should clone map if it enter a map", () => {
      const value = new Map([["1", 1]]);
      const clonedValue = _deepCloning(value);

      assertEquals(value, clonedValue);
      assertNotStrictEquals(value, clonedValue);
    });

    it("should clone map if map has object as value", () => {
      const value = new Map([["1", { name: "Max" }]]);
      const clonedValue = _deepCloning(value) as typeof value;

      assertEquals(value, clonedValue);
      assertNotStrictEquals(value, clonedValue);
      assertNotStrictEquals(value.get("1"), clonedValue.get("1"));
    });
  });

  describe("function case", () => {
    it("should return the same reference", () => {
      const value = () => "Hi";
      const clonedValue = _deepCloning(value);

      assertStrictEquals(value, clonedValue);
    });
  });
});

describe("deepCloningSync Test", () => {
  it("should clone object", () => {
    const value = {
      name: "Erick",
      pets: [
        {
          name: "Max",
          born: new Date(),
        },
      ],
    };

    const clonedValue = deepCloningSync(value);

    assertEquals(value, clonedValue);
    assert(value !== clonedValue);
  });
});

describe("deepCloning Test", () => {
  it("should clone object", async () => {
    const value = {
      name: "Erick",
      pets: [
        {
          name: "Max",
          born: new Date(),
        },
      ],
    };

    const clonedValue = await deepCloning(value);

    assertEquals(value, clonedValue);
    assertNotStrictEquals(value, clonedValue);

    assertNotStrictEquals(value.pets, clonedValue.pets);
    assertNotStrictEquals(value.pets[0].born, clonedValue.pets[0].born);
  });
});
