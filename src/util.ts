import {
  stateReaderTaskEither as SRTE,
  nonEmptyArray as NEA,
  taskEither as TE,
  option as O,
  either as E,
} from "fp-ts"
import { fetch as _fetch } from "cross-fetch"
import * as semver from "semver"
import { flow, pipe } from "fp-ts/lib/function"
import * as t from "./io-ts/npm"

export function coerce<B>() {
  return <A>(a: A): Extract<B, A> => a as Extract<B, A>
}

export const fetch = flow(
  TE.tryCatchK(_fetch, (e) => e as Error),
  TE.chain((e) =>
    TE.tryCatch(
      (): Promise<E.Json> => e.json(),
      (e) => e as Error
    )
  )
)
export const NPM_REGISTRY_URL = "https://registry.npmjs.org"
export const GOITHUB_RELEASES_URL = "https://api.github.com"
