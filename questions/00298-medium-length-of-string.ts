// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
  Expect<Equal<LengthOfStringNormalSort<'kumiko'>, ["k", "u", "m", "i", "k", "o"]>>
]


// ============= Your Code Here =============
type LengthOfString<S extends string, T extends any[] = []> = S extends `${infer F}${infer L}` ? LengthOfString<L, [...T, F]>: T['length']

// @answer-end
// 知识点
// 1. 形如下面的可以得到长度
type GetArrLen = ['a', 'b', 'c']['length']
// 2. S extends `${infer F}${infer L}` 会开始递递归，比如 S = kumiko 传入会出现 F = 'k', L = 'umiko'，此时将F拆出，剩下的就是 L，递归就好
// 3. 递归终止条件就是 F = 'o' 并且 L = ''，此时第二个参数 T = ['k', 'u', 'm', 'i', 'k']，此时将还没结束，最后再递归一次
// S = '', 再也拆不了了，T = ['k', 'u', 'm', 'i', 'k', 'o'] 返回，T['length'] 就是长度
// 4. type LengthOfString<S extends string, T extends any[] = []> = S extends `${infer F}${infer L}` ? LengthOfString<L, [F, ...T]>: T['length'] 这样的答案得到顺序是倒序的，优化下得到最后答案 
type LengthOfStringNormalSort<S extends string, T extends any[] = []> = S extends `${infer F}${infer L}` ? LengthOfStringNormalSort<L, [...T, F]>: T