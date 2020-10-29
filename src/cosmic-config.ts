import * as cc from "cosmiconfig"
import * as cct from "cosmiconfig/dist/types"
import { taskEither as TE, io as IO, either as E } from "fp-ts"
import { pipe } from "fp-ts/lib/function"

export type CosmicconfigResult = NonNullable<cct.CosmiconfigResult>

export interface Result {
  clearCaches: IO.IO<void>
  clearLoadCache: IO.IO<void>
  clearSearchCache: IO.IO<void>
  load: (filePath?: string) => TE.TaskEither<Error, CosmicconfigResult>
  search: (searchFrom?: string) => TE.TaskEither<Error, CosmicconfigResult>
}

export const cosmiconfig = (config?: cc.Options) => (
  moduleName: string
): Result => {
  const {
    clearCaches,
    clearLoadCache,
    clearSearchCache,
    load,
    search,
  } = cc.cosmiconfig(moduleName, config)

  return {
    clearCaches,
    clearLoadCache,
    clearSearchCache,
    load: (filePath) =>
      pipe(
        TE.tryCatch(
          () => load(filePath),
          (e) => e as Error
        ),
        TE.chainEitherKW(
          E.fromNullable(new Error("Could not find configuration from `load`"))
        )
      ),
    search: (filePath) =>
      pipe(
        TE.tryCatch(
          () => search(filePath),
          (e) => e as Error
        ),
        TE.chainEitherKW(
          E.fromNullable(
            new Error("Could not find configuration path from `search`")
          )
        )
      ),
  }
}
