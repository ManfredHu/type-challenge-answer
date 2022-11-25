// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]


// ============= Your Code Here =============
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  I extends 1[] = [],
  Flag extends boolean = Start extends I['length'] ? true: false,
> = I['length'] extends End
  ? T
  : T extends [infer F, ...infer Rest] 
    ? Flag extends true
      ? [N, ...Fill<Rest, N, Start, End, [...I, 1], true>]
      : [F, ...Fill<Rest, N, Start, End, [...I, 1]>]
    : T

// 知识点
namespace t4518 {
  // 1. 递归处理，每次处理一个元素，如果刚好等于start 则Flag为true，再等于end时候Flag为false，Flag为true的时候讲 N 填充到数组里而不是 T[x] 的值
  type t1 = Fill<[1, 2, 3], true, 1, 3>
  type t2 = [1, ...Fill<[2,3], true, 1, 3, [1]>]
  type t3 = [1, ...[true, ...Fill<[3], true, 1, 3, [1, 1], true>]]
  type t4 = [1, ...[true, ...[true, ...Fill<[], true, 1, 3, [1, 1, 1], true>]]]
  type t5 = [1, ...[true, ...[true, ...[]]]]
  // 得到最后答案
}

  
