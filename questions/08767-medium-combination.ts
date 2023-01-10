// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>,
  'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]


// ============= Your Code Here =============
type Combination<T extends string[], U = T[number], A = U> = U extends infer U extends string
                                                            ? `${U} ${Combination<T, Exclude<A, U>>}` | U
                                                            : never


// @answer-end

namespace t8767 {
  // 1. 思路
  // 从 ./04260-medium-union-to-intersection.ts 中拷贝过来的
  type t1 = {
    'A': `A${'' | 'B' | 'C'}`,
    'B': `B${'' | 'A' | 'C'}`,
    'C': `C${'' | 'B' | 'A'}`,
  }['A' | 'B' | 'C']

  type t2 = {
    'foo': `foo${'' | ' bar' | ' baz' | ' bar baz' | ' baz bar'}`,
    'bar': `bar${'' | ' foo' | ' baz' | ' foo baz' | ' baz foo'}`,
    'baz': `baz${'' | ' bar' | ' foo' | ' bar foo' | ' foo bar'}`,
  }['foo' | 'bar' | 'baz']
  // 也就是自身与数组其他项的笛卡尔积

  // type t21 = GetUnionCombination<>
  type t21 = ['foo', 'bar', 'baz'][number]
  type t22 = Exclude<t21, 'foo'>
  // type GetUnionCombination<T> = T extends string ? T: 


  // 2. 答案解析
  type t3 = Combination<['A', 'B']> // type t3 = "B" | "A" | "B A" | "A B"
  // U是联合类型，U extends xxx 会触发分配律，所以 U extends infer U extends string 会被分解为 U = 'A' 和 U = 'B' 依次执行，如下
  type t4 = `A ${Combination<['A', 'B'], Exclude<'A' | 'B', 'A'>>}` | 'A' | `B ${Combination<['A', 'B'], Exclude<'A' | 'B', 'B'>>}` | 'B'
  type t5 = `A ${Combination<['A', 'B'], 'B'>}`
            | 'A' 
            | `B ${Combination<['A', 'B'], 'A'>}`
            | 'B'

  type t6 = `A ${`B ${Combination<['A', 'B'], never>}` | 'B'}`
            | 'A'
            | `B ${`A ${Combination<['A', 'B'], never>}` | 'A'}`
            | 'B'
  type t7 = `A ${`B ${never}` | 'B'}`
            | 'A'
            | `B ${`A ${never}` | 'A'}`
            | 'B'
  type t8 = `A ${`B ${never}` | 'B'}`
            | 'A'
            | `B ${`A ${never}` | 'A'}`
            | 'B'
  // `B ${never}` 结果为never
  type t9 = `A ${never | 'B'}`
            | 'A'
            | `B ${never | 'A'}`
            | 'B'
  // never | 'B' 结果为 'B'，never直接被pass
  // 联合类型 Union Type是无序的
  type t10 = `A B`
            | 'A'
            | `B A`
            | 'B'
}