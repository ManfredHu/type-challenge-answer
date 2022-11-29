// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
]


// ============= Your Code Here =============
type Join<T, U extends string | number> = T extends [infer F extends string | number, ...infer Rest]
                  ? Rest['length'] extends 0
                    ? `${F}`
                    : `${F}${U}${Join<Rest, U>}`
                  : ''

// @answer-end
// 解析
namespace t5310 {
  // 1. 递归字符串增加，数组减少直到最后。需要注意最后 T 只有一个字符的时候，应该为 ‘Hello' 而不是 'Hello '
  // 此时 F 为 'Hello' 而 Rest为 [] 空数组
  type t1 = Join<['Hello', 'World'], ' '>
  type t2 = Join<['World'], ' '>
}
                                    
