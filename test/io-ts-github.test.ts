import { either as E, taskEither as TE } from "fp-ts"
import * as query from "../src/query"

describe("github", () => {
  test("queryPackageNPM", async () => {
    const result = await query.queryReleasesGithub({
      owner: "waynevanson",
      repo: "dom-ts",
    })()
    expect(result).toMatchObject(E.right({}))
  })

  test.skip("type checks corectly", async () => {
    const result = await TE.tryCatch(
      () => import("../src/io-ts/npm"),
      (e) => e as Error
    )()
    expect(result).toMatchObject(E.right({}))
  })
})
