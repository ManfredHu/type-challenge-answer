// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, Exclude<'a' | 'b' | 'c', 'a'>>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, Exclude<'a' | 'b' | 'c', 'a' | 'b'>>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, Exclude<string | number | (() => void), Function>>>,
]


// ============= Your Code Here =============
type MyExclude<T, U> = T extends U ? never : T

// @answer-end
// 知识点
// 1. Excludes 满足分配律，比如以下两个相等
type case2 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
type case3 = Exclude<'a', 'a' | 'b'> | Exclude<'b', 'a' | 'b'> | Exclude<'c', 'a' | 'b'>