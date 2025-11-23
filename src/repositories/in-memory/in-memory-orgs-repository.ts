import { Org, Prisma } from "@prisma/client"
import { OrgsRepository } from "../orgs-repositories.ts"
import { randomUUID } from "node:crypto"

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((org) => org.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = {
      id: randomUUID(),
      coordinatorName: data.coordinatorName,
      email: data.email,
      password: data.password,
      whatsapp: data.whatsapp,
      cep: data.cep,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }
}
