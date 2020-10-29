import {
  stateReaderTaskEither as SRTE,
  nonEmptyArray as NEA,
  taskEither as TE,
  option as O,
  either as E,
} from "fp-ts"
import { fetch as _fetch } from "cross-fetch"
import * as semver from "semver"
import { flow, pipe } from "fp-ts/lib/function"
import * as t from "./io-ts/npm"
import * as util from "./util"

export interface NPMSettings {
  registry_name: "NPM"
  npm_token: string
  username: string
}

export interface GitConfig {
  tag: {
    semantic: Record<"raw" | "major" | "minor" | "patch", string>
    gross: O.Option<Record<"prerelease" | "number", string>>
  }
  branch: string
}

export interface Config {
  registry_token: string
  repository_token: string
  sourcecode_location: string
  /**
   * @summary
   * If _`false`_, throw an `Error` when there is a mismatch between
   * versions on any remote, which advises what the next
   * version would be if this was set to `true`
   */
  sync_versions: boolean
  package_name: string
}

export interface State {
  version: string
}

export type Errors = NEA.NonEmptyArray<Error>

export type Monad<A> = SRTE.StateReaderTaskEither<State, Config, Errors, A>

export type Phase =
  | "Validating External Sources"
  | "doing stuff"
  | ""
  | "Publishing"

const errorcouldnotfindnpm = (packageName: string) =>
  new Error(
    "Request to get NPM Package" +
      `"${packageName}"` +
      " from " +
      `"${util.NPM_REGISTRY_URL}"` +
      " failed: Either the URL of the registry is incorrect or your package does not exist."
  )

export function queryPackageNPM(packageName: string) {
  const url = util.NPM_REGISTRY_URL + "/" + packageName
  console.log({ url })
  return pipe(
    util.fetch(url, { method: "GET" }),
    TE.mapLeft(
      flow(NEA.of, (ex) => NEA.snoc(ex, errorcouldnotfindnpm(packageName)))
    ),
    // cooked
    TE.chainEitherKW(t.package_.decode),
    TE.map(util.coerce<t.Package>())
  )
}

export function doespackageexist() {}

export function queryReleasesGithub({
  owner,
  repo,
}: Record<"owner" | "repo", string>) {
  const url = `${util.GOITHUB_RELEASES_URL}/repos/${owner}/${repo}/releases`
  const headers = {
    accept: "application/vnd.github.v3+json",
  }
  const init = { method: "GET", headers }

  pipe(util.fetch(url, init))
}

// export function getversionfromgit(): TE.TaskEither<Error, string> {}

// export function getversionfrompackagejson(): TE.TaskEither<Error, string> {}

// export function canwritetogithub(): TE.TaskEither<Error, void> {}

// export function canwritetonpm(): TE.TaskEither<Error, void> {}

// export function getgithubinformation() {}

// export function getnpminformation() {}

// export function getgitinformation() {}

// export function doesbranchexist(): TE.TaskEither<Error, void> {}
