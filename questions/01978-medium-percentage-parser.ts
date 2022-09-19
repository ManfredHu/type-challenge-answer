// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]


// ============= Your Code Here =============
type GetFirstOperation<A extends string> = A extends `${infer Opt}${infer _}` 
  ? Opt extends '+' | '-'
    ? Opt
    : ''
  : ''
type GetPercentSuffix<T extends string> = T extends `${infer _}%` ? '%': ''
type GetPercentNum<T extends string> = T extends `${GetFirstOperation<T>}${infer Num}${GetPercentSuffix<T>}` ? Num: ''
type PercentageParser<T extends string> = [GetFirstOperation<T>, GetPercentNum<T>, GetPercentSuffix<T>]

// 知识点
namespace t1978 {
  // 1. 首先TS类型没有正则，只能递归字符串，但是注意看特征，最长结构是 -100%这样的三段式，而且没有 +01% 这样的异常case，所以用特征即可 <opperation><number>%
  // 所以可以挨个分出来，首先是操作符 + - 这种。infer _ 用于没用上的废弃变量
  type GetFirstOperation<A extends string> = A extends `${infer Opt}${infer _}`
                            ? Opt extends '+' | '-'
                              ? Opt
                              : ''
                            : ''
  type t11 = GetFirstOperation<'+'> // t11: +
  type t12 = GetFirstOperation<'+10%'> // t12: +
  type t13 = GetFirstOperation<'-10'> // t13: -
  type t14 = GetFirstOperation<''> // t14: ''

  // 2. 其次是获取最后的 % 符号，没有则返回空字符串
  type GetPercentSuffix<T extends string> = T extends `${infer _}%` ? '%': ''
  type t21 = GetPercentSuffix<''> // t21: ''
  type t22 = GetPercentSuffix<'%'> // t22: %
  type t23 = GetPercentSuffix<'10%'> // t23: %

  // 3. 数字部分
  type GetPercentNum<T extends string> = T extends `${GetFirstOperation<T>}${infer Num}${GetPercentSuffix<T>}` ? Num: ''
  type t31 = GetPercentNum<'+10%'> // t31: 10
  type t32 = GetPercentNum<'+%'> // t32: ''

  // 4. 思考
  // 按照如上思路，其实可以很容易实现各种字符串的特征提取，也不需要递归啥的。本质还是要有TS的思想
}