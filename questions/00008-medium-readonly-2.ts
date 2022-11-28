// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}


// ============= Your Code Here =============
type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> & Omit<T, K>

// @answer-end
// 知识点
// 1. K在对象推导里默认值是keyof T会获得到T的所有key，即此时 K = keyof T = 'title' | 'description' | 'completed'，所以Pick<T, K> = T, Omit<T, K> = {}
type GetAllKeys<T> = keyof T
type case2 = [
  Expect<Alike<GetAllKeys<Todo1>, 'title' | 'description' | 'completed'>>
]

type MyTest<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> & {}
type cases3 = [
  Expect<Alike<MyTest<Todo1>, Readonly<Todo1>>>,
]