// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

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
type GreaterThan<T extends number, U extends number, R extends 1[] = []> = T extends R['length']
                                                                          ? false
                                                                          : U extends R['length']
                                                                            ? true
                                                                            : GreaterThan<T, U, [1, ...R]>

// 知识点
namespace t4425 {
  // 1. TS没有+1/-1能力，使用数组length属性代替，问题转化为比较 数组length属性，此时需要找一个中间值作为数组
  // 2. 中间值数组初始为0，之后每次递归递增，当增加到等于 T or U 时候即为最小值，此时就知道大小了。因为 R是递增的，所以会先到最小的值，因为 GreaterThan<T,U> 必须满足 T > U
  // 所以如果是 GreaterThan 则R递增会先触碰到上限 U extends R['length']，如果先触碰到 T extends R['length'] 则不是大于
  // 举个🌰，GreaterThan<1, 0> 初始时 R=[]，满足 U extends R['length'] 即 0 extends 0，所以返回true
}