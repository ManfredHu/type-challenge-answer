// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
  Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | "a">, false>>
];

// ============= Your Code Here =============
type IsUnion<A, B = A> = A extends B ? ( [B] extends [A] ? false: true) : false

// @answer-end
// 知识点
namespace t1097 {
  type b = IsUnion<"a" | "b" | "c" | 1>;
  // 1. [string | number] vs string | number
  type P1 = "1" extends [string | number] ? true : false; // false, '1' not string array or number array
  type P2 = ["1"] extends [string | number] ? true : false; // true, ['1'] is string array
  type P3 = string | number;
  // 2. union type's distribution
  // 下面写法union type每次都会被传入T，最后合并所有值，所以P5 = 1 | '2'
  type P4<T, U = T> = T extends U ? T : 0;
  type P5 = P4<1 | "2">;

  type P6 = 1 extends (1 | '2') ? true: false // true, 1 在 (1|'2')里
  type P7 = [1 | '2'] extends [1] ? true: false // false
  type P8 = [1 | '2'] extends ['2'] ? true: false // false
  // 3. 上述答案执行流程
  // 对于 IsUnion<string> 这样的，首先 string extends string 为true，即 进入 [string] extends [string] 也为真，返回false
  // 对于 IsUnion<string | number> 这样的，执行 string extends string | number 为真，进入 [string | number] extends [string] 为假，但是这时为 union，返回true
}