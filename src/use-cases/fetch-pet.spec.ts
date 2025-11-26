import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.ts"
import { FetchPetUseCase } from "./fetch-pet.ts"
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.ts"

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FetchPetUseCase

describe("Fetch pets use case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new FetchPetUseCase(petsRepository)
  })

  it("should be able to fetch pets in a city", async () => {
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

    await orgsRepository.create({
      id: "org-02",
      name: "Org two",
      coordinatorName: "John Doe",
      email: "orgtwo@email.com",
      password: "123456",
      whatsapp: "00000000000",
      cep: "12220-610",
      state: "SP",
      city: "São Paulo",
      neighborhood: "Vila Tatetuba",
      street: "Rua 01",
      latitude: -23.21853715183315,
      longitude: -45.808786372274426,
    })

    for (let index = 1; index <= 2; index++) {
      petsRepository.items.push({
        id: `pet-0${index}`,
        name: "Bob",
        description: null,
        age: "ADULT",
        energyLevel: "MEDIUM",
        environment: "MEDIUM",
        independenceLevel: "MEDIUM",
        orgId: "org-01",
        size: "MEDIUM",
      })
    }

    petsRepository.items.push({
      id: "pet-03",
      name: "Bob",
      description: null,
      age: "ADULT",
      energyLevel: "MEDIUM",
      environment: "MEDIUM",
      independenceLevel: "MEDIUM",
      orgId: "org-02",
      size: "MEDIUM",
    })

    const { pets } = await sut.execute({
      city: "São José dos Campos",
    })

    expect(pets.length).toEqual(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-01" }),
      expect.objectContaining({ id: "pet-02" }),
    ])
  })

  it("should be able to fetch pets in a city with an age filter", async () => {
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

    petsRepository.items.push({
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

    petsRepository.items.push({
      id: "pet-02",
      name: "Bob",
      description: null,
      age: "PUPPY",
      energyLevel: "MEDIUM",
      environment: "MEDIUM",
      independenceLevel: "MEDIUM",
      orgId: "org-01",
      size: "MEDIUM",
    })

    const { pets } = await sut.execute({
      city: "São José dos Campos",
      age: "ADULT",
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-01", age: "ADULT" }),
    ])
  })

  it("should be able to fetch pets in a city with an energy level filter", async () => {
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

    petsRepository.items.push({
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

    petsRepository.items.push({
      id: "pet-02",
      name: "Bob",
      description: null,
      age: "PUPPY",
      energyLevel: "HIGH",
      environment: "MEDIUM",
      independenceLevel: "MEDIUM",
      orgId: "org-01",
      size: "MEDIUM",
    })

    const { pets } = await sut.execute({
      city: "São José dos Campos",
      energyLevel: "MEDIUM",
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-01", energyLevel: "MEDIUM" }),
    ])
  })

  it("should be able to fetch pets in a city with an environment filter", async () => {
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

    petsRepository.items.push({
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

    petsRepository.items.push({
      id: "pet-02",
      name: "Bob",
      description: null,
      age: "PUPPY",
      energyLevel: "HIGH",
      environment: "EXTRA_LARGE",
      independenceLevel: "MEDIUM",
      orgId: "org-01",
      size: "MEDIUM",
    })

    const { pets } = await sut.execute({
      city: "São José dos Campos",
      environment: "MEDIUM",
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-01", environment: "MEDIUM" }),
    ])
  })

  it("should be able to fetch pets in a city with an independence level filter", async () => {
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

    petsRepository.items.push({
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

    petsRepository.items.push({
      id: "pet-02",
      name: "Bob",
      description: null,
      age: "PUPPY",
      energyLevel: "HIGH",
      environment: "EXTRA_LARGE",
      independenceLevel: "HIGH",
      orgId: "org-01",
      size: "MEDIUM",
    })

    const { pets } = await sut.execute({
      city: "São José dos Campos",
      independenceLevel: "MEDIUM",
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-01", independenceLevel: "MEDIUM" }),
    ])
  })

  it("should be able to fetch pets in a city with an size filter", async () => {
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

    petsRepository.items.push({
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

    petsRepository.items.push({
      id: "pet-02",
      name: "Bob",
      description: null,
      age: "PUPPY",
      energyLevel: "HIGH",
      environment: "EXTRA_LARGE",
      independenceLevel: "HIGH",
      orgId: "org-01",
      size: "EXTRA_LARGE",
    })

    const { pets } = await sut.execute({
      city: "São José dos Campos",
      size: "MEDIUM",
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-01", size: "MEDIUM" }),
    ])
  })

  it("should be able to fetch pets in a city using all the filters", async () => {
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

    await orgsRepository.create({
      id: "org-02",
      name: "Org two",
      coordinatorName: "John Doe",
      email: "orgtwo@email.com",
      password: "123456",
      whatsapp: "00000000000",
      cep: "12220-610",
      state: "SP",
      city: "São Paulo",
      neighborhood: "Vila Tatetuba",
      street: "Rua 01",
      latitude: -23.21853715183315,
      longitude: -45.808786372274426,
    })

    petsRepository.items.push({
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

    petsRepository.items.push({
      id: "pet-02",
      name: "Bob",
      description: null,
      age: "PUPPY",
      energyLevel: "HIGH",
      environment: "EXTRA_LARGE",
      independenceLevel: "HIGH",
      orgId: "org-02",
      size: "EXTRA_LARGE",
    })

    const { pets } = await sut.execute({
      city: "São Paulo",
      age: "PUPPY",
      energyLevel: "HIGH",
      environment: "EXTRA_LARGE",
      independenceLevel: "HIGH",
      size: "EXTRA_LARGE",
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({
        id: "pet-02",
        age: "PUPPY",
        energyLevel: "HIGH",
        environment: "EXTRA_LARGE",
        independenceLevel: "HIGH",
        size: "EXTRA_LARGE",
      }),
    ])
  })
})
