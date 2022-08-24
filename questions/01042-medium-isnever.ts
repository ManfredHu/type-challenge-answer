// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<"">, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
];

// ============= Your Code Here =============
type IsNever<T> = [T] extends [never] ? true : false;

// 知识点
// 1. 00296-medium-permutation.ts 写过 never 无法 extends 自己
namespace t1042 {
  type isNeverTemp<T> = T extends never ? true: false
  type P2 = isNeverTemp<never>
  // 所以要用下面的方式
  type isNever<T> = [T] extends [never] ? true: false
  type P3 = isNever<never>
}