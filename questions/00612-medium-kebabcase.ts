// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
  // @ts-expect-error
  KebabCase<123>
]


// ============= Your Code Here =============
type KebabCase<S extends string> = S extends `${infer F}${infer R}`
                                    ? R extends Uncapitalize<R>
                                      ? `${Lowercase<F>}${KebabCase<R>}`// R 首字母小写
                                      : `${Lowercase<F>}-${KebabCase<R>}` // R 首字母大写
                                    : S // 空字符串

// 知识点
// 1. S extends `${infer F}${infer R}` 会不断匹配，如 'FooBarBaz' 会一次拆为 'F' + 'ooBarBaz' / 'Fo' + 'oBarBaz' / 'Foo' + 'BarBaz' 等等
// 2. 切入点是大写字符[A-Z]作为分割点，那么如何找到大写[A-Z]呢？答案是用 R extends Uncapitalize<R> 判断剩余的R是否全是小写
type b = 'abc' extends Uncapitalize<'abc'> ? true: false
type c = 'Abc' extends Uncapitalize<'Abc'> ? true: false
// 3. 举例如 'FooBarBaz'， 'FooBarBaz' 会一次拆为 'F' + 'ooBarBaz' / 'Fo' + 'oBarBaz' / 'Foo' + 'BarBaz' 等等
// 第一次 'F' + 'ooBarBaz'，R 首字母非大写，故命中 `${Lowercase<F>}${KebabCase<R>}`，结果是 'f' + KebabCase<'ooBarBaz'> 
// 继续递归 KebabCase 到 'foo' + KebabCase<'BarBaz'>， 此时为首字母大写，命中逻辑 `${Lowercase<F>}-${KebabCase<R>}`，结果是 'foo-' + KebabCase<'BarBaz'>
// 继续递归 'foo-b' + KebabCase<'arBaz'> ，重复上面过程直到结束