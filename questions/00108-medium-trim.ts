// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { Space } from './00106-medium-trimleft'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]


// ============= Your Code Here =============
type Trim<S extends string> = S extends `${Space}${infer R}` | `${infer R}${Space}` ? Trim<R>: S

// 知识点
// 1. 对比 trim left 的区别就是，S extends A|B 这种思维，左右空格可以用两个union type覆盖到