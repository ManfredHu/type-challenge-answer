// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>


// ============= Your Code Here =============
type If<C extends boolean, T, F> = C extends true ? T : F

// ============= 知识点 =============
// 1. X extends boolean 可以判断X是否boolean,同理其他类型也可以，比如下面的isNumber
type isNumber<T> = T extends number ? true: false
type cases2 = [
  Expect<Equal<isNumber<5>, true>>,
]