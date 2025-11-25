import { beforeEach, describe, expect, it } from "vitest"
import { OrgsRepository } from "@/repositories/orgs-repositories.ts"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.ts"
import { CreateOrgUseCase } from "./create-org.ts"

let orgsRepository: OrgsRepository
let sut: CreateOrgUseCase

describe("Create org use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it("should be able to create org", async () => {
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

    expect(org.id).toEqual(expect.any(String))
  })
})
