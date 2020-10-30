import { either as E, taskEither as TE } from "fp-ts"
import * as query from "../src/query"
import { GITHUB_RELEASES_URL } from "../src"
import * as util from "util"

describe("github", () => {
  test("List Releases", async () => {
    const result = await query.queryReleasesGithub({
      name: "dom-ts",
      owner: "waynevanson",
    })({ endpoint: GITHUB_RELEASES_URL })()

    // console.log(util.inspect(result, { colors: true, depth: 20 }))

    expect(result).toMatchObject(E.right({}))
  })
})
