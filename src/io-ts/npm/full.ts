import { pipe } from "fp-ts/lib/function"
import * as t from "io-ts/Codec"
import { recordString } from "../utils"
import * as abbr from "./abbreviated"
import { time, human, url, repository } from "./common"

// VERSION

export const versionHoisted = t.partial({
  author: human,
  bugs: url,
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
  t.intersect(abbr.version),
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
export const metadata = pipe(
  t.UnknownRecord,
  t.intersect(abbr.metadata),
  t.intersect(metadataTopLevel),
  t.intersect(versionHoisted)
)
export type metadata = t.TypeOf<typeof metadata>
