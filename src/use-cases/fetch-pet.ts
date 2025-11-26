import { OrgsRepository } from "@/repositories/orgs-repositories.ts"
import { PetsRepository } from "@/repositories/pets-repositories.ts"
import { Age, Level, Pet, Size } from "@prisma/client"

interface FetchPetUseCaseRequest {
  city: string
  age?: Age
  size?: Size
  energyLevel?: Level
  independenceLevel?: Level
  environment?: Size
}

interface FetchPetUseCaseResponse {
  pets: Pet[]
}

export class FetchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
  }: FetchPetUseCaseRequest): Promise<FetchPetUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
    })

    return { pets }
  }
}
