import { fetch as _fetch } from "cross-fetch"
import { either as E, taskEither as TE } from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"

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

export const NPM_REGISTRY_URL = "https://registry.npmjs.org"
export const GITHUB_RELEASES_URL = "https://api.github.com"
