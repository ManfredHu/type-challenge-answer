// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]


// ============= Your Code Here =============
// 这里用 [] 包裹去除 union type 的 distrubution
type ObjectEntries<T> = {
  [K in keyof T]-?: [K, T[K] extends undefined ? T[K]: Exclude<T[K], undefined>]
}[keyof T]

// @answer-end
// 知识点
namespace t2946 {
  // 1. 对象如何转 union type?

  // 数组 -> union type
  type t1 = [1, '2', true][number]

  // 对象 -> union type
  type ObjectToUnion<T> = T[keyof T]
  type t2 = ObjectToUnion<Model>
  // type t2 = string | number | string[] | null
  // 与答案很接近了，再将 key 也一起返回就可以了

  // 2. 通不过的特殊case 
  // 原因是 key 是可选的，所以有可能是 undefined，如下
  type t3 = ObjectEntries<{ key?: undefined }>
  // type t3 = ["key", undefined] | undefined
  // 所以要去掉这里 key 有可能存在的 undefined，将 key 改为必选，很容易想到 key -?: value 这种写法

  // 原因是 Partial 将 key 变为可选的，同时也导致了value 为 undefined 的可能，即使上面使用了 key -?: value 将 key 变为必选，但是value没变化，需要将value里的undefined去掉
  type t4 = Partial<Model>
  type t5 = ObjectEntries<Partial<Model>>
  // type t5 = ["name", string | undefined] | ["age", number | undefined] | ["locations", string[] | null | undefined] | undefined
  type t6 = undefined extends undefined ? 1: 2
  type t7 = [undefined] extends [undefined] ? 1: 2

  // 直接用 Exclude 去除 union type 的 undefined
  type t8 = Exclude<number | string | undefined | null, undefined>
}

