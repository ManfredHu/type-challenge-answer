// ============= Test Cases =============
import type { Equal, Expect, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi'; true: 'bool' }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<Equal<{ val2: 'prop2'; val: 'prop' }, Flip<{ prop: 'val'; prop2: 'val2' }>>>,
]


// ============= Your Code Here =============
type Flip<T extends Record<PropertyKey, string | number | boolean>> = {
  [K in keyof T as `${T[K]}`]: K
}

// 知识点
namespace t4179 {
  // 1. 根据 K in keyof T as T[K] 很容易将 key 和 value 交换位置 
  type t1 = Flip<{ pi: 'a' }>
  // 2. 特殊case，主要是这里的 key 居然变成 true了，类型是 boolean，PropertyKey 只能满足 string/number/symbol 的情况
  type t2 = Flip<{ pi: 3.14; bool: true }>
  // 需要做一步转化，这里首先想到了 PropertyKey，但是 value 千万不能用 PropertyKey，因为 symbol 是无法转化为 string 的
  type t3<T extends Record<string, string | number | boolean>> = {
    [K in keyof T as `${T[K]}`]: K
  }
  type t4 = t3<{ pi: 3.14; bool: true }>
}
