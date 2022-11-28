// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { Space } from './00106-medium-trimleft'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>,
]


// ============= Your Code Here =============
type TrimRight<S extends string> = S extends `${infer F}${Space}` ? TrimRight<F>: S

// 
namespace t4803 {
  // 1. it looks like F can be infer to 'kvm' which is start string
  type t1<S extends string> = S extends `${infer F}${Space}` ? F: never
  type t2 = t1<'kvm '>
}