// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>, { stringToNumber: number }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }>, { stringToNumber: number; skipParsingMe: boolean }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }>, { fields: string[] }>>,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>, { name: string }>>,
  Expect<Equal<MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>, { name: boolean; date: string }>>,
]


// ============= Your Code Here =============
type Transform<R extends { mapFrom: any, mapTo: any}, T> = R extends any
                                                          ? T extends R['mapFrom']
                                                            ? R['mapTo']
                                                            : never // 这里必须是never，如果是T则当R为Union Type会返回类似 string | Date 的联合类型
                                                          : never

type MapTypes<T, R extends { mapFrom: any, mapTo: any}> = {
  [K in keyof T]: T[K] extends R['mapFrom'] ? Transform<R, T[K]>: T[K]
}

// @answer-end
namespace t5821 {
  // 1. 最后返回的是一个对象，通过 {[K in keyof T]: xxx } 迭代对象调整最后的返回 { key: value }，很容易得到如下答案
  type t1<T, R extends { mapFrom: any, mapTo: any}> = {
    [K in keyof T]: [T[K]] extends [R['mapFrom']] ? R['mapTo']: T[K]
  }
  // 2. 最后的case因为是 R 是union type，暂无法通过，需要考虑特殊情况
  type t2 = t1<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }>
  type t3 = Transform<{ mapFrom: string; mapTo: number }, string>
  type t4 = Transform<{ mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }, Date>

  // 3. 为什么是 R extends any ? 其实主要是为了触发 union type 的分配律，extends unknown 也可以额
  type t5<R> = R extends unknown ? R extends number ? true: 1 : never
  type t6 = t5<string | number>
}
