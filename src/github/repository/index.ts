// This module represents the API

import { reader as R, readerTaskEither as RTE } from "fp-ts"
import * as string from "fp-ts-std/lib/String"
import { flow, pipe } from "fp-ts/lib/function"
import { fetch } from "../../util"
import { Options } from "../index"
import { Repository } from "./codecs"

export type RepositoryParams = {
  /**
   * @summary
   * The owner of the repository
   */
  owner: string

  /**
   * @summary
   * The name of the repository
   */
  name: string
}

export function url({
  name,
  owner,
}: RepositoryParams): R.Reader<Options, string> {
  return pipe(
    R.asks(({ endpoint }) => endpoint),
    R.map(string.append(`/${owner}/${name}`))
  )
}

export const headers: HeadersInit = {
  accept: "application/vnd.github.v3+json",
}

export const requestInit: RequestInit = {
  method: "GET",
  headers,
}

export const request = flow(
  url,
  R.map(fetch(requestInit)),
  RTE.chainEitherKW(Repository.decode)
)
