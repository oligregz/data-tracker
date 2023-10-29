import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import { z } from "zod"

const app = fastify()

const prisma = new PrismaClient();

app.get('/users', async (_response, reply) => {
  const users = await prisma.user.findMany()

  if (users.length === 0) {
    return {
      message: "Users not found !",
      status_req: false,
      users
    }
  }

  return reply.status(201).send({
    message: "Users not found !",
    status_req: true,
    users
  })
})

app.post('/users', async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    telephone: z.string(),
  })

  const { name, email, telephone } = createUserSchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      telephone,
    }
  })

  return reply.status(201).send();
});

app.delete('/users/:id', async () => {})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
}).then((port) => {
  console.log(`HTTP server running on port ${port}`)
});