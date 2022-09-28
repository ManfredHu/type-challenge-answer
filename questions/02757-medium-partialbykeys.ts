// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
]


// ============= Your Code Here =============
// 用于再一次合并
type Merge<T> = {
  [K in keyof T]: T[K]
}
type PartialByKeys<T, K extends PropertyKey = keyof T> = Merge<Partial<T> & Omit<T, K>>

// 知识点
namespace t2757 {
  // 首先这道题跟 Partial 类似，最后一个例子其实不传入参数就是 Partial

  // 1. 如下一行的写法 K 会报错 Type 'K' is not assignable to type 'symbol'.ts(2344)
  // type t1<T, K = keyof T> = Omit<T, K> // K error
  type t2<T, K extends PropertyKey = keyof T> = Omit<T, K> // ok

  // 2. 合并思路
  type t3 = Partial<User> // 全部Key变为可选
  type t4 = Omit<User, 'name' | 'unknown'> // 必选的迹象
  // 顺序上，因为相同key的后面会覆盖了前面，所以最后是两个，通过Merge遍历所有key合并为一个
}