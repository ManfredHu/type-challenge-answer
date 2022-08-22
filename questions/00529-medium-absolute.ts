// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]


// ============= Your Code Here =============
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer N}` ? `${N}` : `${T}`

// 知识点
// 1. 字符串模板，将number转化为string，其实本质是基于字符串认定的
// 2. 对于 Absolute<-1_000_000n> 这种，-1_000_000n是bigint类型的
// 可以控制台输入 -1_000_000n.toString() 测试
// 输出 -1000000