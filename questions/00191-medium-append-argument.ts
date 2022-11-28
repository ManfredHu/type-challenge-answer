// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<123, number>
]


// ============= Your Code Here =============
type AppendArgument<Fn extends (...args: any) => any, A> = 
  Fn extends (...args: infer T) => infer R
    ? (...args: [...T, A]) => R
    : Fn

// @answer-end
// 知识点
// 1. 通过 (...args: any) => any限定了参数类型，可以用于任意函数
// 2. (args: any) => any 与 (...args: any) => any 区别，前者限定了一个参数args类型任意，后者不限制参数类型与数量
// 3. (...args: any) => any 的 args就是一个类数组类型，可以通过 [...T, A] 返回tuple类型
    
