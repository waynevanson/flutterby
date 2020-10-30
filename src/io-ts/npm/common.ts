import { pipe } from "fp-ts/lib/function"
import * as t from "io-ts/Decoder"
import { recordString } from "../utils"

export const url = t.type({
  url: t.string,
})
export type url = t.TypeOf<typeof url>

/**
 * @summary
 * Includes at least one field.
 *
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#human)
 */
export const human = t.partial({
  name: t.string,
  email: t.string,
  url: t.string,
})
export type human = t.TypeOf<typeof human>

/**
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#dist)
 */
export const dist = pipe(
  t.type({
    tarball: t.string,
    shasum: t.string,
  }),
  t.intersect(
    t.partial({
      integrity: t.string,
      fileCount: t.number,
      unpackedSize: t.number,
      "npm-signature": t.string,
    })
  )
)
export type dist = t.TypeOf<typeof dist>

export const maintainer = t.type({
  name: t.string,
  email: t.string,
})
export type maintainer = t.TypeOf<typeof maintainer>

export const maintainers = t.array(maintainer)
export type maintainers = Array<maintainer>

/**
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#repository)
 */
export const repository = t.type({
  type: t.string,
  url: t.string,
})
export type Repository = t.TypeOf<typeof repository>

export const distTags = pipe(
  t.type({
    latest: t.string,
  }),
  t.intersect(recordString)
)
export type distTags = t.TypeOf<typeof distTags>

export const time = pipe(
  t.type({
    created: t.string,
    modified: t.string,
  }),
  t.intersect(recordString)
)
export type time = t.TypeOf<typeof time>

export const packagejsonRepository = t.partial({
  directory: t.string,
  type: t.string,
  url: t.string,
})
export type packagejsonRepository = t.TypeOf<typeof packagejsonRepository>
