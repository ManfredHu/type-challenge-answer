// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]


// ============= Your Code Here =============
type TupleToUnion<T extends any[]> = T[number]

// @answer-end
// 知识点
// 1. 元组tuple和数组类似，都可以用 T[number] 得到所有的子项