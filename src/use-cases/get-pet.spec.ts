import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.ts"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.ts"
import { GetPetUseCase } from "./get-pet.ts"
import { ResourceNotFoundError } from "./erros/resource-not-found-error.ts"

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetUseCase

describe("Get pet use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it("should be able to get a new pet", async () => {
    await orgsRepository.create({
      id: "org-01",
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

    await petsRepository.create({
      id: "pet-01",
      name: "Bob",
      description: null,
      age: "ADULT",
      energyLevel: "MEDIUM",
      environment: "MEDIUM",
      independenceLevel: "MEDIUM",
      orgId: "org-01",
      size: "MEDIUM",
    })

    const { pet } = await sut.execute({ id: "pet-01" })

    expect(pet.id).toEqual(expect.any(String))
  })

  it("should not be able to get a new pet", async () => {
    await expect(() => sut.execute({ id: "pet-01" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    )
  })
})
