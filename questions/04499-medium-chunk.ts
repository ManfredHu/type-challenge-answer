// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]


// ============= Your Code Here =============
type Chunk<T extends any[], N extends number = 0, Temp extends any[] = []> = T extends [infer F, ...infer Rest]
                                                                            ? Temp['length'] extends N
                                                                              ? [Temp, ...Chunk<[F, ...Rest], N>]
                                                                              : Chunk<Rest, N, [...Temp, F]>
                                                                            : Temp['length'] extends 0
                                                                              ? []
                                                                              : [Temp]

// @answer-end
// 知识点
namespace t4499 {
  // 1. 很容易想到递归，拿一个临时数组Temp存一下打包的值，当达到第二个参数值限定时候将打包的Temp返回，继续递归直到最后

  // 2. 推导 Chunk<[1,2,3], 2>的过程
  type t1 = Chunk<[1, 2, 3], 2>
  type t2 = Chunk<[2, 3], 2, [1]>
  type t3 = Chunk<[3], 2, [1, 2]>
  type t4 = [[1,2], ...Chunk<[3], 2>]
  type t5 = [[1,2], ...Chunk<[], 2, [3]>]
  type t6 = [[1,2], [3]]

  // 3. 推导 Chunk<[1,2,3], 1>的过程
  type t7 = Chunk<[1, 2, 3], 1>
  type t8 = Chunk<[2, 3], 1, [1]>
  type t9 = [[1], ...Chunk<[2, 3], 1>]
  type t10 = [[1], ...Chunk<[3], 1, [2]>]
  type t11 = [[1], [2], ...Chunk<[3], 1>]
  type t12 = [[1], [2], ...Chunk<[], 1, [3]>]
  type t13 = [[1], [2], [3], ...[]]
}
