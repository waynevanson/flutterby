import { fetch as _fetch } from "cross-fetch"
import { either as E, readonlyArray as ROA, taskEither as TE } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"

export function coerce<B>() {
  return <A>(a: A): Extract<B, A> => a as Extract<B, A>
}

export const fetch = (init?: RequestInit) => (input: RequestInfo) =>
  pipe(
    TE.tryCatch(
      () => _fetch(input, init),
      (e) => e as Error
    ),
    TE.chain((e) =>
      TE.tryCatch(
        (): Promise<E.Json> => e.json(),
        (e) => e as Error
      )
    )
  )

// union to intersection
export type UTI<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

/**
 * @summary
 * Creates a Codec that is a union of all codecs
 * or a combination of all codecs.
 */
export const XOR = <
  MS extends readonly [d.Decoder<any, any>, ...Array<d.Decoder<any, any>>]
>(
  ...members: MS
): c.Codec<
  d.InputOf<MS[keyof MS]>,
  d.TypeOf<MS[keyof MS]> | UTI<d.TypeOf<MS[keyof MS]>>,
  d.TypeOf<MS[keyof MS]> | UTI<d.TypeOf<MS[keyof MS]>>
> => {
  const intersection = pipe(
    members,
    ROA.reduce(d.id<UTI<d.TypeOf<MS[keyof MS]>>>(), (b, a) =>
      pipe(b, d.intersect(a))
    )
  )
  return pipe(d.union(intersection, ...members), c.fromDecoder)
}
