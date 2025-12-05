import { prisma } from "@/lib/prisma.ts"

export async function createOrgsAndPets(firstCity: string, secondCity: string) {
  await prisma.org.createMany({
    data: [
      {
        name: "Org-01",
        coordinatorName: "John Doe",
        email: "org-01@email.com",
        password: "123456",
        whatsapp: "00000000000",
        cep: "12220-610",
        state: "SP",
        city: firstCity,
        neighborhood: "Vila Tatetuba",
        street: "Rua 01",
        latitude: -23.21853715183315,
        longitude: -45.808786372274426,
      },
      {
        name: "Org-02",
        coordinatorName: "John Doe",
        email: "org-02@email.com",
        password: "123456",
        whatsapp: "00000000000",
        cep: "12220-610",
        state: "SP",
        city: secondCity,
        neighborhood: "Vila Tatetuba",
        street: "Rua 01",
        latitude: -22.5293919,
        longitude: -44.1010065,
      },
    ],
  })

  const orgs = await prisma.org.findMany({ orderBy: { name: "asc" } })

  await prisma.pet.createMany({
    data: [
      {
        name: "Pet 01",
        description: null,
        age: "ADULT",
        energyLevel: "MEDIUM",
        environment: "MEDIUM",
        independenceLevel: "MEDIUM",
        orgId: orgs[0].id,
        size: "MEDIUM",
      },
      {
        name: "Pet 02",
        description: null,
        age: "PUPPY",
        energyLevel: "HIGH",
        environment: "MEDIUM",
        independenceLevel: "MEDIUM",
        orgId: orgs[0].id,
        size: "MEDIUM",
      },
      {
        name: "Pet 03",
        description: null,
        age: "PUPPY",
        energyLevel: "MEDIUM",
        environment: "EXTRA_LARGE",
        independenceLevel: "MEDIUM",
        orgId: orgs[0].id,
        size: "MEDIUM",
      },
      {
        name: "Pet 04",
        description: null,
        age: "PUPPY",
        energyLevel: "MEDIUM",
        environment: "MEDIUM",
        independenceLevel: "HIGH",
        orgId: orgs[0].id,
        size: "MEDIUM",
      },
      {
        name: "Pet 05",
        description: null,
        age: "PUPPY",
        energyLevel: "MEDIUM",
        environment: "MEDIUM",
        independenceLevel: "MEDIUM",
        orgId: orgs[1].id,
        size: "LARGE",
      },
    ],
  })
}
