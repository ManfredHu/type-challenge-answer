// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============
type Fibonacci<T extends number, N extends 1[] = [1], Sub1 extends 1[] = [], Sub2 extends 1[] = [1]> = 
  T extends N['length'] 
  ? [...Sub1, ...Sub2]['length']
  : Fibonacci<T, [...N, 1], [...Sub1, ...Sub2], Sub1>

// @answer-end
// 知识点
namespace t4182 {
  // 1. 斐波那契数列基准条件
  // f(0) => 0
  // f(1) => 1
  // f(2) => 1
  // f(3) => 2
  // f(4) => 3
  // f(5) => 5
  // f(6) => 8
  // f(7) => 13
  // f(8) => 21
  // f(n) => f(n-1) + fn(n-2)  n>=2
  // 2. TS没有直接 +1/-1 能力，需要借助数组length实现，得到如下答案但是只能确定递归几次不能得到值
  type t1<T extends number, N extends 1[] = [1]> = T extends N['length'] ? N: Fibonacci<T, [...N, 1]>
  type t2 = t1<3>
  // 3. 加入两个变量 Sub1 = f(n-1) 和 Sub2 = f(n-2) 得到最后的答案
  // 当进入下一次递归时候，Sub1=f(n-1) 要变为 Sub2=f(n-2)，所以位置互换，而下一个循环的Sub1就是前两个数字相加
}
