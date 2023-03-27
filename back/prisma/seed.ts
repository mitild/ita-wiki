import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/helpers/passwordHash'
import { UserSchema } from '../src/schemas/UserSchema'

const prisma = new PrismaClient()

async function main() {
  const data = {
    email: 'test@example.com',
    password: await hashPassword('password'),
    name: 'Test User',
    dni: '45632452a',
    status: 'ACTIVE'
  }
  const UserSeedSchema = UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
  })

  const validatedData = UserSeedSchema.parse(data)

  const user = await prisma.user.create({
    data: validatedData
  })
  console.log(user)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
