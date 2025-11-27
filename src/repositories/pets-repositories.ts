import { Age, Level, Pet, Prisma, Size } from "@prisma/client"

export interface FindAllParams {
  city: string
  age?: Age
  size?: Size
  energyLevel?: Level
  independenceLevel?: Level
  environment?: Size
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findAll(params: FindAllParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
