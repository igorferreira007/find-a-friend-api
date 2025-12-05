import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.ts"
import { ResourceNotFoundError } from "@/use-cases/erros/resource-not-found-error.ts"
import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case.ts"
import { GetPetUseCase } from "@/use-cases/get-pet.ts"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    id: z.string(),
  })

  const { id } = paramSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  try {
    const { pet } = await getPetUseCase.execute({ id })

    return { pet }
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send(error.message)
    }

    throw error
  }
}
