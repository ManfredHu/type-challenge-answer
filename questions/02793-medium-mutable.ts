// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]


// ============= Your Code Here =============
type Mutable<T extends object> = {
  - readonly [K in keyof T]: T[K]
}

// @answer-end
// 知识点
namespace t2793 {
  // 1. Readonly会把所有key都变成readonly
  type t1 = Readonly<Todo1>
  // 2. Mutable相当于去除readonly，很容易想到 - 操作符
  // 如可选 ?: 前面机上 -构成非可选，就是必选
  type t2<T> = {
    [K in keyof T]-?: T[K]
  }
  // t3都是可选的key
  type t3 = Partial<Todo1>
  // 又变为必选了
  type t4 = t2<t3>
  // 3. 会发现 errors 没过，因为不能传普通类型，boolean/string/number/symbol 之类的
  // 这里用到了 object 而不是 Record<K,T>
  // 4. object vs Record<K, T>的区别如下
  // object意味着任何key的object，甚至没有key的空对象{}
  type t5 = {} extends object ? 1: 2
  // 而Record<K, T> 第一个参数K必须是keyof any即 string/number/symbol 三个中的其中一个，下面的会报错
  // @ts-expect-error
  type t6 = {} extends Record<object, any> ? 1: 2
  // 5. Object vs object
  // Object是一个命名空间，指代JS的Object原型对象，而object就是任意key的对象
}

