import { either as E } from "fp-ts"
import * as freedom from "../src"
import { Package } from "../src/io-ts/npm"

describe("", () => {
  test("", async () => {
    const result = await freedom.queryPackageNPM("dom-ts")()
    expect(result).toMatchObject(
      E.right({ name: "dom-ts" } as Partial<Package>)
    )
  })
})
