import { prisma } from "@/lib/prisma.ts"
import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: "Find a friend",
      coordinatorName: "John Doe",
      email: "org-01@email.com",
      password: await hash("123456", 6),
      whatsapp: "00000000000",
      cep: "12220-610",
      state: "SP",
      city: "São José dos Campos",
      neighborhood: "Vila Tatetuba",
      street: "Rua 01",
      latitude: -23.21853715183315,
      longitude: -45.808786372274426,
    },
  })

  const response = await request(app.server).post("/sessions").send({
    email: "org-01@email.com",
    password: "123456",
  })

  const { token } = response.body

  return { token }
}
