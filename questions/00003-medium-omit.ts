// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}


// type MyOmit<T, K extends keyof T> = {
//   [P in Exclude<keyof T, K>]: T[P]
// }
// ============= Your Code Here =============
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// 知识点
// 1. keyof
// 2. Exclude 可以用在key的位置
// 3. Pick/Omit都是返回的新的对象类型，Includes/Exclude都是返回的tuple类型
