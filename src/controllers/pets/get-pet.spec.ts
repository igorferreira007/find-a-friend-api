import { app } from "@/app.ts"
import { prisma } from "@/lib/prisma.ts"
import { createOrgsAndPets } from "@/utils/tests/create-orgs-and-pets.ts"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Get pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to get a new pet", async () => {
    await createOrgsAndPets("City-01", "City-02")

    const pet = await prisma.pet.findFirstOrThrow({ where: { name: "Pet 02" } })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
      })
    )
  })
})
