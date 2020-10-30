import { either as E } from "fp-ts"
import * as freedom from "../src/query"
import { NPM_REGISTRY_URL } from "../src"

describe("npm", () => {
  test("/package", async () => {
    const result = await freedom.queryNPM({
      name: "dom-ts",
    })({ endpoint: NPM_REGISTRY_URL })()

    expect(result).toMatchObject(E.right({}))
  })
})
