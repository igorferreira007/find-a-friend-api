import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.ts"
import { CreateOrgUseCase } from "./create-org.ts"
import { OrgAlreadyExistsError } from "./erros/org-already-exists-error.ts"

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe("Create org use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it("should be able to create org", async () => {
    const { org } = await sut.execute({
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

    expect(org.id).toEqual(expect.any(String))
  })

  it("should not be able to create org", async () => {
    await sut.execute({
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

    await expect(() =>
      sut.execute({
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
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
