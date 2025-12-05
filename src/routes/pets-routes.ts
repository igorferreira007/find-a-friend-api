import { createPet } from "@/controllers/pets/create-pet.ts"
import { fetchPet } from "@/controllers/pets/fetch-pet.ts"
import { getPet } from "@/controllers/pets/get-pet.ts"
import { verifyJWT } from "@/middlewares/verifyJWT.ts"
import { FastifyInstance } from "fastify"

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets", { onRequest: [verifyJWT] }, createPet)
  app.get("/:city/pets", fetchPet)
  app.get("/pets/:id", getPet)
}
