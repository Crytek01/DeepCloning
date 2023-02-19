import {
  assert,
  assertEquals,
  assertNotStrictEquals,
  describe,
  it,
} from "../depts.ts";
import {
  _deepCloning,
  deepCloning,
  deepCloningSync,
  isNull,
  isNullish,
  isObject,
  isSet,
  isUndefined,
  not,
} from "../src/mod.ts";

describe("not function test", () => {
  it("should negate expression as false", () => {
    assert(not(true) === false);
  });

  it("should negate expression as true", () => {
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

  it("should copy a nested object", () => {
    const objectToClone = {
      name: "Clone",
      date: new Date(),
      parts: new Map(),
      uniqueParts: new Set(),
      nest: {
        name: "Clone",
        date: new Date(),
        parts: new Map(),
        uniqueParts: new Set(),
        cost: 1000,
        nest: {
          name: "Clone",
          date: new Date(),
          parts: new Map(),
          uniqueParts: new Set(),
          cost: 1000,
        },
      },
    };

    const clonedObject = _deepCloning(objectToClone);

    assertEquals(objectToClone, clonedObject);
    assert(objectToClone !== clonedObject);
  });

  it("should copy a nested object with arrays", () => {
    const objectToClone = {
      name: "Alice",
      age: 30,
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: 12345,
      },
      interests: ["reading", "hiking", "cooking"],
      job: {
        title: "Software Engineer",
        company: "Acme Corporation",
        years: 5,
        projects: [
          {
            name: "Project A",
            startDate: "2020-01-01",
            endDate: "2021-06-30",
            tasks: ["design", "development", "testing"],
          },
          {
            name: "Project B",
            startDate: "2021-07-01",
            endDate: "2022-12-31",
            tasks: ["planning", "implementation", "deployment"],
          },
        ],
      },
    };

    const clonedObject = _deepCloning(objectToClone);

    assertEquals(objectToClone, clonedObject);
    assert(objectToClone !== clonedObject);
  });

  it("should copy a nested object with Sets", () => {
    const objectToClone = {
      name: "Alice",
      age: 30,
      hobbies: new Set(["reading", "hiking", "cooking"]),
      job: {
        title: "Software Engineer",
        company: "Acme Corporation",
        years: 5,
        projects: new Set([
          {
            name: "Project A",
            startDate: "2020-01-01",
            endDate: "2021-06-30",
            tasks: new Set(["design", "development", "testing"]),
          },
          {
            name: "Project B",
            startDate: "2021-07-01",
            endDate: "2022-12-31",
            tasks: new Set(["planning", "implementation", "deployment"]),
          },
        ]),
      },
    };

    const clonedObject = _deepCloning(objectToClone);

    assertEquals(objectToClone, clonedObject);
    assert(objectToClone !== clonedObject);
  });

  it("should copy a nested object with Maps", () => {
    const objectToClone = {
      name: "Alice",
      age: 30,
      hobbies: new Set(["reading", "hiking", "cooking"]),
      job: {
        title: "Software Engineer",
        company: "Acme Corporation",
        years: 5,
        projects: new Map([
          [
            "Project A",
            {
              startDate: "2020-01-01",
              endDate: "2021-06-30",
              tasks: new Map([
                ["design", 10],
                ["development", 20],
                ["testing", 5],
              ]),
            },
          ],
          [
            "Project B",
            {
              startDate: "2021-07-01",
              endDate: "2022-12-31",
              tasks: new Map([
                ["planning", 8],
                ["implementation", 15],
                ["deployment", 3],
              ]),
            },
          ],
        ]),
      },
    };

    const clonedObject = _deepCloning(objectToClone);

    assertEquals(objectToClone, clonedObject);
    assert(objectToClone !== clonedObject);
  });

  it("should copy a nested object with Map, Set, Date, functions and primitives", () => {
    const objectToClone = {
      string: "Hello, world!",
      number: 42,
      boolean: true,
      date: new Date(),
      set: new Set([1, 2, 3]),
      map: new Map([
        ["key1", "value1"],
        ["key2", "value2"],
      ]),
      array: [
        "a",
        "b",
        {
          nestedObject: {
            deeplyNestedSet: new Set([4, 5, 6]),
            deeplyNestedMap: new Map([
              ["key3", "value3"],
              ["key4", "value4"],
            ]),
            deeplyNestedArray: ["c", "d", new Date()],
            deeplyNestedFunction: function () {
              console.log("This is a deeply nested function!");
            },
          },
          nestedFunction: function () {
            console.log("This is a nested function!");
          },
        },
      ],
      topLevelFunction: function () {
        console.log("This is a top level function!");
      },
      arrowFunction: () => {
        console.log("Arrow function");
      },
    };

    const clonedObject = _deepCloning(objectToClone);

    assertEquals(objectToClone, clonedObject);
    assert(objectToClone !== clonedObject);
  });

  describe("primitive case", () => {
    it("should return the same value if it enters a number", () => {
      assert(_deepCloning(1) === 1);
    });

    it("should return the same value if it enters a string", () => {
      assert(_deepCloning("") === "");
    });

    it("should return the same value if it enters an undefined", () => {
      assert(_deepCloning(undefined) === undefined);
    });

    it("should return the same value if it enters an null", () => {
      assert(_deepCloning(null) === null);
    });

    it("should return the same value if it enters a boolean", () => {
      assert(_deepCloning(true) === true);
    });
  });

  describe("array case", () => {
    it("should clone array if it enter an array", () => {
      const value = [1, 2, 3, "hi"];
      const clonedValue = _deepCloning(value);

      assertEquals(value, clonedValue);
      assert(value !== clonedValue);
    });
  });

  describe("set case", () => {
    it("should clone set if it enter a set", () => {
      const value = new Set([1, 2, 3, 4, "hi", { hi: "hi!" }]);
      const clonedValue = _deepCloning(value);

      assertEquals(value, clonedValue);
      assertNotStrictEquals(value, clonedValue);
      assertNotStrictEquals(
        [...value].at(-1),
        [...(clonedValue as Set<unknown>)].at(-1),
      );
    });
  });

  describe("date case", () => {
    it("should clone date if it enter a date", () => {
      const value = new Date();
      const clonedValue = _deepCloning(value);

      assertEquals(value, clonedValue);
      assert(value !== clonedValue);
    });
  });

  describe("map case", () => {
    it("should clone map if it enter a map", () => {
      const value = new Map([["1", 1]]);
      const clonedValue = _deepCloning(value);

      assertEquals(value, clonedValue);
      assert(value !== clonedValue);
    });
  });

  describe("function case", () => {
    it("should return the same reference", () => {
      const value = () => "Hi";
      const clonedValue = _deepCloning(value);

      assert(value === clonedValue);
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
    assert(value !== clonedValue);

    assertNotStrictEquals(value.pets, clonedValue.pets);
    assertNotStrictEquals(value.pets[0].born, clonedValue.pets[0].born);
  });
});
