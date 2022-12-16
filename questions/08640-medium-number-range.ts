// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
type Result1 = | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Result2 = | 0 | 1 | 2
type Result3 =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
  | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60
  | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70
  | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80
  | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90
  | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100
  | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110
  | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120
  | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130
  | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140
type cases = [
  Expect<Equal<NumberRange<2, 9>, Result1>>,
  Expect<Equal<NumberRange<0, 2>, Result2>>,
  Expect<Equal<NumberRange<0, 140>, Result3>>,
]


// ============= Your Code Here =============
type LenToArr<L extends number, R extends 0[] = []> = R['length'] extends L ? R: LenToArr<L, [0, ...R]>

type NumberRange<L extends number, H extends number, R extends 0[] = LenToArr<L>, N extends number = never> = R['length'] extends H 
                                                                                                              ? N | R['length']
                                                                                                              : NumberRange<L, H, [0, ...R], N | R['length']>

// @answer-end
namespace t8640 {
  // 1. 思路很简单，首先生成等于L的数组R，然后数组 R 每次递归都会多一个元素，直到 R.length === H 为止
  type t1 = LenToArr<5>
  // type t1 = [unknown, unknown, unknown, unknown, unknown]

  // 2. 最后把数组转化为 union 就可以了
  type t2 = [1, 2][number]
  // type t2 = 2 | 1

  // 3. 用上面的思路，就可以实现 NumberRange，使用临时变量 R 来保存第一次 H 的数组，使用多一个变量 N 来保存每次递归的数组R长度值，将R数组长度转化为数字存入N
  type t3 = NumberRange<2, 5>

  // 4. 这里注意 N 初始要为never，因为 never 会被忽略
  type t4 = never | 1
}