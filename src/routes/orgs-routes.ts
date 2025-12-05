import { authenticate } from "@/controllers/orgs/authenticate.ts"
import { createOrg } from "@/controllers/orgs/create-org.ts"
import { refresh } from "@/controllers/orgs/refresh.ts"
import { FastifyInstance } from "fastify"

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrg)
  app.post("/sessions", authenticate)
  app.patch("/token/refresh", refresh)
}
