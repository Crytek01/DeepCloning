import { deepCloningSync } from "../src/mod.ts";
import bigObjectTenLevelsDeep from "./fixture/big_object.ts";
import * as _ from "https://raw.githubusercontent.com/lodash/lodash/es/lodash.js";
import { clone } from "../depts.ts";

Deno.bench("deepCloningSync test", () => {
  deepCloningSync(bigObjectTenLevelsDeep);
});

Deno.bench("lodash test", () => {
  _.cloneDeep(bigObjectTenLevelsDeep);
});

Deno.bench("Object clone test", () => {
  clone(bigObjectTenLevelsDeep);
});

Deno.bench("Not fully copy with JSON Stringify", () => {
  JSON.parse(JSON.stringify(bigObjectTenLevelsDeep));
});
