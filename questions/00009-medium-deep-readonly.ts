// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [Expect<Equal<DeepReadonly<X>, Expected>>];

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};

// ============= Your Code Here =============
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};

// @answer-end
// 知识点
// 1. Function extends Object, 这与JS里(() => {}) instanceof Object一样，但是
type TestObject<T> = T extends Object ? true : false;
type case2 = [Expect<Equal<TestObject<() => {}>, true>>];
// 2. extends never
// https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for
type TestNever<T> = T extends never ? true : false;
type TestKeyofNever<T> = keyof T extends never ? true : false;
type case3 = [
  Expect<Equal<TestNever<123>, false>>, // 123 extends never，是false
  Expect<Equal<TestNever<() => {}>, false>>, // () => {} extends never，是false
  Expect<Equal<TestNever<never>, never>>, // tips: 
  Expect<Equal<TestKeyofNever<() => {}>, true>>, // keyof () => {} extends never，是true。可以理解为function没有key
  Expect<Equal<TestKeyofNever<{ a: string }>, false>>, // false, 对象有key a
  Expect<Equal<TestKeyofNever<{}>, true>>, // true，空对象没有key
  Expect<Equal<TestKeyofNever<object>, true>>, // true，空对象没有key
  Expect<Equal<TestKeyofNever<string>, false>>, // false, string下有方法 number | typeof Symbol.iterator | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice"
  Expect<Equal<TestKeyofNever<{ a: string } | { b: string }>, true>>, // union类型 没有公共的key
  Expect<Equal<TestKeyofNever<{ b: string } | { b: number }>, false>> // union类型有公共的key 
];

// 2.1 keyof () => {} is never
type TestFunKeyof<T> = keyof T;
type TestFunKeyofTest = TestFunKeyof<() => {}>;
