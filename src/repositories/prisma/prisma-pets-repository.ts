import { Pet, Prisma } from "@prisma/client"
import { FindAllParams, PetsRepository } from "../pets-repositories.ts"
import { prisma } from "@/lib/prisma.ts"

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: params.city,
        },
        ...(params.age && { age: params.age }),
        ...(params.size && { size: params.size }),
        ...(params.energyLevel && { energyLevel: params.energyLevel }),
        ...(params.independenceLevel && {
          independenceLevel: params.independenceLevel,
        }),
        ...(params.environment && { environment: params.environment }),
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
