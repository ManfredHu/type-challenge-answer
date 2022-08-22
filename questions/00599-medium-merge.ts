// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


// ============= Your Code Here =============
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S 
                              ? S[K]
                              : K extends keyof F
                                ? F[K]
                                : never
}

// 知识点
// 1. 注意这里先后顺序，例子是后面覆盖前面，所以代码要反着来，先判定后面的存上，就不会有重复的了