// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]


// ============= Your Code Here =============
type StringToUnion<T extends string> = T extends `${infer F}${infer R}` ? F | StringToUnion<R> : never

// @answer-end
// 知识点
// 1. 用一个临时变量S = [] 递归统计，最后 Array 转 tuple 可以用 S[number]，很容易得到如下答案，但是不够优雅
type StringToUnion2<T extends string, S extends string[] = []> =
  T extends `${infer U}${infer V}`
    ? StringToUnion2<V, [U, ...S]>
    : S extends []
      ? never
      : S[number]
// 2. 更优雅的方式是 利用 tuple的特性递归，不需要用数组存储，而是用 F | StringToUnion<R> 即可 