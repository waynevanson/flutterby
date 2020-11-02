/**
 * @summary
 * Taken from the packagejson spec at NPM
 */
import { pipe } from "fp-ts/lib/pipeable"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"
import { XOR } from "../util"
import { Json, JsonRecord } from "./json"

export type RecordBugs = c.TypeOf<typeof RecordBugs>
export const RecordBugs = XOR(
  c.type({ url: c.string }),
  c.type({ email: c.string })
)
export type Bugs = RecordBugs | string
export const Bugs = pipe(d.union(RecordBugs, d.string), c.fromDecoder)

export interface RecordPerson extends c.TypeOf<typeof RecordPerson> {}
export const RecordPerson = pipe(
  c.partial({ email: c.string, url: c.string }),
  c.intersect(c.partial({ name: c.string }))
)
export type Person = RecordPerson | string
export const Person = pipe(d.union(RecordPerson, d.string), c.fromDecoder)

export interface RecordFunding extends d.TypeOf<typeof RecordFunding> {}
export const RecordFunding = d.type({ url: d.string, type: d.string })
export type FundingUnion = RecordFunding | string
export const FundingUnion = d.union(RecordFunding, d.string)
export type Funding = FundingUnion | Array<FundingUnion>
export const Funding = pipe(
  d.union(FundingUnion, d.array(FundingUnion)),
  c.fromDecoder
)

export type Bin = c.TypeOf<typeof Bin>
export const Bin = pipe(d.union(d.string, d.record(d.string)), c.fromDecoder)

export interface Repository extends c.TypeOf<typeof Repository> {}
export const Repository = c.partial({
  type: c.string,
  url: c.string,
  directory: c.string,
})

// todo - https://docs.npmjs.com/cli/v6/using-npm/scripts
export const scripts = c.record(c.string)

// todo - https://docs.npmjs.com/cli/v6/using-npm/config
export const config = c.record(Json)

export interface Directories extends c.TypeOf<typeof Directories> {}
export const Directories = c.partial({
  lib: c.string,
  man: c.string,
  doc: c.string,
  test: c.string,
  bin: Bin,
})

export type PackageJson = c.TypeOf<typeof PackageJson>
export const PackageJson = pipe(
  c.partial({
    description: c.string,
    keywords: c.array(c.string),
    homepage: c.string,
    bugs: Bugs,
    license: c.string,
    author: Person,
    contributors: c.array(Person),
    maintainers: c.array(Person),
    funding: Funding,
    files: c.array(c.string),
    main: c.string,
    browser: c.string,
    bin: Bin,
    man: pipe(d.union(d.string, d.array(d.string)), c.fromDecoder),
    directories: Directories,
    repository: pipe(d.union(d.string, Repository), c.fromDecoder),
    scripts,
    config,
    dependencies: c.record(c.string),
    devDependencies: c.record(c.string),
    peerDependencies: c.record(c.string),
    optionalDependencies: c.record(c.string),
    bundledDependencies: c.array(c.string),
    bundleDependencies: c.array(c.string),
    engines: c.record(c.string),
    os: c.array(c.string),
    cpu: c.array(c.string),
    private: c.boolean,
    publishConfig: config,
  }),
  // required
  c.intersect(c.type({ name: c.string, version: c.string })),
  // unknown properties
  c.intersect(JsonRecord)
)
