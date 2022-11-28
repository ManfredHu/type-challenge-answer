// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]


// ============= Your Code Here =============
type ReplaceKeys<U, Keys, Target> = {
  [K in keyof U]: K extends Keys ? ( K extends keyof Target ? Target[K]: never) : U[K]
}

// @answer-end
// 解析
namespace t1130 {
// 1. 迭代 U 里的每个 key，如果在Keys里，则替换为 Target 的类型。这里Nodes是union类型，所以 [K in keyof U] 里 K 是 type | name | flag | id 
// type 和 id 在第一个case里被排除，返回 Target的 { name: number; flag: string }，第一个case结束
// 2. 第二个case里，虽然 name 命中了 union type's distribution，但是不在 Target 里，Target只有 aa 这个 key，此时按照题意要返回 name: never，
// 所以 Target 里没有 key 的时候要返回never
}

