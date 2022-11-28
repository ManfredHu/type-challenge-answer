// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
  // @ts-expect-error
  Flatten<123>
]

// ============= Your Code Here =============
type Flatten<T extends unknown[], Result extends unknown[] = []> = T extends [infer F, ...infer R]
  ? F extends unknown[]
    ? Flatten<R, [...Result, ...Flatten<F>]>
    : Flatten<R, [...Result, F]>
  : Result

// @answer-end
// 知识点
// 1. X extends [infer F, ...R] 的用法，对于空数组和非空数组是不同的
type TestInfer<N extends unknown[]> = N extends [infer F, ...infer R] ? true : false
type TestInfer2<N extends unknown[]> = N extends [infer F, ...infer R] ? F : false
type case2 = [
  Expect<Equal<TestInfer<[]>, false>>, // 注意这里是false，因为没用到F和R，TS认为检测是是数组
  Expect<Equal<TestInfer2<[1]>, 1>>, // 用到F，TS认为是非空数组返回第一个
  Expect<Equal<TestInfer2<[]>, false>>, // 用到F但是传入空数组，TS认为是空数组返回false
]
// 2. Flatten总是返回数组，对于嵌套类型需要用临时变量存储，就是第二个参数 Result extends unknown[] = []，默认为[]与array.prototype.reduce方法类似