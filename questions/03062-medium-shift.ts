// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
]

type error = [
  // @ts-expect-error
  Shift<number>
]
// ============= Your Code Here =============
type Shift<T extends Array<any>> = T extends [infer _, ...infer Rest] ? Rest: T

// 
