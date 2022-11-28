// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, "a", number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, "a", any, 1], any>, 5>>
];

// ============= Your Code Here =============
type LastIndexOf<T extends any[], U> = T extends [...infer F, infer L]
  ? Equal<L, U> extends true
    ? F["length"]
    : LastIndexOf<F, U>
  : -1;

// @answer-end
namespace t5317 {
  // 与IndexOf类似，但是需要注意这里因为递归次数是从 T['length'] 往下减的，所以可以
  // 1. 用 LastIndex = T['length'] 每次 -1 实现，不过很麻烦
  // 2. 用每次递归的 T['length'] 替代
}
