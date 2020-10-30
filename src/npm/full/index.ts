import { pipe, flow } from "fp-ts/lib/function"
import * as t from "io-ts/Codec"
import { Options } from ".."
import * as abbr from "../abbreviated"
import { human, recordString, time, repository, Url } from "../common"
import { reader as R, readerTaskEither as RTE } from "fp-ts"
import * as string from "fp-ts-std/lib/String"
import { fetch } from "../../util"
// VERSION

export const versionHoisted = t.partial({
  author: human,
  bugs: Url,
  contributors: t.array(human),
  description: t.string,
  homepage: t.string,
  keywords: t.array(t.string),
  license: t.string,
  maintainers: t.array(human),
  readme: t.string,
  readmeFilename: t.string,
  repository,
})

// Each package version data object contains all of the fields in the abbreviated document,
// plus the fields listed above as hosted,
// plus at least the following
export const version = pipe(
  t.type({
    _id: t.string,
    _npmUser: human,
  }),
  t.intersect(
    t.partial({
      _npmVersion: t.string,
      main: t.string,
      _nodeVersion: t.string,
    })
  ),
  t.intersect(abbr.Version),
  t.intersect(versionHoisted),
  t.intersect(t.UnknownRecord)
)
export type version = t.TypeOf<typeof version>

export const versions = t.record(version)
export type versions = t.TypeOf<typeof versions>

export const metadataTopLevel = pipe(
  t.type({
    _id: t.string,
    _rev: t.string,
    time,
    versions,
  }),
  t.intersect(
    t.partial({
      users: recordString,
    })
  )
)

/**
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#full-metadata-format)
 */
export const Metadata = pipe(
  t.UnknownRecord,
  t.intersect(abbr.Metadata),
  t.intersect(metadataTopLevel),
  t.intersect(versionHoisted)
)
export type Metadata = t.TypeOf<typeof Metadata>

export type MetadataParams = {
  name: string
}

export function url({ name }: MetadataParams): R.Reader<Options, string> {
  return pipe(
    R.asks(({ endpoint }) => endpoint),
    R.map(string.append(`/${name}`))
  )
}

const requestInit: RequestInit = {
  method: "GET",
}

export const request = flow(
  url,
  R.map(fetch(requestInit)),
  RTE.chainEitherKW(Metadata.decode)
)
