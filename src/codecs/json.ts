import { either as E, readonlyArray as ROA } from "fp-ts"
import { pipe } from "fp-ts/lib/pipeable"
import * as c from "io-ts/Codec"
import * as d from "io-ts/Decoder"

const Json_ = c.lazy("Json", () => Json)

export const JsonRecord: c.Codec<
  unknown,
  E.JsonRecord,
  E.JsonRecord
> = c.record(Json_)

export const JsonArray: c.Codec<unknown, E.JsonArray, E.JsonArray> = pipe(
  c.array(Json_),
  c.imap(ROA.fromArray, ROA.toArray)
)

export const Json: c.Codec<unknown, E.Json, E.Json> = pipe(
  d.union(c.string, c.boolean, c.number, JsonRecord, JsonArray),
  d.nullable,
  c.fromDecoder
)
