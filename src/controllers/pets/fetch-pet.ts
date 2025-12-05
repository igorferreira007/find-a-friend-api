import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.ts"
import { makeFetchPetUseCase } from "@/use-cases/factories/make-fetch-pet-use-case.ts"
import { FetchPetUseCase } from "@/use-cases/fetch-pet.ts"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function fetchPet(request: FastifyRequest, reply: FastifyReply) {
  const paramSchema = z.object({
    city: z.string(),
  })

  const querySchema = z.object({
    age: z
      .string()
      .transform((value) => value.toUpperCase())
      .pipe(z.enum(["PUPPY", "ADULT", "SENIOR"]))
      .optional(),

    size: z
      .string()
      .transform((value) => value.toUpperCase())
      .pipe(z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]))
      .optional(),

    energyLevel: z
      .string()
      .transform((value) => value.toUpperCase())
      .pipe(z.enum(["MEDIUM", "LOW", "HIGH"]))
      .optional(),

    independenceLevel: z
      .string()
      .transform((value) => value.toUpperCase())
      .pipe(z.enum(["MEDIUM", "LOW", "HIGH"]))
      .optional(),

    environment: z
      .string()
      .transform((value) => value.toUpperCase())
      .pipe(z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]))
      .optional(),
  })

  const { city } = paramSchema.parse(request.params)
  const { age, size, energyLevel, independenceLevel, environment } =
    querySchema.parse(request.query)

  const fetchPetUseCase = makeFetchPetUseCase()

  const { pets } = await fetchPetUseCase.execute({
    city,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
  })

  return { pets }
}
