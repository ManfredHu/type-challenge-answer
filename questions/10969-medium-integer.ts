// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]


// ============= Your Code Here =============
type Integer<T extends number> = number extends T
                                ? never
                                : `${T}` extends `${infer F}.${infer L}`
                                  ? L extends '0'
                                    ? F
                                    : never
                                  : T

// @answer-end
namespace t10969 {
  // 思路：前面例子都是判断小数点，有小数点的话则必须 x.0，否则就是never
  type t1 = 1.1 extends number ? true: false
  type t2 = 1.0 extends number ? true: false

  // 但是判断 1.1 和 1.0 的时候要注意，当y=0时候，x.y 的 .y 会被省略掉，如下
  type ElipsisToInterger<T extends number> = T extends number ? T : never
  type t11 = ElipsisToInterger<1.0> // 小数点省略了，变成 1
  type t12 = ElipsisToInterger<1.1> // 有小数点，浮点数

  type t3 = Integer<1.1> // 此时 L 为 '1'，不是 0，所以返回 never
  type t4 = Integer<number> // 此时 typeof x 为 number，满足 number extends number, 此时需要返回 never
}
