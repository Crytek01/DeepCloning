# DeepCloning

DeepCloning is a simple Deno library for cloning deeply nested objects
asynchronously or synchronously.

It can clone arrays, maps, sets, and dates within.

## Usage

### Asynchronously

```typescript
import { deepCloning } from "https://deno.land/x/deep_cloning@v1.0.0/mod.ts";

const objectToClone = {
  "name": "John Smith",
  "age": 35,
  "employment": {
    "company": "Acme Inc",
    "position": "Software Engineer",
    "skills": ["Java", "Python", "JavaScript"],
  }
}

const clonedObject = await deepCloning(objectToClone);

Returns {
  "name": "John Smith",
  "age": 35,
  "employment": {
    "company": "Acme Inc",
    "position": "Software Engineer",
    "skills": ["Java", "Python", "JavaScript"],
  }
}
console.log(clonedObject);
```

### Synchronously

```typescript
import { deepCloningSync } from "https://deno.land/x/deep_cloning@v1.0.0/mod.ts";

const objectToClone = {
  "name": "John Smith",
  "age": 35,
  "employment": {
    "company": "Acme Inc",
    "position": "Software Engineer",
    "skills": ["Java", "Python", "JavaScript"],
  }
}

const clonedObject = await deepCloning(objectToClone);

Returns {
  "name": "John Smith",
  "age": 35,
  "employment": {
    "company": "Acme Inc",
    "position": "Software Engineer",
    "skills": ["Java", "Python", "JavaScript"],
  }
}
console.log(clonedObject);
```

## How to run benchmark?

Simply type

```sh
deno bench ./benchmark/mod.ts
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
