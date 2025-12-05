import { app } from "@/app.ts"
import { createAndAuthenticateOrg } from "@/utils/tests/create-and-authenticate-org.ts"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Refresh token (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to generate a refresh token", async () => {
    await request(app.server).post("/orgs").send({
      name: "Find a friend",
      coordinatorName: "John Doe",
      email: "org-01@email.com",
      password: "123456",
      whatsapp: "00000000000",
      cep: "12220-610",
      state: "SP",
      city: "São José dos Campos",
      neighborhood: "Vila Tatetuba",
      street: "Rua 01",
      latitude: -23.21853715183315,
      longitude: -45.808786372274426,
    })

    const authResponse = await request(app.server).post("/sessions").send({
      email: "org-01@email.com",
      password: "123456",
    })

    const cookies = authResponse.get("Set-Cookie")

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies!)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ])
  })
})
