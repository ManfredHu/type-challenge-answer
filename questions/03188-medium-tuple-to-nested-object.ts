// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

type error = [
  // @ts-expect-error
  TupleToNestedObject<number>
]
// ============= Your Code Here =============
type TupleToNestedObject<T extends any[], U, R = U> = T extends [] ? R: (
  T extends [...infer Rest, infer End extends PropertyKey]
    ? TupleToNestedObject<Rest, U, { [P in End]: R }>
    : never
)

// 知识点
namespace t3188 {
  // 1. 第一个参数是数组，按照 ['a', 'b', 'c'] 的顺序，应该按照如下构建顺序，也就是尾递归
  // { c: boolean } 
  // { b: { c: boolean } } 
  // { a: { b: { c: boolean } } }
  // 2. 理解 [infer End extends PropertyKey] 的作用，这里意味着 End 必须是 string/number/symbol 前面的 T extends [xxx] 才会生效
  type t1<T> = T extends [...infer Rest, infer End extends number] ? End: never
  type t2 = t1<[1, '2', true]> // never, End = true it's not number
  type t3 = t1<[1, 2, '3', 4]> // 4, End = 4 is number
  // 3. 构建动态key的对象
  // 下面这种写法会报错，A computed property name in a type literal must refer to an expression whose type is a literal type or a 'unique symbol' type.ts(1170)
  type t4<T> = T extends [...infer Rest, infer End extends number] ? {
    // @ts-expect-error
    [End]: string
  }: never 
  // 需要用另一种写法 [X in Y] 这样就不会报错
  type t5<T> = T extends [...infer Rest, infer End extends number] ? {
    [P in End]: string
  }: never 
  // 4. 递归终止条件
  type t6<T> = T extends [...infer Rest, infer End extends PropertyKey] ? Rest: false
  type t7 = t6<[1, 2]> // [1]
  type t8 = t6<[1]> // []
  type t9 = t6<[]> // false
  type t10 = t6<number> // false
  // 可以发现 T extends [...infer Rest, infer End extends PropertyKey] 这么写，T比如为长度大于 1 的数组才能走到 true 的逻辑，否则都是 false
  // 所以递归终止条件即 T = ['a'] 时，此时 Rest 为 空数组，End 为 'a'
  // 此时 继续执行 TupleToNestedObject<[], U, {a: xxx }>
  // 最后 T extends [] 退出递归返回 {a: xxx } 
}
