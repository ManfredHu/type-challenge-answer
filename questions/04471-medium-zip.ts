// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]


// ============= Your Code Here =============
type Zip<T, U> = T extends [infer F, ...infer R] 
                ? U extends [infer N, ...infer M]
                  ? [[F, N], ...Zip<R, M>]
                  : []
                : []

// @answer-end
// 知识点
namespace t4471 {
  // 1. 题意是两两组合，所以都取第一个即可，剩下的递归即可
}