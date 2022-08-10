// ============= Test Cases =============
import type { Equal, Expect, NotAny } from './test-utils'

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>,
]


// ignore generated code below this line
type HelloWorld = string
