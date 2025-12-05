import { app } from "@/app.ts"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Create org (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able create org", async () => {
    const response = await request(app.server).post("/orgs").send({
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

    expect(response.statusCode).toEqual(201)
  })
})
