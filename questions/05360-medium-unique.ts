// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]


// ============= Your Code Here =============
type Includes<T extends any[], S> = T extends [infer F, ...infer Rest]
                                  ? Equal<F, S> extends true
                                    ? true
                                    : Includes<Rest, S>
                                  : false

type Unique<T, R extends any[] = []> = T extends [infer F, ...infer Rest]
                                        ? Includes<R, F> extends true
                                          ? Unique<Rest, [...R]> 
                                          : Unique<Rest, [...R, F]>
                                        : R

// @answer-end
namespace t5360 {
  // 1. 需要一个类似 Array.includes的函数 Includes 查找数组内是否有相同项
  type t1 = Includes<[1, 1, 2], 2>

  // 2. 迭代数组每一项，如果 R 里没有则加入，有的话则不加入直接跳过。同样的是用 Equal 对每一项进行比对
  type t2 = Unique<[1, 1, 2, 2, 3, 3]> 
}