// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd' ]>, ['a', 'b', 'c']>>,
]


// ============= Your Code Here =============
type Pop<T extends any[]> = T extends [...infer F, infer L] ? F : never

// ============= 知识点 =============
// 1. ...infer F 没有限制一定是数组最后一项，与JS不同