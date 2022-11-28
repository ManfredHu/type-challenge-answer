// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]


// ============= Your Code Here =============
export type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R>: S

// @answer-end
// 知识点
// 1. `${infer R}`是可以用的，``结合变量可以解构任意字符串
// 2. union type 联合类型当作一个个体的类型去使用，如 Space = ' '，ts会自动推倒
