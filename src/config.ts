/**
 * @summary
 * Configuration Validation.
 */
import * as c from "io-ts/Codec"

export interface Configuration extends c.TypeOf<typeof Configuration> {}
export const Configuration = c.type({
  branch: c.string,
  force: c.boolean,
})
