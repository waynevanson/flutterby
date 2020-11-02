import { either as E } from "fp-ts"
import { Endomorphism, flow, Lazy } from "fp-ts/lib/function"

export type Url = E.Either<TypeError, URL>

const tryCatchTypeError = <A>(f: Lazy<A>) =>
  E.tryCatch(f, (e) => e as TypeError)

const dedupe: (f: (e: URL) => void) => Endomorphism<Url> = (f) =>
  flow(
    E.chainFirst((e) => tryCatchTypeError(() => f(e))),
    clone
  )
/**
 * @category Destructors
 */
export const getOrElseW: <B>(
  onTypeError: (e: TypeError) => B
) => (url: Url) => B | URL = E.getOrElseW

/**
 * @category Constructors
 */
export const href = (url: string): Url => tryCatchTypeError(() => new URL(url))

export const clone: (url: Url) => Url = flow(
  E.map((a) => a.href),
  E.chain(href)
)

/**
 * @category Combinators
 */
export const hash: (hash: string) => Endomorphism<Url> = (a) =>
  dedupe((url) => (url.hash = a))

/**
 * @category Combinators
 */
export const host: (host: string) => Endomorphism<Url> = (a) =>
  dedupe((url) => (url.host = a))

/**
 * @category Combinators
 */
export const password: (password: string) => Endomorphism<Url> = (a) =>
  dedupe((url) => (url.password = a))

/**
 * @category Combinator
 */
export const port: (port: number) => Endomorphism<Url> = (a) =>
  dedupe((url) => (url.port = String(a)))

/**
 * @category Combinator
 */
export const protocol: (protocol: string) => Endomorphism<Url> = (a) =>
  dedupe((url) => (url.protocol = a))

/**
 * @category Combinator
 */
export const username: (username: string) => Endomorphism<Url> = (a) =>
  dedupe((url) => (url.username = a))

/**
 * @todo
 * @category Combinator
 */
export const searchParams: (pathname: string) => Endomorphism<Url> = (a) =>
  dedupe((url) => (url.pathname = a))

/**
 * @todo
 * @category Combinator
 */
export const search: (pathname: string) => Endomorphism<Url> = (a) =>
  dedupe((url) => (url.pathname = a))
