import { pipe } from "fp-ts/lib/function"
import * as t from "io-ts/Decoder"
import { recordString } from "./utils"

// https://registry.npmjs.org/dom-ts

export const author = t.type({
  name: t.string,
})
export const scripts = recordString

export interface Dist extends t.TypeOf<typeof dist> {}
export const dist = t.type({
  shasum: t.string,
  integrity: t.string,
  tarball: t.string,
  fileCount: t.number,
  unpackedSize: t.number,
  npmSignature: t.string,
})

export interface Maintainer extends t.TypeOf<typeof maintainer> {}
export const maintainer = t.type({
  name: t.string,
  email: t.string,
})

export type Maintainers = Array<Maintainer>
export const maintainers = t.array(maintainer)

export const _npmUser = t.type({
  name: t.string,
  email: t.string,
})

export const _npmOperationalInternal = t.type({
  host: t.string,
  tmp: t.string,
})

export interface Version extends t.TypeOf<typeof version> {}
export const version = t.type({
  name: t.string,
  version: t.string,
  description: t.string,
  main: t.string,
  author,
  license: t.string,
  private: t.boolean,
  module: t.string,
  scripts,
  devDependencies: recordString,
  peerDependencies: recordString,
  licenseText: t.string,
  _id: t.string,
  dist,
  maintainers,
  _npmUser,
  directories: recordString,
  _hasShrinkWrap: t.boolean,
  _npmOperationalInternal,
})

export interface DistTags extends t.TypeOf<typeof distTags> {}
export const distTags = pipe(
  recordString,
  t.intersect(
    t.type({
      latest: t.string,
    })
  )
)

export const versions = t.record(version)
export interface Versions extends t.TypeOf<typeof versions> {}

export interface Repository extends t.TypeOf<typeof repository> {}
export const repository = t.type({
  type: t.string,
  url: t.string,
})

export interface Package extends t.TypeOf<typeof package_> {}
export const package_ = t.type({
  _id: t.string,
  _rev: t.string,
  name: t.string,
  "dist-tags": distTags,
  versions,
  time: recordString,
  maintainers,
  description: t.string,
  author,

  license: t.string,
  readme: t.string,
  readmeFilename: t.string,
  repository,
  homepage: t.string,
  bugs: t.type({ url: t.string }),
})
