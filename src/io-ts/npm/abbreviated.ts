import { pipe } from "fp-ts/lib/function"
import * as t from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import { recordString } from "../utils"
import { dist, distTags } from "./common"

// VERSIONS

/**
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-version-object)
 */
export const version = pipe(
  t.type({
    name: t.string,
    version: t.string,
    dist,
  }),
  t.intersect(
    t.partial({
      deprecated: t.string,
      dependencies: recordString,
      optionalDependencies: recordString,
      devDependencies: recordString,
      bundleDependencies: t.UnknownArray,
      peerDependencies: recordString,
      bin: recordString,
      directories: pipe(
        d.union(t.UnknownArray, t.UnknownRecord),
        t.fromDecoder
      ),
      engines: recordString,
      _hasShrinkwrap: t.boolean,
    })
  )
)
export type version = t.TypeOf<typeof version>

export const versions = t.record(version)
export type versions = Record<string, version>

// METADATA

/**
 * @summary
 * Abbreviated Metadata Format
 *
 * @see [Source](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format)
 */
export const metadata = pipe(
  t.type({
    name: t.string,
    // crazy date format with Z on the end
    "dist-tags": distTags,
    versions,
  }),
  t.intersect(
    t.partial({
      modified: t.string,
    })
  )
)
export type metadata = t.TypeOf<typeof metadata>
