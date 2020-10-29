// releases
// https://api.github.com/repos/waynevanson/dom-ts
import * as t from "io-ts/Decoder"

export interface Release extends t.TypeOf<typeof release> {}
export const release = t.type({
  id: t.number,
  node_id: t.string,
})

const payload = {
  id: 259806756,
  node_id: "MDEwOlJlcG9zaXRvcnkyNTk4MDY3NTY=",
  name: "dom-ts",
  full_name: "waynevanson/dom-ts",
  private: false,
  owner: {
    login: "waynevanson",
    id: 29592214,
    node_id: "MDQ6VXNlcjI5NTkyMjE0",
    avatar_url: "https://avatars0.githubusercontent.com/u/29592214?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/waynevanson",
    html_url: "https://github.com/waynevanson",
    followers_url: "https://api.github.com/users/waynevanson/followers",
    following_url:
      "https://api.github.com/users/waynevanson/following{/other_user}",
    gists_url: "https://api.github.com/users/waynevanson/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/waynevanson/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/waynevanson/subscriptions",
    organizations_url: "https://api.github.com/users/waynevanson/orgs",
    repos_url: "https://api.github.com/users/waynevanson/repos",
    events_url: "https://api.github.com/users/waynevanson/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/waynevanson/received_events",
    type: "User",
    site_admin: false,
  },
  html_url: "https://github.com/waynevanson/dom-ts",
  description: "fp-ts bindings for the DOM",
  fork: false,
  url: "https://api.github.com/repos/waynevanson/dom-ts",
  forks_url: "https://api.github.com/repos/waynevanson/dom-ts/forks",
  keys_url: "https://api.github.com/repos/waynevanson/dom-ts/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/waynevanson/dom-ts/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/waynevanson/dom-ts/teams",
  hooks_url: "https://api.github.com/repos/waynevanson/dom-ts/hooks",
  issue_events_url:
    "https://api.github.com/repos/waynevanson/dom-ts/issues/events{/number}",
  events_url: "https://api.github.com/repos/waynevanson/dom-ts/events",
  assignees_url:
    "https://api.github.com/repos/waynevanson/dom-ts/assignees{/user}",
  branches_url:
    "https://api.github.com/repos/waynevanson/dom-ts/branches{/branch}",
  tags_url: "https://api.github.com/repos/waynevanson/dom-ts/tags",
  blobs_url: "https://api.github.com/repos/waynevanson/dom-ts/git/blobs{/sha}",
  git_tags_url:
    "https://api.github.com/repos/waynevanson/dom-ts/git/tags{/sha}",
  git_refs_url:
    "https://api.github.com/repos/waynevanson/dom-ts/git/refs{/sha}",
  trees_url: "https://api.github.com/repos/waynevanson/dom-ts/git/trees{/sha}",
  statuses_url:
    "https://api.github.com/repos/waynevanson/dom-ts/statuses/{sha}",
  languages_url: "https://api.github.com/repos/waynevanson/dom-ts/languages",
  stargazers_url: "https://api.github.com/repos/waynevanson/dom-ts/stargazers",
  contributors_url:
    "https://api.github.com/repos/waynevanson/dom-ts/contributors",
  subscribers_url:
    "https://api.github.com/repos/waynevanson/dom-ts/subscribers",
  subscription_url:
    "https://api.github.com/repos/waynevanson/dom-ts/subscription",
  commits_url: "https://api.github.com/repos/waynevanson/dom-ts/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/waynevanson/dom-ts/git/commits{/sha}",
  comments_url:
    "https://api.github.com/repos/waynevanson/dom-ts/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/waynevanson/dom-ts/issues/comments{/number}",
  contents_url:
    "https://api.github.com/repos/waynevanson/dom-ts/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/waynevanson/dom-ts/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/waynevanson/dom-ts/merges",
  archive_url:
    "https://api.github.com/repos/waynevanson/dom-ts/{archive_format}{/ref}",
  downloads_url: "https://api.github.com/repos/waynevanson/dom-ts/downloads",
  issues_url: "https://api.github.com/repos/waynevanson/dom-ts/issues{/number}",
  pulls_url: "https://api.github.com/repos/waynevanson/dom-ts/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/waynevanson/dom-ts/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/waynevanson/dom-ts/notifications{?since,all,participating}",
  labels_url: "https://api.github.com/repos/waynevanson/dom-ts/labels{/name}",
  releases_url: "https://api.github.com/repos/waynevanson/dom-ts/releases{/id}",
  deployments_url:
    "https://api.github.com/repos/waynevanson/dom-ts/deployments",
  created_at: "2020-04-29T02:41:52Z",
  updated_at: "2020-10-29T05:01:37Z",
  pushed_at: "2020-10-29T05:01:35Z",
  git_url: "git://github.com/waynevanson/dom-ts.git",
  ssh_url: "git@github.com:waynevanson/dom-ts.git",
  clone_url: "https://github.com/waynevanson/dom-ts.git",
  svn_url: "https://github.com/waynevanson/dom-ts",
  homepage: "https://waynevanson.github.io/dom-ts",
  size: 1349,
  stargazers_count: 2,
  watchers_count: 2,
  language: "TypeScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  forks_count: 0,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 1,
  license: {
    key: "mit",
    name: "MIT License",
    spdx_id: "MIT",
    url: "https://api.github.com/licenses/mit",
    node_id: "MDc6TGljZW5zZTEz",
  },
  forks: 0,
  open_issues: 1,
  watchers: 2,
  default_branch: "main",
  temp_clone_token: null,
  network_count: 0,
  subscribers_count: 1,
}
