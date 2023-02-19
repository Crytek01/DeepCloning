import { deepCloningSync } from "../src/mod.ts";
import bigObjectTenLevelsDeep from "./fixture/big_object.ts";
import { clone, cloneDeep } from "../dev_depts.ts";

Deno.bench("deepCloningSync test", () => {
  deepCloningSync(bigObjectTenLevelsDeep);
});

Deno.bench("lodash test", () => {
  cloneDeep(bigObjectTenLevelsDeep);
});

Deno.bench("Object clone test", () => {
  clone(bigObjectTenLevelsDeep);
});

Deno.bench("Not fully copy with JSON Stringify", () => {
  JSON.parse(JSON.stringify(bigObjectTenLevelsDeep));
});
