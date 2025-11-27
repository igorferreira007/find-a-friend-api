import { OrgsRepository } from "@/repositories/orgs-repositories.ts"
import { Org } from "@prisma/client"
import { OrgAlreadyExistsError } from "./erros/org-already-exists-error.ts"
import { hash } from "bcryptjs"

interface CreateOrgUseCaseRequest {
  name: string
  coordinatorName: string
  email: string
  password: string
  whatsapp: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    coordinatorName,
    email,
    password,
    whatsapp,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      coordinatorName,
      email,
      password: passwordHash,
      whatsapp,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return {
      org,
    }
  }
}
