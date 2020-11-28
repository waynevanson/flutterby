import { option as O, record as RC } from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"
import { URL as URL_ } from "./types"
import { optional as OP, lens } from "monocle-ts"

const dummy = () => new URL("https://frank.com")
const clone = (url: globalThis.URL) => new URL("", url)

export function host(URL: URL_) {
  const url = dummy()

  Object.assign(url, {
    hostname: URL.hostname,
    port: O.fold(() => "", String)(URL.port),
  })
  return url.host
}

export function origin(URL: URL_) {
  const { protocol } = URL
  return `${protocol}//${host(URL)}`
}

export function query(URL: URL_) {
  const { query } = URL
  return new URLSearchParams(query).toString()
}

export function search(URL: URL_) {
  return `?${query(URL)}`
}

export function pathname(URL: URL_) {
  return `/${URL.pathname.join("/").toString()}`
}

export function path(URL: URL_) {
  return `${pathname(URL)}${search}`
}

export function password(URL: URL_) {
  return pipe(
    URL.auth,
    O.chain(({ password }) => pipe(password))
  )
}

export function username(URL: URL_) {
  return pipe(
    URL.auth,
    O.map(({ username }) => username)
  )
}

export function auth(URL: URL_) {
  const password_ = pipe(
    URL,
    password,
    O.fold(
      () => "",
      (a) => `:${a}`
    )
  )
  const username_ = pipe(
    URL,
    username,
    O.getOrElse(() => "")
  )
  return username_ + password_
}

export function href(URL: URL_) {
  origin
}
