/**
 * @see `https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-releases`
 */
import { reader as R, readerTaskEither as RTE } from "fp-ts"
import * as string from "fp-ts-std/lib/String"
import { flow, pipe } from "fp-ts/lib/function"
import { RepositoryParams, requestInit, User } from ".."
import { fetch } from "../../../util"
import { Options } from "../.."
import { stringify } from "querystring"
import * as c from "io-ts/Codec"

export type Asset = c.TypeOf<typeof Release>
export const Asset = c.type({
  url: c.string,
  browser_download_url: c.string,
  id: c.number,
  node_id: c.string,
  name: c.string,
  label: c.string,
  state: c.string,
  content_type: c.string,
  size: c.number,
  download_count: c.number,
  created_at: c.string,
  updated_at: c.string,
  uploader: User,
})

export type Release = c.TypeOf<typeof Release>
export const Release = c.type({
  url: c.string,
  html_url: c.string,
  assets_url: c.string,
  upload_url: c.string,
  tarball_url: c.string,
  zipball_url: c.string,
  id: c.number,
  node_id: c.string,
  tag_name: c.string,
  target_commitish: c.string,
  name: c.string,
  body: c.string,
  draft: c.boolean,
  prerelease: c.boolean,
  created_at: c.string,
  published_at: c.string,
  author: User,
  assets: c.array(Asset),
})

export type Releases = c.TypeOf<typeof Releases>
export const Releases = c.array(Release)

export type Pagination = {
  per_page: number
  page: number
}

export type ReleaseParams = RepositoryParams & { pagination: Pagination }

export function url({
  name,
  owner,
  pagination,
}: ReleaseParams): R.Reader<Options, string> {
  return pipe(
    R.asks(({ endpoint }) => endpoint),
    R.map(
      string.append(`/repos/${owner}/${name}/releases?${stringify(pagination)}`)
    )
  )
}

export const request = flow(
  url,
  R.map(fetch(requestInit)),
  RTE.chainEitherKW(Releases.decode)
)
