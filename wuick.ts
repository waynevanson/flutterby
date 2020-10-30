import { pipe } from "fp-ts/lib/function"
import * as codec from "io-ts/Codec"

interface In {
  folder?: boolean
}

interface Out {
  folder: boolean
}

// how to turn this to be Out type?
const aspartial = codec.partial({
  folder: codec.boolean,
})

type PartialKeys<T extends Record<string, any>> = {
  [P in keyof T]: T extends { [K in P]-?: T[K] } ? never : P
}[keyof T]

/**
 * @summary
 * Provide defaults and they'll be passed
 */
function required<A>(
  properties: { [P in keyof A]: A[P] }
): <B>(
  codec: codec.Codec<
    any,
    { [K in keyof B]: B[K] } & Partial<A>,
    { [K in keyof B]: B[K] } & Partial<A>
  >
) => B {
  return () => {}
}

const result = pipe(aspartial, required({ folder: true, penis: false }))

type AAA = {
  a?: string
}
