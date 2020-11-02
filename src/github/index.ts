import * as querystring from "querystring"
import { GITHUB_API_URL } from "../constants"
import { createRequest } from "../requester"
import * as cc from "../codecs/github"

const origin = GITHUB_API_URL

const accept = "application/vnd.github.v3+json"
const headers: HeadersInit = { accept }
const request: RequestInit = { headers, method: "GET" }

// PARAMETERS

export type RepositoryParams = {
  /**
   * @summary The owner of the repository
   */
  owner: string
  /**
   * @summary  The name of the repository
   */
  name: string
}

export type Pagination = {
  per_page: number
  page: number
}

// REQUESTERS

export const fetchListReleases = createRequest<
  cc.Releases,
  RepositoryParams,
  Pagination
>({
  url: {
    origin,
    path: ({ name, owner }) => `/repos/${owner}/${name}/releases`,
    query: querystring.encode,
  },
  request,
  codec: cc.Releases,
})

export const fetchLatestRelease = createRequest<cc.Release, RepositoryParams>({
  url: {
    origin,
    path: ({ name, owner }) => `/repos/${owner}/${name}/releases/latest`,
  },
  request,
  codec: cc.Release,
})

type TagNameParams = RepositoryParams & {
  tag: string
}

export const fetchReleaseByTagName = createRequest<cc.Release, TagNameParams>({
  url: {
    origin,
    path: ({ name, owner }) => `/repos/${owner}/${name}/releases/tags/{tag}`,
  },
  request,
  codec: cc.Release,
})
