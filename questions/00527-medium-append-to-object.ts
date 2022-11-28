// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  isMotherRussia: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'isMotherRussia', false | undefined>, testExpect3>>,
]


// ============= Your Code Here =============
type AppendToObject<T, U extends string | number | symbol, V> = {
  [K in [U, keyof T][number]]: K extends keyof T ? T[K] : V
}

// @answer-end
// 知识点
// 1. 使用 [U, keyof T][number] 来获取新构建的数组 [U, keyof T] 的其中之一的元素
// 注意这里 [keyof T][number] 的用法，先是生成一个数组，所以可以用数组的索引number来获取其中的元素
// 比如case1会产生如下的数组 ['home', ['key', 'value']]，取number后就变成 'home' | 'key' | 'value'
// 2. [K in [U, keyof T][number]]: K extends U ? V : T[K] 这么写会产生 Error. Type 'K' cannot be used to index type 'T'.ts(2536)
// 因为 K extends U 其实是一个字符串判断，比如 K = 'home' | 'key' | 'value'，但是此时这么写会出现 T['home'] 的可能，所以要多一层判断，此时答案如下，但是不如上面的简洁
type AppendToObject2<T, U extends string | number | symbol, V> = {
  [K in [U, keyof T][number]]: K extends U 
    ? V
    : K extends keyof T 
      ? T[K]
      : never
}
