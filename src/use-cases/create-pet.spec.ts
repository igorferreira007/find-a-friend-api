import { PetsRepository } from "@/repositories/pets-repositories.ts"
import { beforeEach, describe, expect, it } from "vitest"
import { CreatePetUseCase } from "./create-pet.ts"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.ts"
import { OrgsRepository } from "@/repositories/orgs-repositories.ts"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.ts"

let petsRepository: PetsRepository
let orgsRepository: OrgsRepository
let sut: CreatePetUseCase

describe("Create pet use case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it("should be able create pet", async () => {
    const org = await orgsRepository.create({
      coordinatorName: "John Doe",
      email: "johndoe@email.com",
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

    const { pet } = await sut.execute({
      name: "Bob",
      description: null,
      age: "ADULT",
      energyLevel: "MEDIUM",
      environment: "MEDIUM",
      independenceLevel: "MEDIUM",
      orgId: org.id,
      size: "MEDIUM",
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
