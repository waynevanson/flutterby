export type Semver = Record<"major" | "minor" | "patch", number>

export interface Version {
  raw: string
  semver: Semver
}

/**
 * @summary
 * Relevant information for the package published at NPM.
 */
export interface QueryNPM {
  name: string
  tag: string // latest, next, under `dist-tags`
  version: Version
}

/**
 * @summary
 * Relevant information for the released published at GitHub.
 * Please note this is not related to Github Packages.
 */
export interface QueryGithubReleases {
  branch: string // main, next
  tag: string // latest, next
  version: Version
  release: "latest" | "prerelease"
}

/**
 * @summary
 * Relevant information for the source code hosted on GitHub.
 */
export interface QueryGithubRepository {
  tag: string // latest, next
  version: Version
  branch: string
}

/**
 * @summary
 * Relevant information from the projects `.git`.
 */
export interface QueryGit {
  tag: string // latest, prerelease
  version: Version
  branch: string // main, next
}

/**
 * @summary
 * Relevant information for the package published at NPM.
 */
export interface QueryPackageJSON {
  name: string
  version: Version
}
