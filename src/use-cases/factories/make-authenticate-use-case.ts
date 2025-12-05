import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository.ts"
import { AuthenticateUseCase } from "../authenticate.ts"

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(orgsRepository)

  return authenticateUseCase
}
