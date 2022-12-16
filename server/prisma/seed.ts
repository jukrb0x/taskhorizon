import { PrismaClient, Prisma } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
    {
        username: 'Alice',
        email: 'alice@a.com',
        password: 'alice'
    },
    {
        username: 'Bob',
        email: 'bob@b.com',
        password: 'bob'
    }
];

const todos: Prisma.TodoCreateInput[] = [
    {
        uuid: 'seeding-todo-1',
        title: 'Prisma makes databases easy',
        completed: false,
        User: {
            connect: {
                email: 'alice@a.com'
            }
        },
        Category: {
            connectOrCreate: {
                where: {
                    uuid: 'default-category:Alice'
                },
                create: {
                    name: 'Work',
                    uuid: 'default-category:Alice',
                    User: {
                        connect: {
                            email: 'alice@a.com'
                        }
                    }
                }
            }
        }
    },
    {
        uuid: 'seeding-todo-2',
        title: 'Jabriel is a great wizard',
        completed: false,
        User: {
            connect: {
                email: 'bob@b.com'
            }
        },
        Category: {
            connectOrCreate: {
                where: {
                    uuid: 'default-category:Bob'
                },
                create: {
                    name: 'Default',
                    uuid: 'default-category:Bob',
                    User: {
                        connect: {
                            email: 'bob@b.com'
                        }
                    }
                }
            }
        }
    }
];

const events: Prisma.EventCreateInput[] = [
    {
        uuid: 'seeding-event-1',
        title: 'Jabriel is a great wizard',
        start: new Date(),
        end: new Date(),
        description: 'haha',
        allDay: false,
        completed: false,
        LinkedTodos: {
            connect: {
                uuid: 'seeding-todo-2'
            }
        },
        User: {
            connect: {
                email: 'bob@b.com'
            }
        }
    }
];

async function main() {
    for (const user of users) {
        const newUser = await prisma.user.create({
            data: user
        });
        console.log(`Created new user: ${newUser.username} (ID: ${newUser.id})`);
    }

    for (const todo of todos) {
        const newTodo = await prisma.todo.create({
            data: todo
        });
        console.log(`Created new todo: ${newTodo.title} (ID: ${newTodo.id})`);
    }

    for (const event of events) {
        const newEvent = await prisma.event.create({
            data: event
        });
        console.log(`Created new event: ${newEvent.title} (ID: ${newEvent.id})`);
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
