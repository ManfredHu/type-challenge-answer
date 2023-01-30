// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>>,
  Expect<Equal<GetMiddleElement<[() => string, () => number]>, [() => string, () => number]>>,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>,
]
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>


// ============= Your Code Here =============
type GetMiddleElement<T extends unknown[]> = T extends [infer F, ...infer M, infer L]
                                        ? M extends []
                                          ? [F, L]
                                          : GetMiddleElement<M>
                                        : T


// @answer-end
namespace t9896 {
  // 思路：递归，每次去掉首位1个元素，最后剩下中间的，不管1个或者2个都直接返回即可

  type GetMiddleElementTemp<T extends unknown[]> = T extends [infer F, ...infer M, infer L]
                                        ? M 
                                        : T
  // t1-t3都是长度小于3的，直接返回T。取决于T的长度
  type t1 = GetMiddleElementTemp<[never]> // type t1 = [never]
  // 当中间部分 M 的长度为0时候，M 为 []
  type t2 = GetMiddleElementTemp<[never, 1]> // type t2 = []
  // 当中间部分 M 的长度为1时候，M 为 [1]
  type t3 = GetMiddleElementTemp<[never, 1, 2]> // type t3 = [1]
  // 当中间部分 M 的长度为2时候，M 为 [1, 2]
  type t4 = GetMiddleElementTemp<[never, 1, 2, false]> // type t4 = [1, 2]
}




