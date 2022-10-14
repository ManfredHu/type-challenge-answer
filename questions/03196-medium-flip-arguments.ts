// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { Reverse } from './03192-medium-reverse'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]


// ============= Your Code Here =============
type FlipArguments<T extends Function> = T extends (...args: infer Args) => infer R ? (
  (...args: Reverse<Args>) => R
): T

type b = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
// 知识点
namespace t3196 {
  // 1. 判断范型是函数
  type t1<T> = T extends Function ? true: false
  type t2 = t1<() => {}>
  type t3 = t1<'string'>
  // 2. 参数位置翻转，很容易联想到 Reverse
}