import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"

export const recordString = c.record(c.string)

export const Url = c.type({
  url: c.string,
})
export type Url = c.TypeOf<typeof Url>

/**
 * @summary
 * Includes at least one field.
 *
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#human)
 */
export const human = c.partial({
  name: c.string,
  email: c.string,
  url: c.string,
})
export type human = c.TypeOf<typeof human>

/**
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#dist)
 */
export const dist = pipe(
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
export type dist = c.TypeOf<typeof dist>

export const maintainer = c.type({
  name: c.string,
  email: c.string,
})
export type maintainer = c.TypeOf<typeof maintainer>

export const maintainers = c.array(maintainer)
export type maintainers = Array<maintainer>

/**
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#repository)
 */
export const repository = c.type({
  type: c.string,
  url: c.string,
})
export type Repository = c.TypeOf<typeof repository>

export const distTags = pipe(
  c.type({
    latest: c.string,
  }),
  c.intersect(recordString)
)
export type distTags = c.TypeOf<typeof distTags>

export const time = pipe(
  c.type({
    created: c.string,
    modified: c.string,
  }),
  c.intersect(recordString)
)
export type time = c.TypeOf<typeof time>

export const packagejsonRepository = c.partial({
  directory: c.string,
  type: c.string,
  url: c.string,
})
export type packagejsonRepository = c.TypeOf<typeof packagejsonRepository>
