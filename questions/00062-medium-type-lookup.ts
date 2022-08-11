// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type Animal = Cat | Dog;

type cases = [
  Expect<Equal<LookUp<Animal, "dog">, Dog>>,
  Expect<Equal<LookUp<Animal, "cat">, Cat>>,
  // @ts-expect-error
  LookUp<Dog, "cat">
];

// ============= Your Code Here =============
type LookUp<T extends { type: any }, U extends T["type"]> = T extends {
  type: U;
}
  ? T
  : never;

// 知识点
// 1. 联合类型会一个个验证，可以当作一个个体的类型 Animal = Cat，而不是 Aniaml = [Cat, Dog]
// 2. U extends T["type"] 精确缩小了参数 U 范围，可以学到的是，之前定义的泛型 T 可以直接被后面的新泛型使用
// 3. TS精髓是类型，即“形似”而不要求完全相同，前面推倒后面，特别是这里的值 T extends {type: U} ? T: never
