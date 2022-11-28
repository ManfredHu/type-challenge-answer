// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]


// ============= Your Code Here =============
type IsTuple<T> = [T] extends [never] ? false
                                      : T extends readonly any[]
                                        ? number extends T['length']
                                          ? false
                                          : true
                                        : false
                                      

// @answer-end
// 知识点
namespace t4484 {
  // 1. from https://www.w3schools.com/typescript/typescript_tuples.php
  // A tuple is a typed array with a pre-defined length and types for each index.
  // 也就是说 tuple 应该是一个类型数组，且长度是已定义的 T['length'] is number

  // 2. tuple length property
  let ourTuple: [boolean, string, number];
  // initialized incorrectly which throws an error
  ourTuple = [false, 'Coding God was mistaken', 5];
  type t1 = typeof ourTuple['length']
  // type t1 = 3
  type t2 = number extends t1 ? true: false
  // type t2 = false

  // 3. array length property
  const numberArr = Array(10).fill(0) as number[]
  type t4 = typeof numberArr['length']
  // type t4 = number
  type t5 = number extends t4 ? true: false
  // type t5 = true

  // 4. readonly 判定
  type t6 = readonly [1] extends any[] ? 1: 2
  type t7 = readonly [1] extends readonly any[] ? 1: 2 
}