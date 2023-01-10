// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
]


// ============= Your Code Here =============
type FirstUniqueCharIndex<T extends string, Result extends 1[] = [], Last extends string = ''> = T extends `${infer F}${infer Rest}`
                                              ? Rest extends `${infer _}${F}${infer _}`
                                                ? FirstUniqueCharIndex<Rest, [...Result, 1], `${Last}${F}`>
                                                : Last extends `${infer _}${F}${infer _}`
                                                  ? FirstUniqueCharIndex<Rest, [...Result, 1], `${Last}${F}`> 
                                                  : Result['length']
                                              : -1

// @answer-end
namespace t9286 {
  // 思路，类似字符串字母去重，将字符串分割出第一个字母，如果后面的Rest字符串不包含首字母F，则首字母F为符合题意的位置
  // 举例如 leetcode，则 F = 'l', Rest = 'eetcode'
  // 当 eetcode = 字符串 + 'l' + 字符串时，说明Rest中包含了字母F，因此F是不符合题意的位置，继续往Rest后找

  // 特殊case, 举例如 'aabb' 执行过程
  type t1 = FirstUniqueCharIndex<'aabb'>
  // Result = [], Last = '', F = 'a' Rest = 'abb'
  // 因为 'abb' 包含字母 'a' 直接进入递归，FirstUniqueCharIndex<‘abb', [1], 'a'>
  // Result = [1], Last = 'a', F = 'a' Rest = 'bb'
  // Rest = 'bb' 不包含字母 'a'， 但是因为 F = 'a' 相当于 前置记录的Last包含了，应该继续下一次递归 FirstUniqueCharIndex<'bb', [1, 1], 'aa'>
  // Result = [1, 1], Last = 'aa', F = 'b' Rest = 'b'
  // 知道最后 -1
}
