import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.ts"
import { FetchPetUseCase } from "../fetch-pet.ts"

export function makeFetchPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetUseCase = new FetchPetUseCase(petsRepository)

  return fetchPetUseCase
}
