import { either as E, taskEither as TE } from "fp-ts"
import * as freedom from "../src/query"
import { metadata } from "../src/io-ts/npm/full"
import * as u from "util"

describe("npm", () => {
  test("queryPackageNPM", async () => {
    const result = await freedom.queryPackageNPM({
      name: "dom-ts",
    })()

    console.log(u.inspect({ result }, { depth: 20, colors: true }))

    expect(result).toMatchObject(
      E.right({ name: "dom-ts" } as Partial<metadata>)
    )
  })
})
