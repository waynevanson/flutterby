// Module consists of the following
// construct endpoint, codecs,
// reflect only what the API gives you

export interface Options {
  /**
   * @summary
   * URL to be used as the base
   */
  endpoint: string
}

export const headers: HeadersInit = {
  accept: "application/vnd.github.v3+json",
}

export * as repos from "./repos"
