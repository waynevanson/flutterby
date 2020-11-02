//abbr,full,common
import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"
import { PackageJson, Directories } from "./packagejson"

// COMMON

const recordString = c.record(c.string)

/**
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#dist)
 */
export interface Dist extends c.TypeOf<typeof Dist> {}
export const Dist = pipe(
  c.type({
    tarball: c.string,
    shasum: c.string,
  }),
  c.intersect(
    c.partial({
      integrity: c.string,
      fileCount: c.number,
      unpackedSize: c.number,
      "npm-signature": c.string,
    })
  )
)

export interface DistTags extends c.TypeOf<typeof DistTags> {}
export const DistTags = pipe(
  c.type({
    latest: c.string,
  }),
  c.intersect(recordString)
)

/**
 * @summary
 * Includes at least one field.
 *
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#human)
 */
export interface Human extends c.TypeOf<typeof Human> {}
export const Human = c.partial({
  name: c.string,
  email: c.string,
  url: c.string,
})

export interface Maintainer extends c.TypeOf<typeof Maintainer> {}
export const Maintainer = c.type({
  name: c.string,
  email: c.string,
})

export const Maintainers = c.array(Maintainer)
export type Maintainers = Array<Maintainer>

export type Repository = c.TypeOf<typeof Repository>
export const Repository = c.type({
  type: c.string,
  url: c.string,
})

export interface RecordUrl extends c.TypeOf<typeof RecordUrl> {}
export const RecordUrl = c.type({ url: c.string })

export interface Time extends c.TypeOf<typeof Time> {}
export const Time = pipe(
  c.type({
    created: c.string,
    modified: c.string,
  }),
  c.intersect(recordString)
)

// ABBR

export interface AbbrVersion extends c.TypeOf<typeof AbbrVersion> {}
export const AbbrVersion = pipe(
  c.type({
    name: c.string,
    version: c.string,
    dist: Dist,
  }),
  c.intersect(
    c.partial({
      deprecated: c.string,
      dependencies: recordString,
      optionalDependencies: recordString,
      devDependencies: recordString,
      bundledDependencies: c.array(c.string),
      peerDependencies: recordString,
      bin: recordString,
      directories: Directories,
      engines: recordString,
      _hasShrinkwrap: c.boolean,
    })
  )
)

export type AbbrVersions = Record<string, AbbrVersion>
export const AbbrVersions = c.record(AbbrVersion)

export interface AbbrMetadata extends c.TypeOf<typeof AbbrMetadata> {}
export const AbbrMetadata = pipe(
  c.type({
    name: c.string,
    "dist-tags": DistTags,
    versions: AbbrVersions,
  }),
  c.intersect(
    c.partial({
      modified: c.string,
    })
  )
)

// FULL

export const versionHoisted = c.partial({
  author: Human,
  bugs: RecordUrl,
  contributors: c.array(Human),
  description: c.string,
  homepage: c.string,
  keywords: c.array(c.string),
  license: c.string,
  maintainers: c.array(Human),
  readme: c.string,
  readmeFilename: c.string,
  repository: Repository,
})

// Each package version data object contains all of the fields in the abbreviated document,
// plus the fields listed above as hosted,
// plus at least the following

export interface Version extends c.TypeOf<typeof Version> {}
export const Version = pipe(
  c.type({
    _id: c.string,
    _npmUser: Human,
  }),
  c.intersect(
    c.partial({
      _npmVersion: c.string,
      main: c.string,
      _nodeVersion: c.string,
    })
  ),
  c.intersect(AbbrVersion),
  c.intersect(versionHoisted),
  c.intersect(c.UnknownRecord)
)

export const Versions = c.record(Version)
export type Versions = Record<string, Version>

const metadataTopLevel = pipe(
  c.type({
    _id: c.string,
    _rev: c.string,
    time: Time,
    versions: Versions,
  }),
  c.intersect(
    c.partial({
      users: recordString,
    })
  )
)

/**
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#full-metadata-format)
 */
export type Metadata = PackageJson &
  AbbrMetadata &
  typeof metadataTopLevel &
  typeof versionHoisted

export const Metadata = pipe(
  PackageJson,
  c.intersect(AbbrMetadata),
  c.intersect(metadataTopLevel),
  c.intersect(versionHoisted)
)
