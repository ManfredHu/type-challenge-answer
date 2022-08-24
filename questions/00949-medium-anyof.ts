// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<
    Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[0, "", false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];

// ============= Your Code Here =============
type Falsy = '' | never | undefined | null | 0 | false | [] | Record<PropertyKey, never>
type AnyOf<T extends readonly any[]> = T extends Falsy[] ? false: true
                                      
// 知识点
// 1. 题意是AnyOf有一个为真就返回true，如果都是假就是false。如何判真？TS不是js，没有!!或者if等操作符，所以自己写个 Flasy
// 2. {} [] 如何判断，都可以用 extends， 但是注意判断空对象要用 Record<string | number | symbol, never> 而不是 {}
// {} 并不表示空对象，而是表示所有对象类型
// Record<PropertyKey, never> 才是判断空对象的条件
namespace AnyOfTest {
  type EmptyArr = [] extends [] ? true : false
  type EmptyArr2 = {} extends [] ? true : false
  type EmptyObj = {} extends {} ? true : false
  type EmptyObj2 = {} extends Record<string | number | symbol, never> ? true : false
  type EmptyObj3 = { name: "test" } extends {} ? true: false // 注意这里 非空对象 extends {} 为true，所以 {} 的判定要用 Record<string | number | symbol, never>
  type EmptyObj4 = { name: "test" } extends Record<string, never> ? true: false
}
// 3. 用infer 递归可以挨个判断类型，但是不够精简
// 4. 利用 T 为数组类型判定得到 Falsy[] 的范型组成，perfect!

