import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case.ts"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    coordinatorName: z.string(),
    email: z.email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const {
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
  } = bodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  await createOrgUseCase.execute({
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
  })

  return reply.status(201).send()
}
