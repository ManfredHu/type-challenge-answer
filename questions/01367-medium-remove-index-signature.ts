// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
};

type FooBar = {
  [key: symbol]: any;
  foobar(): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { foobar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
];

// ============= Your Code Here =============
type RemoveIndexSignature<T> = {
  [K in keyof T as K extends `${infer newKey}` ? newKey: never]: T[K]
}


// @answer-end
// 知识点
namespace t1367 {
  // 1. keyof { [key: string]: any } 会得到 string | number，原因在ts2.9更新有写
  // 根据 https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#support-number-and-symbol-named-properties-with-keyof-and-mapped-types
  const s1 = Symbol()
  type t1 = keyof {
    [key: string]: any
  };
  // t1: string | number，迷一样的答案
  type t2 = keyof {
    [key: number]: any;
  }
  // t2: number
  type t3 = keyof {
    [key: symbol]: any;
  }
  // t3: symbol
  type t4 = keyof {
    [key: string]: any
    [s1]: 'k1'
  }
  // t4: string | number | unique symbol

  // ----------------------------------------------------------------------
  // 2. 由上面推断发现
  // keyof {[key: string]: any} 得到 string | number
  // keyof {[key: number]: any} 得到 numebr
  // keyof {[key: symbol]: any} 得到 symbol
  // 关键点是区分上述的索引签名(string | number | symbol)和普通的key(都是string)
  // 👉 重点：区分索引签名和确定的key，索引签名返回 string | number | symbol，普通的key就是个字符串可用 'K extends `{infer newKey}`' 确定
  type t5 = string extends t1 ? 1 : 2
  // t5: 1

  type FooAny = keyof {
    foo: any;
  };
  type t6 = string extends FooAny ? 1 : 2
  // t6: 2

  type t7 = FooAny extends string ? 1 : 2
  // t7: 1
   
  // ----------------------------------------------------------------------
  // 3. Mapped Types，means oldTypes as newTypes to transform oldKey to newKey
  // according: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#:~:text=You%20can%20filter%20out%20keys%20by%20producing%20never%20via%20a%20conditional%20type:
  // 如下写法可以删除key
  // {
  //   [xx as never]: any
  // }
  type DeleteAllKey<T> = {
    [K in keyof T as never]: T[K]
  }
  type t8 = DeleteAllKey<Foo>
  // t8: {}
}
