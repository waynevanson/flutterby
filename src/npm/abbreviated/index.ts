import { reader as R, readerTaskEither as RTE } from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import { Options } from ".."
import { dist, distTags, recordString } from "../common"
import * as string from "fp-ts-std/lib/String"
import { fetch } from "../../util"

// VERSIONS

/**
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-version-object)
 */
export const Version = pipe(
  c.type({
    name: c.string,
    version: c.string,
    dist,
  }),
  c.intersect(
    c.partial({
      deprecated: c.string,
      dependencies: recordString,
      optionalDependencies: recordString,
      devDependencies: recordString,
      bundleDependencies: c.UnknownArray,
      peerDependencies: recordString,
      bin: recordString,
      directories: pipe(
        d.union(c.UnknownArray, c.UnknownRecord),
        c.fromDecoder
      ),
      engines: recordString,
      _hasShrinkwrap: c.boolean,
    })
  )
)
export type Version = c.TypeOf<typeof Version>

export const Versions = c.record(Version)
export type Versions = Record<string, Version>

/**
 * @summary
 * Abbreviated Metadata Format
 *
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format)
 */
export const Metadata = pipe(
  c.type({
    name: c.string,
    "dist-tags": distTags,
    versions: Versions,
  }),
  c.intersect(
    c.partial({
      modified: c.string,
    })
  )
)
export type Metadata = c.TypeOf<typeof Metadata>

export type MetadataParams = {
  name: string
}

export function url({ name }: MetadataParams): R.Reader<Options, string> {
  return pipe(
    R.asks(({ endpoint }) => endpoint),
    R.map(string.append(`/${name}`))
  )
}

const headers: HeadersInit = {
  Accept: "application / vnd.npm.install - v1 + json",
}

const requestInit: RequestInit = {
  method: "GET",
  headers,
}

export const request = flow(
  url,
  R.map(fetch(requestInit)),
  RTE.chainEitherKW(Metadata.decode)
)
