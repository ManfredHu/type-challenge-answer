// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]


// ============= Your Code Here =============
type DropChar<S extends string, C extends string> = S extends `${infer F}${infer Rest}`
                                                    ? `${F extends C ? '': F}${DropChar<Rest, C>}`
                                                    : ''

// 知识点
namespace t2070 {
  // 给一个奇怪的现象，百思不得姐
  type DropChar<S extends string, C extends string> = S extends `${infer F}${infer Last}`
                                                    ? F extends C
                                                      ? `${DropChar<Last, C>}`
                                                      : `${F}${DropChar<Last, C>}`
                                                    : ''
  // @ts-ignore
  type t4 = DropChar<'    tt fly!        ', ' '> // in vscode it's error,but web ok 🤣
  // web playground: https://www.typescriptlang.org/play#code/PQKgUABBBMAMDssIFoIBEBOB7ADhAwgBYCGGkKylV5ARgJ4HE4AuxAlgHYDyAZgAqEAQhAAUAAXxNWnXgMEBKCAGIAtgFMAJmwCuK5czUqcAG2IHkxtgYzFjyzjzVko5JW4gBFbWoDOzNlgc5OSYuBDEED44agDGbDxsmhAxJBgQPNh6EX4YnADmAHTBUABiWGlqAB7ERsZqAFzFEAAGrcw+5Mx00RCC2szWPMYMALzo2DhEpAA8AOQQNBDaEMwrEGoQaTwQdgwAhBCzADSHhwB8EMDAhzT9g8N7s+StzU0XAGqJAO4QgRAA4lYABLaGj1CCEAY4Hz1K7tFIFABWPgK5TywDgiDAIGAYDxoAgAH1iSTSSSIABNLDaNL4LAaDZApwbMms4kQHF4ro9UKTVLTADK60qBg4Gh8kWYuQ4eRO+GFovFkuleQuYyFVUVEuaABIAN4OJwQEoAX31hrSABliH4Ta8oA7HU7nS7XW7XQB+Y0KtRiiX4cjuoPBkPOr26vW8qYYabWvxys52wOhlOp53giOm-VR-lx5gJpNpotp8GzJ74kBEtlkiAAFV8q0kPl8Ver5M5bCM5VW3I2eogAFEAI7aWwnAeVaIxVYm9KZQ5iXvIFK2Ooy3zAfpsYw+cu95I2ltjADa5CuEEXPmQVSnzGvGGwzkHk9izGmw9HxmmOZms1uAyNIY6EeE4yzOUD-3uYDZjOcDyAnW93xHWxvwmaM5kgwCHmOU4YIgu4nCAx5YKOeCX2nJDP1Q3B0L-Aitmw0DiPwgCGLoGC4KgBDX0olCfxjeYHUwtiDhdHD5jwm56KIjjSK48i3w-Pi0P5eZFmWHt1k2dIdggfZDlA84WKg4jOOfRClK-fi5gWJY1lWDYtl0-TxJoSTBI0tZHJ03YIAOWSyIs5CrJU39bM8hztO2Xz-NA5h3PCh1vOivS-POOCAF08TAAk21JY0aWYQgjQFAxoVbPKOVxUByAuAVUg2OhqTSHwsGMLdAhhCEoRhOEfARZFUQwdFMVgYBiA4HwvicWqIE+NQfla9r-E68FIWYaFYWAeFCCRFE0QxBAxqWjrJtmgBZcoNimYw1zyXw1p6radr2oa8mxXEwCAA
}