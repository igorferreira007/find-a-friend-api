import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case.ts"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    age: z.enum(["PUPPY", "ADULT", "SENIOR"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]),
    energyLevel: z.enum(["MEDIUM", "LOW", "HIGH"]),
    independenceLevel: z.enum(["MEDIUM", "LOW", "HIGH"]),
    environment: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]),
  })

  const {
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
  } = bodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    orgId: request.user.sub,
  })

  return reply.status(201).send()
}
