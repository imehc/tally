import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const main = async () => {
  // ... you will write your Prisma Client queries here
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
