// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<never>, []>>,
]


// ============= Your Code Here =============
type Permutation<T, U = T> = [T] extends [never] 
  ? []
  : T extends U
    ? [T, ...Permutation<Exclude<U, T>>]
    : never


// @answer-end
// 知识点
namespace t00296 {
  // 1. tuple to array 
  type Uni = 'A' | 'B' | 'C'
  type S1<U> = U extends any ? [U] : never
  type P1 = S1<Uni> // ['A']|['B']|['C']

  // 2. 递归, 终结递归条件
  // [A, ...[B, ...[C, ...Permutation<never>]]]
  // [B, ...[A, ...[C, ...Permutation<never>]]]
  // [C, ...[A, ...[B, ...Permutation<never>]]]
  // 最后结果会在 Permutation<never> 下终结，但是 never 无法 extends 自己
  type isNeverTemp<T> = T extends never ? true: false
  type P2 = isNeverTemp<never>
  // 所以要用下面的方式
  type isNever<T> = [T] extends [never] ? true: false
  type P3 = isNever<never>
}