// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]


// ============= Your Code Here =============
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K: never]: T[K]
}
type b = PickByType<Model, boolean>
// 知识点
namespace t2595 {
  // 1. 从 Remove Index Signature
  // 如下写法可以删除key
  // {
  //   [xx as never]: any
  // }
  type t1 = Model['name'] extends string ? 1: 2
  // 2. K in keyof T as X，这里的X可以是 K/T[K]都行，配合 X extends U ? Condition1: Condition2 就可以做条件判断
  // 断句: 以下两行效果相等，说明这里的 as 是重定义，当 K 满足后面()内条件时候才会继续
  // [K in keyof T as T[K] extends U ? K: never]: T[K]
  // [K in keyof T as (T[K] extends U ? K: never)]: T[K]
  // 如下因为 as never了，所以虽然 K in keyof T遍历了所有的key但是还是不会生效
  type t2<T, U> = {
    [K in keyof T as never]: T[K]
  }
  type t3 = t2<Model, boolean>
  // 同理答案的 as (T[K] extends U ? K: never), 必须括号内值非never才会生效
}