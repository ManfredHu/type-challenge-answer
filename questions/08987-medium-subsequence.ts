// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
]


// ============= Your Code Here =============
type Subsequence<T extends any[]> = T extends [infer F, ...infer R]
                                    ? Subsequence<R> | [F, ...Subsequence<R>]
                                    : T

// @answer-end
namespace t8987 {
  // 执行流程
  type t1 = Subsequence<[1, 2]>
  type t2 = Subsequence<[2]> | [1, ...Subsequence<[2]>]
  type t3 = Subsequence<[]> | [2, ...Subsequence<[]>] | [1, ...Subsequence<[2]>]
  type t4 = [] | [2] | [1, ...([] | [2])]
  type t5 = [] | [2] | [1] | [1, 2]

  // 看一个神奇的case
  type t6 = [1, ...([1] | [2])]
  type t7 = [1, 1] | [1, 2]
}
