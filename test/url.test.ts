import { option as O } from "fp-ts"
import * as url from "../src/url"

describe("url", () => {
  describe("constructors", () => {
    test("url", () => {
      const input =
        "https://frank:sinatra@www.frank.com:8009/path1/path2?query1=answer1&query2=answer2#hashtag"

      const data: url.URL = {
        protocol: "https:",
        pathname: ["path1", "path2"],
        port: O.some(8009),
        hostname: "www.frank.com",
        hash: O.some("hashtag"),
        auth: O.some({ username: "frank", password: O.some("sinatra") }),
        search: { query1: "answer1", query2: "answer2" },
      }

      const result = url.url(input)

      expect(result).toStrictEqual(O.some(data))
    })
  })

  describe("destructors", () => {
    test("href", () => {
      const data: url.URL = {
        protocol: "https:",
        pathname: ["path1", "path2"],
        port: O.some(8009),
        hostname: "www.frank.com",
        hash: O.some("hashtag"),
        auth: O.some({ username: "frank", password: O.some("sinatra") }),
        search: { query1: "answer1", query2: "answer2" },
      }

      const output =
        "https://frank:sinatra@www.frank.com:8009/path1/path2?query1=answer1&query2=answer2#hashtag"

      const result = url.href(data)
      expect(result).toStrictEqual(O.some(output))
    })
  })

  describe.skip("combinators", () => {
    test.todo("url")
  })

  describe.skip("instances", () => {
    describe("show", () => {
      test.todo("url")
    })
  })
})
