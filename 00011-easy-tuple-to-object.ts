// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>


// ============= Your Code Here =============
type TupleToObject<T extends readonly (number | string)[]> = {
  [K in T[number]]: K
} 
