/**
 * @description
 * Query all the relevant remote locations before we do anything.
 * This validation ensures that what we do later will sync up.
 */
import {
  either as E,
  nonEmptyArray as NEA,
  option as O,
  readerTaskEither as RTE,
} from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"
import { DecodeError } from "io-ts/lib/Decoder"
import * as github from "./github"
import * as npm from "./npm"
import { QueryNPM } from "./types"
import * as semver from "semver"

export const parseSemver = (input: string) =>
  pipe(
    semver.parse(input, { loose: false, includePrerelease: false }),
    E.fromNullable("`semver` deems the version as invalid")
  )

// make sure these are transformed into the shape I desire.

// GITHUB
// todo - handle if package is not published yet

// paginate so we get more than 1 release
export const queryReleasesGithub = ({
  name,
  owner,
}: github.repos.RepositoryParams) =>
  github.repos.releases.list.request({
    pagination: { page: 0, per_page: 100 },
    name,
    owner,
  })

const atob = ({
  name,
  "dist-tags": { latest },
}: npm.abbreviated.Metadata): E.Either<unknown, QueryNPM> => pipe()

// NPM
export const queryNPM = flow(npm.abbreviated.request)

// GIT
// PACKAGEJSON

// ALL

export type AllParams = github.repos.RepositoryParams &
  npm.abbreviated.MetadataParams

const validation = RTE.getReaderTaskValidation(
  NEA.getSemigroup<DecodeError | Error>()
)
