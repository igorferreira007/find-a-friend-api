import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.ts"
import { GetPetUseCase } from "../get-pet.ts"

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetUseCase = new GetPetUseCase(petsRepository)

  return getPetUseCase
}
