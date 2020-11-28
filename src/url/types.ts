import { option as O } from "fp-ts"

export type Auth = O.Option<{
  username: string
  password: O.Option<string>
}>

export type Query = Record<string, string>

// lowest level building blocks
export type URL = {
  protocol: string
  auth: Auth
  pathname: Array<string>
  query: Query
  hash: O.Option<string>
  hostname: string
  port: O.Option<number>
}
