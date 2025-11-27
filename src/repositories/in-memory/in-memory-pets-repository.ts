import { Pet, Prisma } from "@prisma/client"
import { FindAllParams, PetsRepository } from "../pets-repositories.ts"
import { randomUUID } from "node:crypto"
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository.ts"

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((pet) => pet.id === id) ?? null
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city
    )

    const pets = this.items
      .filter((pet) => orgsByCity.some((org) => org.id === pet.orgId))
      .filter((pet) => (params.age ? pet.age === params.age : true))
      .filter((pet) => (params.size ? pet.size === params.size : true))
      .filter((pet) =>
        params.energyLevel ? pet.energyLevel === params.energyLevel : true
      )
      .filter((pet) =>
        params.independenceLevel
          ? pet.independenceLevel === params.independenceLevel
          : true
      )
      .filter((pet) =>
        params.environment ? pet.environment === params.environment : true
      )

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      age: data.age,
      size: data.size,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      environment: data.environment,
      orgId: data.orgId,
    }

    this.items.push(pet)

    return pet
  }
}
