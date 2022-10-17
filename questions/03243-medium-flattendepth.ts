// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


// ============= Your Code Here =============
type FlattenOnce<T extends unknown[], U extends unknown[] = []> = T extends [infer F, ...infer Rest]
                                                                ? F extends unknown[]
                                                                  ? FlattenOnce<Rest, [...U, ...F]>
                                                                  : FlattenOnce<Rest, [...U, F]>
                                                                : U

type FlattenDepth<T extends unknown[], L extends number = 1, K extends unknown[] = []> = 
  K['length'] extends L 
    ? T
    : FlattenOnce<T> extends T 
      ? T
      : FlattenDepth<FlattenOnce<T>, L, [...K, unknown]>

// 知识点
namespace t3243 {
  // 1. 发现方法有重载，如果第二个参数不传就是打平一层，如果传了就是按照传入参数打平
  type t1 = FlattenOnce<[1, [2]]>
  // 2. 根据经验TS无法做 +1/-1 的操作，都是利用数组长度来实现的，增加参数 K 为空数组，每次 push 任意元素使其长度 +1，当 K['length'] 等于 L 时候，即为条件终止时
  // 得到如下答案
  // type FlattenDepth<T extends unknown[], L extends number = 1, K extends unknown[] = []> = K['length'] extends L ? T: (
  //   FlattenDepth<FlattenOnce<T>, L, [...K, unknown]>
  // )
  // 3. case出现特殊情况 FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817> // Type instantiation is excessively deep and possibly infinite.ts(2589)
  // 即当打平次数很大时候，此时数组早就被打平了，要终止递归
  // 那么如何判断数组已经被打到最平了，再也无法继续打平了？其实只要数组每一项都不为数组，即可以判断此时不需要再继续递归打平
  // 另一个方向，即执行 FlattenOnce 前后相等，那么也可以作为已经打平了的标识，得到最后答案
  type t2 = Expect<Equal<FlattenOnce<[1, 2]>, [1, 2]>>
  // 4. 引申出来，TS 如何判断两个数组相等
}
