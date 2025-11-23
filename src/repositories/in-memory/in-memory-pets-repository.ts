import { Pet, Prisma } from "@prisma/client"
import { PetsRepository } from "../pets-repositories.ts"
import { randomUUID } from "node:crypto"

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
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
