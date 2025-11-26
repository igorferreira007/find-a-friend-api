import { Org, Prisma } from "@prisma/client"
import { OrgsRepository } from "../orgs-repositories.ts"
import { randomUUID } from "node:crypto"

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string): Promise<Org | null> {
    return this.items.find((org) => org.id === id) ?? null
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((org) => org.email === email) ?? null
  }

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
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
