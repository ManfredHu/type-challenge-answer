// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]


// ============= Your Code Here =============
type GetPrimitiveValueType<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : never
type ToPrimitive<T> = {
  [K in keyof T]: T[K] extends Record<string, any> ? ToPrimitive<T[K]>: GetPrimitiveValueType<T[K]>
}

// @answer-end
namespace t16259 {
  // 思路：
  // 第一步遍历对象的每个属性，判断属性值的类型。Primitive包含string/number/boolean三种类型
  // 第二步是递归处理复杂类型的对象和数组，这里主要理解数组其实可以 extends Record<string>, any>
  type t1 = ToPrimitive<{
    name: 'Tom'
    age: 30
    married: false
  }>
  // type t1 = {
  //   name: string;
  //   age: number;
  //   married: boolean;
  // }

  type t2 = {
    home: '123456'
    phone: '13111111111'
  } extends Record<number, any> ? true : false // true, 这很正常
  type t3 = ['sing', 'dance'] extends Record<string, any> ? true : false // true，可以转化为 { '0': 'sing', '1': 'dance' }，这也很正常
  type t4 = ['sing', 'dance'] extends Record<string, unknown> ? true: false // false，只有对象如 {} {a: 1} 才能 extends Record<string, unknown>，数组不行
  type t41 = {} extends Record<string, unknown> ? true: false // true
  type t42 = {a: 1} extends Record<string, unknown> ? true: false // true

  type t5 = ['sing', 'dance'] extends Record<number, unknown> ? true: false // true
  type t6 = ['sing', 'dance'] extends Record<number, any> ? true: false // true
  type t7 = { 0: 'sing', 1: 'dance' } extends Record<number, any> ? true: false // true
  type t8 = { 0: 'sing', 1: 'dance' } extends Record<number, unknown> ? true: false // true
  type t9 = { 0: 'sing', 1: 'dance' } extends Record<string, any> ? true: false // true
  type t10 = { 0: 'sing', 1: 'dance' } extends Record<string, unknown> ? true: false // true

  // 很神奇的是因为 [key: string] 的写法，索引其实加了 string 和 number 两种，如下所示 1 和 '1' 都可以访问到对应类型。
  // 以下 NumbersNames 类型 与 lib.es5.d.ts 中的 interface Array<T> 类型是一样的，只是这里的 T 是 string
  // 故 以上 t5-t10 都是 true
  interface NumbersNames {
    [key: string]: string
  }
  const names: NumbersNames = {
    '1': 'one' as const,
    '2': 'two',
    '3': 'three',
  };
  const value1 = names['1'];
  const value2 = names[1];
}

