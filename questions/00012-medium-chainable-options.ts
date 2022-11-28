// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}


// ============= Your Code Here ============= 
type Chainable<T = {}> = {
  option: <K extends string, V>(key: K extends keyof T ? never: K, value: V) => Chainable<T & Record<K, V>>
  get: () => T
}

// @answer-end
// 知识点
// 1. 可以使用 T = {} 来作为默认值，甚至默认参数与默认返回值，再通过递归传递 T 即可实现递归全局记录
// 2. option是一个函数接收两个值，K 和 V. 为了约束key不可重复必须范型传入，Value是任意类型范型不做约束直接透传
// 3. 因为key不可重复，很自然 K extends keyof T ? never: K 实现传入相同key报错
