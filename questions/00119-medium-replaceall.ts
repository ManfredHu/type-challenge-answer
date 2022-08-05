// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]


// ============= Your Code Here =============
type ReplaceAll<S extends string, From extends string, To extends string> = 
  S extends '' 
  ? S
  : S extends `${infer F}${From}${infer L}`
    ? From extends ''
      ? S
      : `${F}${To}${ReplaceAll<L, From, To>}`
    : S

// =================================================================
// 知识点
// 1. 空字符串直接返回
// 2. 其他字符串切割为三段，比如 foobarfoo, 替换From=bar 为 To=foo，则 ${infer F}${From}${infer L} 输入会切割为 F=foo From=bar L=foo
// 此时 From 不为空，继续替换 From=bar 后 字符串为 foofoo${L=foo} 后递归调用RepalceAll，最终返回 foofoofoo
// 3. 递归终止条件，此时 S 为前面的L=foo，From 为空，则直接返回 S
