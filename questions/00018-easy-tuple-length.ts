// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]


// ============= Your Code Here =============
type Length<T extends readonly any[]> = T['length']

// @answer-end
// 知识点
// 1. T['length'] 可以获取一个数组/元组的长度
// 2. T['length'] 与 T[number] 的区别
// 2.1 一个是获取数组/元组长度，一个是遍历其值，length是数组的长度，而[number]是遍历其值的索引