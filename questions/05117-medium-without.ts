// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
type ArrToUnion<S> = S extends any[] ? S[number]: S
type Without<T, U> = T extends [infer F, ...infer Rest]
                    ? F extends ArrToUnion<U>
                      ? Without<Rest, U>
                      : [F, ...Without<Rest, U>]
                    : T


// 知识点
namespace t5117 {
  // 1. 如何判断某个元素等于某一项（第一个case👆）或数组内某一项，用 ArrToUnion
  type t1 = [1] extends 1 ? true: false
  type t2 = [1] extends [1, 1] ? true: false
  type t3 = 1 extends [1, 1][number] ? true: false
  type t4 = 1 extends ArrToUnion<[1, '1']> ? true: false
}