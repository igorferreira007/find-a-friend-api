import { OrgsRepository } from "@/repositories/orgs-repositories.ts"
import { PetsRepository } from "@/repositories/pets-repositories.ts"
import { Age, Level, Pet, Size } from "@prisma/client"

interface CreatePetUseCaseRequest {
  name: string
  description: string | null
  age: Age
  size: Size
  energyLevel: Level
  independenceLevel: Level
  environment: Size
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new Error("Organization not found.")
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energyLevel,
      independenceLevel,
      environment,
      orgId,
    })

    return {
      pet,
    }
  }
}
