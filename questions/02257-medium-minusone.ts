// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>
];

// ============= Your Code Here =============
// 0-9 nums to arr<''>
type NumDict = {
  '0': [],
  '1': [''],
  '2': ['', ''],
  '3': ['', '', ''],
  '4': ['', '','', ''],
  '5': ['', '','', '', ''],
  '6': ['', '','', '', '', ''],
  '7': ['', '','', '', '', '', ''],
  '8': ['', '','', '', '', '', '', ''],
  '9': ['', '','', '', '', '', '', '', '']
}

// 乘以10倍
type MultiplyTenTimes<T extends string[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]

// 转化字符串数字 T 为对应长度的数组
// 13 -> ['', '', '', '', '', '', '', '', '', '', '', '', '']
export type NumStrToArray<T extends string, Rst extends string[] = []> = T extends `${infer F}${infer Rest}`
                                                                    ? F extends keyof NumDict
                                                                      ? NumStrToArray<Rest, [...MultiplyTenTimes<Rst>, ...NumDict[F]]>
                                                                      : NumStrToArray<Rest, [...Rst]>
                                                                    : Rst

type MinusOne<T extends number> = NumStrToArray<`${T}`> extends ['', ...infer Rest] ? Rest['length']: never

// @answer-end
// 知识点
namespace t2257 {
  // 1. TS没有数值计算，所以 === 这种不用想了，唯一可能是通过 xxx['length'] 获取
  type t1 = 1 extends 2 ? true : false; // false
  type t2<arr extends any[]> = [...arr, ""]['length']
  type t3 = t2<['1', '2']> // 3

  // 2. 这里题目都是正整数，如果递归增的逻辑，即从 0 开始，将数组增加上去，得到如下答案
  type MinusOneFirst<T extends number, arr extends any[] = []> = [...arr, '']['length'] extends T
                                                          ? arr['length']
                                                          : MinusOneFirst<T, [...arr, '']>
  // 解释: 如传入 T=3, 默认arr = []，则判断为['']['length'] 取值为1，不等于 T=3，进入递归流程
  // arr=['']，重复流程['','']['length'] 取值为2，不等于 T=3，继续递归
  // arr=['', ''], 重复流程['','','']['length'] 取值为3，等于 T=3，返回 arr['length'] 为2
  // 总结：求MinusOne<N>，则从0开始递增递归N-1次
  // 但是会发现如下的例子报错，递归太多次了 Type instantiation is excessively deep and possibly infinite.ts(2589)
  // type t4 = MinusOneFirst<100> // t4: any
  // type t5 = MinusOneFirst<1101> // t5: any

  // 3. 进化一下，according: https://github.com/type-challenges/type-challenges/issues/16376
  // 思路: 103 => 100 * 1 + 0 * 10 + 3 * 1，也就是每多一位数字将前一位数字的值放大10倍，因为都是10进制
  // 3.1 如何判断0-9的数字，并将其转化为数组?
  type NumDict = {
    '0': [],
    '1': [''],
    '2': ['', ''],
    '3': ['', '', ''],
    '4': ['', '','', ''],
    '5': ['', '','', '', ''],
    '6': ['', '','', '', '', ''],
    '7': ['', '','', '', '', '', ''],
    '8': ['', '','', '', '', '', '', ''],
    '9': ['', '','', '', '', '', '', '', '']
  }
  type t6 = NumDict['9']['length'] // 9

  // 3.2 乘以10倍
  type MultiplyTenTimes<T extends string[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]
  type t7 = MultiplyTenTimes<['']>['length'] // 10

  // 再拼接出99
  type temp = [...MultiplyTenTimes<NumDict['9']>, ...NumDict['9']]
  type t8 = temp['length'] // 99
  // 再拼接出999 = 99 * 10 + 9
  type t9 = [...MultiplyTenTimes<temp>, ...NumDict['9']]['length'] // 999

  // 3.3 map匹配
  type t10 = keyof NumDict
  type t11 = '1' extends t10 ? 11: 22 // 11
  type t12 = 'a' extends t10 ? 11: 22 // 22

  // 3.4 再将 string 转化为 number
  type NumStrToArray<T extends string, Rst extends string[] = []> = T extends `${infer F}${infer Rest}`
                                                                    ? F extends keyof NumDict
                                                                      ? NumStrToArray<Rest, [...MultiplyTenTimes<Rst>, ...NumDict[F]]>
                                                                      : NumStrToArray<Rest, [...Rst]>
                                                                    : Rst
  type t13 = NumStrToArray<'13'>['length'] // 13

  // 注意递归终止情况，为了兼容如下非数字输入，当 F 不为 0-9的数字时候需要终止
  type t14 = NumStrToArray<'11a'>['length'] // 11

  // 3.5 number -> string -> array length ， 同时将数组长度减 1
  type MinusOne<T extends number> = NumStrToArray<`${T}`> extends ['', ...infer Rest] ? Rest['length']: never
  type t15 = MinusOne<15> // 14

  // 其实如下的数字传入是不行的，但是这里例子没有所以暂时符合答案
  type t16 = MinusOne<0> // never
  type t17 = MinusOne<-1> // 0

}
