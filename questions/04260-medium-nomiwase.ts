// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]


// ============= Your Code Here =============
type StrToUnion<S> = S extends `${infer F}${infer L}` ? F | StrToUnion<L>: never
type AllCombinations<S extends string, U extends string = StrToUnion<S>> = [U] extends [never] ? '' : {
  [K in U]: `${K}${AllCombinations<never, Exclude<U, K>>}`
}[U] | ''

// 知识点
namespace t4260 {
  // 1. String to union coversion
  type t1 = StrToUnion<'ABC'> // type t1 = "A" | "B" | "C"

  // 2. 以 UnionType 作为遍历起点
  type t2<T extends string | number | symbol> = {
    [U in T]: U
  }
  type t3 = t2<t1> // 得到 type t3 = {A: "A";B: "B";C: "C";}

  // 3. Object.value to Union 对象转联合类型
  interface Model {
    name: string
    age: number
    locations: string[] | null
  }
  type ObjectToUnion<T> = T[keyof T]
  type t4 = ObjectToUnion<Model> // type t4 = string | number | string[] | null

  // 4. 过程举例，以 'AB' 为启始，则 StrToUnion<'AB'> 得到 'A' | 'B'
  type t5 = StrToUnion<'AB'>

  // 再按照 Union Type 分配率去算则可能获得 'AA' | 'AB' | 'BA' | 'BB'
  type t6<S extends string, U extends string = StrToUnion<S>> = [S] extends [never] ? U : {
    [K in U]: `${K}${t6<never, U>}`
  }[U]
  type t7 = t6<'AB'> // 得到 type t7 = "AB" | "BA" | "AA" | "BB"

  // 其实与下面运行过程一样
  type t8 = {
    'A': `A${'A' | 'B'}`, // union type的分配律，与下面一致
    'B': `BA` | 'BB'
  }['A' | 'B']
  
  // 5. AllCombinations<'ABC'>, type t9 = "AB" | "BA" | "BC" | "CB" | "AC" | "CA"
  type t9 = {
    'A': `A${'B' | 'C'}`,
    'B': `B${'A' | 'C'}`,
    'C': `C${'B' | 'A'}`,
  }['A' | 'B' | 'C']

  // 递归加入开头的 '' 字符串后, type t10 = "A" | "AB" | "B" | "BA" | "BC" | "C" | "CB" | "AC" | "CA"
  type t10 = {
    'A': `A${'' | 'B' | 'C'}`,
    'B': `B${'' | 'A' | 'C'}`,
    'C': `C${'' | 'B' | 'A'}`,
  }['A' | 'B' | 'C']

  type AllCombinationsTemp<S extends string, U extends string = StrToUnion<S>> = '' | {
    // @ts-ignore
    [K in U]: `${K}${AllCombinationsTemp<never, Exclude<U, K>>}`
  }[U]
  // 以下两句为核心，需结合答案看
  type t11 = AllCombinationsTemp<'BC'> // type t11 = "" | "BC" | "B" | "C" | "CB"
  type t12 = AllCombinationsTemp<'ABC'> // type t12 = "" | "ABC" | "A" | "BC" | "B" | "C" | "CB" | "AB" | "AC" | "ACB" | "CA" | "BA" | "BAC" | "BCA" | "CAB" | "CBA"
}