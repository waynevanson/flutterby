import { pipe } from "fp-ts/lib/function"
import * as c from "io-ts/Codec"

const User_ = c.lazy("User", () => User)
const Urls_ = c.lazy("URLs", () => URLS)

export interface Asset extends c.TypeOf<typeof Release> {}
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
  uploader: User_,
})

export interface License extends c.TypeOf<typeof License> {}
export const License = c.type({
  key: c.string,
  name: c.string,
  spdx_id: c.string,
  url: c.string,
  node_id: c.string,
})

export interface Repository extends c.TypeOf<typeof Repository> {}
export const Repository = pipe(
  c.type({
    id: c.number,
    node_id: c.string,
    name: c.string,
    full_name: c.string,
    private: c.boolean,
    owner: User_,
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
  c.intersect(Urls_)
)

export interface Release extends c.TypeOf<typeof Release> {}
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
  author: c.lazy("Author", () => User),
  assets: c.array(Asset),
})

export interface Releases extends c.TypeOf<typeof Releases> {}
export const Releases = c.array(Release)

export interface URLS extends c.TypeOf<typeof URLS> {}
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

export interface User extends c.TypeOf<typeof User> {}
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
