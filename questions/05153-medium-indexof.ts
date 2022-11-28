// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]


// ============= Your Code Here =============
type IndexOf<T extends any[], U, Index extends 1[] = []> = T extends [infer F, ...infer Rest] 
                                                            ? Equal<F, U> extends true
                                                              ? Index['length']
                                                              : IndexOf<Rest, U, [...Index, 1]>
                                                            : -1


// @answer-end
// 简单解析
namespace t5163 {
  // TS没有计数能力，只能用数组临时变量记着，最后取数组长度实现
  // 1. 特殊的case，下面这个case里，按循环迭代会出现 1 extends number 为true的情况，加上[]也是一样的。应该要用 Equals 判定
  type t1 = IndexOf<[string, 1, number, 'a'], number>
  type t2 = 1 extends number ? true: false // true
  type t3 = [1] extends [number] ? true: false // true
  type t4 = [number] extends [1] ? true: false // false
  type t5 = number extends 1 ? true: false // false
  type t6 = any extends string ? true: false // boolean
  type t7 = [any] extends [string] ? true: false // true
}