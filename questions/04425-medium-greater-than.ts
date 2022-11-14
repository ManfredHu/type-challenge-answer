// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { NumStrToArray } from './02257-medium-minusone'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
]


// ============= Your Code Here =============
type ArrGreaterThan<T extends 1[], U extends 1[]> = U extends [...T, ...any] ? false: true
type GreaterThan<T extends number, U extends number> = ArrGreaterThan<NumStrToArray<`${T}`>, NumStrToArray<`${U}`>>

// 知识点
namespace t4425 {
  // 1. TS没有+1/-1能力，使用数组length属性代替，问题转化为比较 数组length属性，此时需要找一个中间值作为数组
  // 2. 中间值数组初始为0，之后每次递归递增，当增加到等于 T or U 时候即为最小值，此时就知道大小了。因为 R是递增的，所以会先到最小的值，因为 GreaterThan<T,U> 必须满足 T > U
  // 所以如果是 GreaterThan 则R递增会先触碰到上限 U extends R['length']，如果先触碰到 T extends R['length'] 则不是大于
  // 举个🌰，GreaterThan<1, 0> 初始时 R=[]，满足 U extends R['length'] 即 0 extends 0，所以返回true

  // 得到如下答案
  type GreaterThanSimple<T extends number, U extends number, R extends 1[] = []> = T extends R['length']
                                                                          ? false
                                                                          : U extends R['length']
                                                                            ? true
                                                                            : GreaterThanSimple<T, U, [1, ...R]>
  // 虽然可以通过cases但是如下答案会报递归过多
  // @ts-ignore
  type t1 = GreaterThanSimple<10001, 10000>
  // 3. 更优的解答
  // 考虑到其实 当 T数组比U数组长度大的时候，就是说U多几项就可以达到 T的数组长度了
  type t2 = ArrGreaterThan<[1, 1, 1, 1, 1], [1, 1, 1, 1]>
}