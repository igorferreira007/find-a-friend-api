import fastify from "fastify"
import { PrismaClient } from "@prisma/client"

export const app = fastify()

const prisma = new PrismaClient()

app.get("/", (_, reply) => {
  reply.status(200).send({ message: "Hello World!" })
})
