// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
]


// ============= Your Code Here =============
declare function PromiseAll<T extends unknown[]>(values: readonly [...T]): Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R: T[K]
}>

// 知识点
// 1. 获取Promise的返回类型 Promise<infer R>
// 2. [] as const 会转化为readonly元组类型，对应参数也要约束为readonly.但可以通过 readonly [...T] 得到原值
const readOnlyTuple = [1, 2, 3] as const // 注意这里为 as const 会将数组转化为 tuple
declare function TestValueT<T>(value: T): T
const readOnlyTupleRst = TestValueT(readOnlyTuple) // const readOnlyTupleRst: readonly [1, 2, 3]
declare function TestRestValueT<T extends unknown[]>(value: readonly [...T]): T
const readOnlyRestTupleRst = TestRestValueT(readOnlyTuple) // const readOnlyRestTupleRst: [1, 2, 3]
// 3. TS 的 { [K in keyof T]: T[K] } 能同时兼容元组、数组与对象类型

