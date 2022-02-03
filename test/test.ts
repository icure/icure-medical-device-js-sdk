import { expect } from "chai"
import { describe } from "mocha"
import { AgreementTransaction } from "../model/AgreementTransaction"

import { Buffer } from "buffer"

if (typeof btoa === "undefined") {
  global.btoa = function(str: string) {
    return Buffer.from(str, "binary").toString("base64")
  }
}

if (typeof atob === "undefined") {
  global.atob = function(b64Encoded: string) {
    return Buffer.from(b64Encoded, "base64").toString("binary")
  }
}

describe("ArrayBuffer in model", () => {
  it("should convert base64 to ArrayBuffer", () => {
    const atr = new AgreementTransaction({ coverageType: "complete", content: "MTIzNAo" })
    expect(atr.coverageType).to.equal("complete", "Other properties are not copied")
    expect(atr.content instanceof ArrayBuffer).to.equal(true, "Content property is not converted")
    const control = new Uint8Array([49, 50, 51, 52, 10])
    expect(new Uint8Array(atr.content!).reduce((d, b) => d + String.fromCharCode(b), "")).to.equal(
      control.reduce((d, b) => d + String.fromCharCode(b), ""),
      "Content property is incorrect"
    )
  })
})
