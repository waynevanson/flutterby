// constructor = url
// destructor  = href
// use global URL for state
// destrctor for FP based

import { option as O } from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"
import { Query, Auth, URL } from "./types"

const isNonEmpty = (a: string) => a !== ""
const optionNonEmpty = O.fromPredicate(isNonEmpty)
const foldString = O.fold(
  () => "",
  (a: string | number | boolean) => String(a)
)
const foldToNumber = (n: string | number | boolean) =>
  O.tryCatch(() => Number(n))

const url_ = (base: string) => O.tryCatch(() => new globalThis.URL(base))

const URL_toURL = (URL: globalThis.URL): URL => {
  return {
    auth: pipe(
      URL.username,
      optionNonEmpty,
      O.map((username) => ({
        username,
        password: optionNonEmpty(URL.password),
      }))
    ),
    hash: pipe(
      optionNonEmpty(URL.hash),
      O.map((a) => a.slice(1))
    ),
    hostname: URL.hostname,
    protocol: URL.protocol,
    pathname: URL.pathname.split("/").slice(1),
    port: foldToNumber(URL.port),
    search: (() => {
      const a: Query = {}
      URL.searchParams.forEach((v, k) => (a[k] = v))
      return a
    })(),
  }
}

export const url = flow(url_, O.map(URL_toURL))

export type Origin = Pick<URL, "protocol" | "hostname" | "port">
/**
 * @category Destructors
 */
export const toOrigin: (url: URL) => Origin = ({
  hostname,
  port,
  protocol,
}) => ({ hostname, port, protocol })

/**
 * @category Constructors
 */
export const fromOrigin: (url: Origin) => O.Option<URL> = ({
  protocol,
  hostname,
  port,
}) =>
  pipe(
    url_(`${protocol}//${hostname}`),
    O.map((URL) => {
      URL.port = foldString(port)
      return URL
    }),
    O.map(URL_toURL)
  )

const flattenAuth = (auth: Auth) =>
  pipe(
    auth,
    O.fold(
      () => ({ username: "", password: "" }),
      ({ username, password }) => ({
        username,
        password: pipe(password, foldString),
      })
    )
  )

export const href = ({
  auth: auth_,
  hash: hash_,
  hostname,
  pathname: pathname_,
  port: port_,
  protocol,
  search: search_,
}: URL): O.Option<string> =>
  pipe(
    url_(`${protocol}//${hostname}`),
    O.map((URL) => {
      Object.assign(
        URL,
        {
          pathname: pathname_.join("/"),
          search: new URLSearchParams(search_).toString(),
          port: pipe(port_, O.chain(foldToNumber), foldString),
          hash: foldString(hash_),
        },
        flattenAuth(auth_)
      )
      return URL.href
    })
  )
