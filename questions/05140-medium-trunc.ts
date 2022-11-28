// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]


// ============= Your Code Here =============
type Trunc<T extends string | number> = `${T}` extends `${infer F}.${any}` ? F : `${T}`

// @answer-end
namespace t5140 {
  // 1. number to string, 使用 `${num}` 搞定
  // 2. 所以全部转化为 字符串推断，有 '整数.小数' 范式的就是需要取整，否则就不需要直接转字符串
}