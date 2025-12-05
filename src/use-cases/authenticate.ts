import { OrgsRepository } from "@/repositories/orgs-repositories.ts"
import { InvalidCredentials } from "./erros/invalid-credentials.ts"
import { compare } from "bcryptjs"
import { Org } from "@prisma/client"

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentials()
    }

    const doesPasswordMatches = await compare(password, org.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentials()
    }

    return {
      org,
    }
  }
}
