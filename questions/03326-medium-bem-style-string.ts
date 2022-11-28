// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]


// ============= Your Code Here =============
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${E extends [] ? '':  `__${E[number]}`}${M extends [] ? '': `--${M[number]}`}`

// @answer-end
// 知识点
namespace t3326 {
  // 1. 很明显这是笛卡尔乘积，根据 B * E * M 得到最后穷举出来的不同答案，问题是 array 要如何穷举出来，很容易想到 array[number]
  // 得到临时答案
  type t1<B extends string, E extends string[], M extends string[]> = `${B}__${E[number]}--${M[number]}`
  // 2. 但是发现如下答案为never不符合，原因是空数组的情况。对于其他两个case都是空数组的影响，此时根据空数组出现的不同位置需要携带不同的符号
  type t2 = t1<'btn', ['price'], []> // btn__price，拆分为'btn' '__price' 和 '' 三者的笛卡尔积
  type t3 = t1<'btn', [], ['small', 'medium', 'large']> // 'btn--small' | 'btn--medium' | 'btn--large'，拆分为 'btn' '' 和 'small' | 'medium' | 'large'的笛卡尔乘积
}