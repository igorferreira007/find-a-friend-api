import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.ts"
import { beforeAll, beforeEach, describe, expect, it } from "vitest"
import { AuthenticateUseCase } from "./authenticate.ts"
import { hash } from "bcryptjs"
import { InvalidCredentials } from "./erros/invalid-credentials.ts"

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe("Authenticate use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it("should be able search org", async () => {
    await orgsRepository.create({
      name: "Find a friend",
      coordinatorName: "John Doe",
      email: "org-01@email.com",
      password: await hash("123456", 6),
      whatsapp: "00000000000",
      cep: "12220-610",
      state: "SP",
      city: "São José dos Campos",
      neighborhood: "Vila Tatetuba",
      street: "Rua 01",
      latitude: -23.21853715183315,
      longitude: -45.808786372274426,
    })

    const { org } = await sut.execute({
      email: "org-01@email.com",
      password: "123456",
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it("should not be able search org with wrong email", async () => {
    await orgsRepository.create({
      name: "Find a friend",
      coordinatorName: "John Doe",
      email: "org-01@email.com",
      password: await hash("123456", 6),
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
        email: "wrong@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })

  it("should not be able search org with wrong password", async () => {
    await orgsRepository.create({
      name: "Find a friend",
      coordinatorName: "John Doe",
      email: "org-01@email.com",
      password: await hash("123456", 6),
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
        email: "org-01@email.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
