// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
]

// ============= Your Code Here =============
interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}
type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
                                                  ? [
                                                    ...InorderTraversal<T['left']>,
                                                    T['val'],
                                                    ...InorderTraversal<T['right']>
                                                  ]
                                                  : []

// @answer-end
// 知识点
namespace t3376 {
  // 1. 中序遍历顺序，先左子树，再自身，再右子树。所以是 1，3，2 顺序
  // 2. 很容易想到递归，但是这里递归终止条件判断，其实就是判断节点是否为节点而不是null
  // 所以很容易想到 type xxx !== null or type xxx === TreeNode 类似的答案
  type t1<T> = T extends 'a' ? 1: 2
  type t2 = t1<null | 'a'> // type t2 = 1 | 2
  // 3. 从 https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types 知道
  // 为了防止参数为union type需要使用 [A] extends [B] 来终止union type的分配律和隔绝never的存在，即消除
  // <T extends TreeNode | null> 中的联合类型，此时只能为 T=TreeNode或者 T=null，此时最后结果也不会成为union type
  type ToArray<Type> = Type extends any ? Type[] : never; 
  type t3 = ToArray<string | number>;
  // type t3 = string[] | number[]
  type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
  // 'StrArrOrNumArr' is no longer a union.
  type t4 = ToArrayNonDist<string | number>;
  // type t4 = (string | number)[]
}
