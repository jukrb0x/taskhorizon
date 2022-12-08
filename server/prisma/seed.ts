import { PrismaClient, Prisma } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
    {
        name: 'Alice',
        email: 'alice@a.com'
    },
    {
        name: 'Bob',
        email: 'bob@b.com'
    }
];

async function main() {
    for (const user of users) {
        const newUser = await prisma.user.create({
            data: user
        });
        console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
    }
    console.log('Seeding is Done.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });