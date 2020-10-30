// This module represents the API
// https://api.github.com/repos/waynevanson/dom-ts
// 200 or 404
import { reader as R, readerTaskEither as RTE } from "fp-ts"
import * as string from "fp-ts-std/lib/String"
import { flow, pipe } from "fp-ts/lib/function"
import { fetch } from "../../util"
import { Options, headers } from "../index"
import * as c from "io-ts/Codec"

export type User = c.TypeOf<typeof User>
export const User = c.type({
  login: c.string,
  id: c.number,
  node_id: c.string,
  avatar_url: c.string,
  gravatar_id: c.string,
  url: c.string,
  html_url: c.string,
  followers_url: c.string,
  following_url: c.string,
  gists_url: c.string,
  starred_url: c.string,
  subscriptions_url: c.string,
  organizations_url: c.string,
  repos_url: c.string,
  events_url: c.string,
  received_events_url: c.string,
  type: c.string,
  site_admin: c.boolean,
})

export type URLS = c.TypeOf<typeof URLS>
export const URLS = c.type({
  forks_url: c.string,
  keys_url: c.string,
  collaborators_url: c.string,
  teams_url: c.string,
  hooks_url: c.string,
  issue_events_url: c.string,
  events_url: c.string,
  assignees_url: c.string,
  branches_url: c.string,
  tags_url: c.string,
  blobs_url: c.string,
  git_tags_url: c.string,
  git_refs_url: c.string,
  trees_url: c.string,
  statuses_url: c.string,
  languages_url: c.string,
  stargazers_url: c.string,
  contributors_url: c.string,
  subscribers_url: c.string,
  subscription_url: c.string,
  commits_url: c.string,
  git_commits_url: c.string,
  comments_url: c.string,
  issue_comment_url: c.string,
  contents_url: c.string,
  compare_url: c.string,
  merges_url: c.string,
  archive_url: c.string,
  downloads_url: c.string,
  issues_url: c.string,
  pulls_url: c.string,
  milestones_url: c.string,
  notifications_url: c.string,
  labels_url: c.string,
  releases_url: c.string,
  deployments_url: c.string,
  created_at: c.string,
  updated_at: c.string,
  pushed_at: c.string,
  git_url: c.string,
  ssh_url: c.string,
  clone_url: c.string,
  svn_url: c.string,
  html_url: c.string,
  mirror_url: c.nullable(c.string),
})

export type License = c.TypeOf<typeof License>
export const License = c.type({
  key: c.string,
  name: c.string,
  spdx_id: c.string,
  url: c.string,
  node_id: c.string,
})

export type Repository = c.TypeOf<typeof Repository>
export const Repository = pipe(
  c.type({
    id: c.number,
    node_id: c.string,
    name: c.string,
    full_name: c.string,
    private: c.boolean,
    owner: User,
    url: c.string,
    description: c.string,
    fork: c.boolean,
    homepage: c.string,
    size: c.number,
    stargazers_count: c.number,
    watchers_count: c.number,
    language: c.string,
    has_issues: c.boolean,
    has_projects: c.boolean,
    has_downloads: c.boolean,
    has_wiki: c.boolean,
    has_pages: c.boolean,
    forks_count: c.number,
    archived: c.boolean,
    disabled: c.boolean,
    open_issues_count: c.number,
    license: License,
    forks: c.number,
    open_issues: c.number,
    watchers: c.number,
    default_branch: c.string,
    temp_clone_token: c.nullable(c.string),
    network_count: c.number,
    subscribers_count: c.number,
  }),
  c.intersect(URLS)
)

export type RepositoryParams = {
  /**
   * @summary
   * The owner of the repository
   */
  owner: string

  /**
   * @summary
   * The name of the repository
   */
  name: string
}

export const requestInit: RequestInit = {
  method: "GET",
  headers,
}

export function url({
  name,
  owner,
}: RepositoryParams): R.Reader<Options, string> {
  return pipe(
    R.asks(({ endpoint }) => endpoint),
    R.map(string.append(`/${owner}/${name}`))
  )
}

export const request = flow(
  url,
  R.map(fetch(requestInit)),
  RTE.chainEitherKW(Repository.decode)
)

export * as releases from "./releases"
