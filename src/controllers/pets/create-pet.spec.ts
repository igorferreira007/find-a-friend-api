import { app } from "@/app.ts"
import { createAndAuthenticateOrg } from "@/utils/tests/create-and-authenticate-org.ts"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Create pet (e2e)", () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it("should be able create pet", async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Bob",
        description: null,
        age: "ADULT",
        energyLevel: "MEDIUM",
        environment: "MEDIUM",
        independenceLevel: "MEDIUM",
        size: "MEDIUM",
      })
    expect(response.statusCode).toEqual(201)
  })
})
