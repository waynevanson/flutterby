// releases
// https://api.github.com/repos/waynevanson/dom-ts
// 200 or 404
// github/codecs|fetchers
import { pipe } from "fp-ts/lib/function"
import * as t from "io-ts/Codec"

export type Owner = t.TypeOf<typeof Owner>
export const Owner = t.type({
  login: t.string,
  id: t.number,
  node_id: t.string,
  avatar_url: t.string,
  gravatar_id: t.string,
  url: t.string,
  html_url: t.string,
  followers_url: t.string,
  following_url: t.string,
  gists_url: t.string,
  starred_url: t.string,
  subscriptions_url: t.string,
  organizations_url: t.string,
  repos_url: t.string,
  events_url: t.string,
  received_events_url: t.string,
  type: t.string,
  site_admin: t.boolean,
})

export type ReleaseUrl = t.TypeOf<typeof ReleaseUrl>
export const ReleaseUrl = t.type({
  forks_url: t.string,
  keys_url: t.string,
  collaborators_url: t.string,
  teams_url: t.string,
  hooks_url: t.string,
  issue_events_url: t.string,
  events_url: t.string,
  assignees_url: t.string,
  branches_url: t.string,
  tags_url: t.string,
  blobs_url: t.string,
  git_tags_url: t.string,
  git_refs_url: t.string,
  trees_url: t.string,
  statuses_url: t.string,
  languages_url: t.string,
  stargazers_url: t.string,
  contributors_url: t.string,
  subscribers_url: t.string,
  subscription_url: t.string,
  commits_url: t.string,
  git_commits_url: t.string,
  comments_url: t.string,
  issue_comment_url: t.string,
  contents_url: t.string,
  compare_url: t.string,
  merges_url: t.string,
  archive_url: t.string,
  downloads_url: t.string,
  issues_url: t.string,
  pulls_url: t.string,
  milestones_url: t.string,
  notifications_url: t.string,
  labels_url: t.string,
  releases_url: t.string,
  deployments_url: t.string,
  created_at: t.string,
  updated_at: t.string,
  pushed_at: t.string,
  git_url: t.string,
  ssh_url: t.string,
  clone_url: t.string,
  svn_url: t.string,
  html_url: t.string,
  mirror_url: t.nullable(t.string),
})

export type License = t.TypeOf<typeof License>
export const License = t.type({
  key: t.string,
  name: t.string,
  spdx_id: t.string,
  url: t.string,
  node_id: t.string,
})

/**
 * @see `https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-releases`
 */
export type Release = t.TypeOf<typeof Release>
export const Release = pipe(
  t.type({
    id: t.number,
    node_id: t.string,
    name: t.string,
    full_name: t.string,
    private: t.boolean,
    owner: Owner,
    url: t.string,
    description: t.string,
    fork: t.boolean,
    homepage: t.string,
    size: t.number,
    stargazers_count: t.number,
    watchers_count: t.number,
    language: t.string,
    has_issues: t.boolean,
    has_projects: t.boolean,
    has_downloads: t.boolean,
    has_wiki: t.boolean,
    has_pages: t.boolean,
    forks_count: t.number,
    archived: t.boolean,
    disabled: t.boolean,
    open_issues_count: t.number,
    license: License,
    forks: t.number,
    open_issues: t.number,
    watchers: t.number,
    default_branch: t.string,
    temp_clone_token: t.nullable(t.string),
    network_count: t.number,
    subscribers_count: t.number,
  }),
  t.intersect(ReleaseUrl)
)
