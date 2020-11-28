import { option as O, reader as R, readerTaskEither as RTE } from "fp-ts"
import { pipe } from "fp-ts/lib/pipeable"
import * as c from "io-ts/Codec"
import { fetch } from "./util"
import * as d from "io-ts/Decoder"
import * as url from "./url"

pipe(url.href(""), url.password(""))

// https://nodejs.org/api/url.html#url_url_strings_and_url_objects
/**
 * Creates a URL that a resource exists on. Should convert to a string.
 *
 * @example
 * "https://github.com/repos/owner/name?page=3&per_page=20"
 */
export interface URLParams<
  E extends Record<string, unknown>,
  A extends Record<string, unknown>
> {
  /**
   * @summary
   * The base endpoint
   *
   * @example
   * "https://github.com"
   */
  origin: string
  /**
   * The path that is appended to the endpoint
   *
   * @example
   * "/repos/owner/name"
   */
  path: (params: E) => string
  /**
   * @summary
   * Creates a query from the input parameters
   *
   * @example "?page=3&per_page=20"
   */
  query?: (params: A) => string
}

export interface CreateRequestParams<
  E extends Record<string, unknown>,
  A extends Record<string, unknown>,
  C
> {
  url: URLParams<E, A>
  request: RequestInit
  codec: c.Codec<unknown, C, C>
}

interface RequestParams<
  E extends Record<string, unknown>,
  A extends Record<string, unknown>
> {
  pathname: E
  search: A
}

export interface RequestAPI<
  E extends Record<string, unknown>,
  A extends Record<string, unknown>,
  C
> extends RTE.ReaderTaskEither<RequestParams<E, A>, d.DecodeError | Error, C> {}

export function stringifyEndpoint<
  E extends Record<string, unknown>,
  A extends Record<string, unknown>
>({
  origin,
  path,
  query,
}: URLParams<E, A>): ({ pathname, search }: RequestParams<E, A>) => string {
  return ({ pathname, search }) => {
    const url = new URL(origin)
    url.pathname = path(pathname)
    url.search = query(search)
    return url.href
  }
}

export function createRequest<
  C,
  E extends Record<string, unknown> = {},
  A extends Record<string, unknown> = {}
>({ url, codec, request }: CreateRequestParams<E, A, C>): RequestAPI<E, A, C> {
  return pipe(
    stringifyEndpoint(url),
    R.map(fetch(request)),
    RTE.chainEitherKW(codec.decode)
  )
}
