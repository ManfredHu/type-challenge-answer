// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<DeepReadonly<X>, Expected>>,
]

type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type Expected = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}


// ============= Your Code Here =============
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P]: DeepReadonly<T[P]>
}

// 知识点
// 1. Function extends Object, 这与JS里(() => {}) instanceof Object一样，但是
type TestObject<T> = T extends Object ? true: false
type case2 = [
  Expect<Equal<TestObject<() => {}>, true>>,
]
// 2. extends never
type TestNever<T> = T extends never ? true: false
type TestKeyofNever<T> = keyof T extends never ? true: false
type case3 = [
  Expect<Equal<TestNever<123>, false>>, // 123 extends never，是false
  Expect<Equal<TestNever<()=>{}>, false>>, // () => {} extends never，是false
  Expect<Equal<TestKeyofNever<()=>{}>, true>>, // keyof () => {} extends never，是true。可以理解为function没有key
]
// 2.1 keyof () => {} is never
type TestFunKeyof<T> = keyof T
type TestFunKeyofTest = TestFunKeyof<() => {}> 



