import { beforeEach, describe, expect, it } from "vitest"
import { CreatePetUseCase } from "./create-pet.ts"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.ts"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.ts"
import { ResourceNotFoundError } from "./erros/resource-not-found-error.ts"

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe("Create pet use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it("should be able to create pet", async () => {
    const org = await orgsRepository.create({
      name: "Find a friend",
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

  it("should not be able to create pet if the org does not exist", async () => {
    await expect(() =>
      sut.execute({
        name: "Bob",
        description: null,
        age: "ADULT",
        energyLevel: "MEDIUM",
        environment: "MEDIUM",
        independenceLevel: "MEDIUM",
        orgId: "org-01",
        size: "MEDIUM",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
