import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env/index.ts"
import { orgsRoutes } from "./routes/orgs-routes.ts"
import fastifyCookie from "@fastify/cookie"
import { petsRoutes } from "./routes/pets-routes.ts"

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
})

app.register(fastifyCookie)
app.register(orgsRoutes)
app.register(petsRoutes)
