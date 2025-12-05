import { app } from "@/app.ts"
import { createOrgsAndPets } from "@/utils/tests/create-orgs-and-pets.ts"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Fetch pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
    await createOrgsAndPets("City-01", "City-02")
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able fetch pets of city 01", async () => {
    const response = await request(app.server).get("/City-01/pets").send()

    expect(response.body.pets).toHaveLength(4)
  })

  it("should be able fetch pets of city 02", async () => {
    const response = await request(app.server).get("/City-02/pets").send()

    expect(response.body.pets).toHaveLength(1)
  })

  it("should be able to fetch pets in a city with an age filter", async () => {
    const response = await request(app.server)
      .get("/City-01/pets")
      .query({
        age: "ADULT",
      })
      .send()

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: "Pet 01" }),
    ])
  })

  it("should be able to fetch pets in a city with an energy level filter", async () => {
    const response = await request(app.server)
      .get("/City-01/pets")
      .query({
        energyLevel: "HIGH",
      })
      .send()

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: "Pet 02" }),
    ])
  })

  it("should be able to fetch pets in a city with an environment filter", async () => {
    const response = await request(app.server)
      .get("/City-01/pets")
      .query({
        environment: "EXTRA_LARGE",
      })
      .send()

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: "Pet 03" }),
    ])
  })

  it("should be able to fetch pets in a city with an independence level filter", async () => {
    const response = await request(app.server)
      .get("/City-01/pets")
      .query({
        independenceLevel: "HIGH",
      })
      .send()

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: "Pet 04" }),
    ])
  })

  it("should be able to fetch pets in a city with an size filter", async () => {
    const response = await request(app.server)
      .get("/City-02/pets")
      .query({
        size: "LARGE",
      })
      .send()

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: "Pet 05" }),
    ])
  })

  it("should be able to fetch pets in a city using all the filters", async () => {
    const response = await request(app.server)
      .get("/City-01/pets")
      .query({
        age: "ADULT",
        energyLevel: "MEDIUM",
        environment: "MEDIUM",
        independenceLevel: "MEDIUM",
        size: "MEDIUM",
      })
      .send()

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: "Pet 01" }),
    ])
  })
})
