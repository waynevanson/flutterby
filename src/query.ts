/**
 * @description
 * Query all the relevant remote locations before we do anything.
 * This validation ensures that what we do later will sync up.
 */
import {
  either as E,
  nonEmptyArray as NEA,
  reader as R,
  readerTaskEither as RTE,
} from "fp-ts"
import { sequenceS } from "fp-ts/lib/Apply"
import { pipe } from "fp-ts/lib/pipeable"
import { DecodeError } from "io-ts/lib/Decoder"
import { npm } from "./io-ts"
import * as util from "./util"

// make sure these are transformed into the shape I desire.

// GITHUB
// todo - handle if package is not published yet

export type QueryParamsGitHub = Record<"owner" | "repo", string>

export function makeUrlGitHubReleases({ owner, repo }: QueryParamsGitHub) {
  return `${util.GITHUB_RELEASES_URL}/repos/${owner}/${repo}/releases`
}

export const headersGitHub = {
  accept: "application/vnd.github.v3+json",
}

export const requestInitGitHub: RequestInit = {
  method: "GET",
  headers: headersGitHub,
}

// paginate so we get more than 1 release
export const queryReleasesGithub = pipe(
  R.ask<AllParams>(),
  R.map(makeUrlGitHubReleases),
  R.map(E.right),
  RTE.fromReaderEither,
  RTE.chain(RTE.fromTaskEitherK(util.fetch(requestInitGitHub))),
  RTE.mapLeft(NEA.of)
)

// NPM
// todo - handle if package is not published yet
// chainleft errorode xxx
export type QueryParamsNPM = Record<"name", string>

export function makeUrlNPM({ name }: QueryParamsNPM) {
  return util.NPM_REGISTRY_URL + "/" + name
}

const requestInitNPM: RequestInit = {
  method: "GET",
}

export const queryPackageNPM = pipe(
  R.ask<AllParams>(),
  R.map(makeUrlNPM),
  R.map(E.right),
  RTE.fromReaderEither,
  RTE.chain(RTE.fromTaskEitherK(util.fetch(requestInitNPM))),
  RTE.chainEitherKW(npm.full.metadata.decode),
  RTE.mapLeft(NEA.of)
)

// GIT
// PACKAGEJSON

// ALL

export type AllParams = QueryParamsGitHub & QueryParamsNPM

const validation = RTE.getReaderTaskValidation(
  NEA.getSemigroup<DecodeError | Error>()
)

// todo - validatoin
export const getall = pipe(
  {
    npm: queryPackageNPM,
    github: queryReleasesGithub,
  },
  sequenceS(validation)
)
