// ============= Test Cases =============
import type { Equal, Expect, MergeObj } from './test-utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
]


// ============= Your Code Here =============
type RequiredByKeys<T, K extends PropertyKey = keyof T> = MergeObj<Required<Pick<T, K extends keyof T ? K : never>> & Omit<T, K>>

// @answer-end
// 知识点
namespace t2759 {
  // 1. 与上题 PartialByKeys 类似，取两个对象类型做 Merge 操作，合并思路
  // 首先是让 Required 的 key 转化为 必须
  type t1 = Required<Pick<User, 'name'>>
  // 从下面例子知道，其实 必选: 优先级是高于 可选 ?:
  type t2 = MergeObj<{ a: string } & { a?: string }>
  // 第二步是合并两个对象类型通过Merge重新合为一个，这个也不用再Pick/Omit特殊过滤了，因为必选不管在前后必然生效
  type t3 = MergeObj<User & t1>

  // 得到临时答案
  // type t4<T, K extends PropertyKey = keyof T> = Merge<Required<Pick<T, K>> & Omit<T, K>>
  // 上面答案报错，因为例子 2 有个 key 是字符串的 unknown，值也取不到，需要过滤
  // type t5 = t4<User, 'name' | 'unknown'>

  // 2. 从 Remove Index Signature
  // 如下写法可以删除key
  // {
  //   [xx as never]: any
  // }
  // 得到最后答案
}
