// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]


// ============= Your Code Here =============
type Reverse<T extends any[]> = T extends [...infer Rest, infer End] ? [End, ...Reverse<Rest>]: T

// 知识点
// 1. 很容易得到如下答案，但是多了一个 K 作为临时变量存储
// type Reverse<T, K extends any[] = []> = T extends [infer F, ...infer Rest] ? Reverse<Rest, [F, ...K]>: K
// 2. 删除 K 得到更加精简的答案。主要是利用了 ...Reverse<Rest> 