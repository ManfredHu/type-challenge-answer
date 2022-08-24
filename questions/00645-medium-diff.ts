// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

// ============= Your Code Here =============
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>

// 知识点
// 1. 分析，就是两个圈求非公共部分
// 2. 熟练使用& 和 Omit
// 3. O & O1 = {name: string, age: string, gender: number }, keyof O & keyof O1 = name | age & name | age | gender = age | name
type OAndO1 = keyof (Foo & Bar)
type NameAndAge = keyof Foo & keyof Bar
// 4. 最后排除的是 O 和 O1 公共的 k，下面写法等价
type OAndO1Keys = keyof (Foo | Bar)
type OAndO1Keys2 = keyof Foo & keyof Bar