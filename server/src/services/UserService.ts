import { Inject, Injectable } from '@tsed/di';
import { TodoCategoriesRepository, TodosRepository, UsersRepository } from '@/repositories';
import { BadRequest, InternalServerError } from '@tsed/exceptions';
import jwt from 'jsonwebtoken';
import { envs } from '@/config/envs';
import { getJwtSecret, jwtSign } from '@/config/jwt';
import { UserModel } from '@/models';
import { REG_EMAIL } from '@/utils/regex';
import { UUID64 } from '@/utils/uuid';

export interface UserResponseModel {
    uid: number;
    username: string;
    email: string;
}

@Injectable()
export class UserService {
    @Inject()
    private userRepo: UsersRepository;

    @Inject()
    private todoCategoriesRepo: TodoCategoriesRepository;

    @Inject()
    private todosRepo: TodosRepository;

    checkEmail(email: string) {
        if (REG_EMAIL.test(email)) {
            return Promise.resolve(true);
        } else {
            throw new Error('Invalid email');
        }
    }

    async checkUserExists(username: string, email: string) {
        this.checkEmail(email).catch((e) => {
            throw new BadRequest(e.message);
        });
        const byUsername = await this.userRepo.findUnique({ where: { username: username } });
        const byEmail = await this.userRepo.findUnique({ where: { email: email } });
        if (byUsername !== null || byEmail !== null) {
            throw new BadRequest('User already exists');
        }
    }

    async findByUsername(username: string) {
        const user = await this.userRepo.findUnique({ where: { username: username } });
        if (user === null) {
            throw new BadRequest('User not found');
        }
        return user;
    }

    async signup(username: string, email: string, password: string): Promise<UserResponseModel> {
        await this.checkUserExists(username, email);
        const user = await this.userRepo.create({ data: { email, username, password } });
        if (user) {
            await this.initialize(user);
            return {
                uid: user.id,
                username: user.username,
                email: user.email
            };
        } else {
            throw new InternalServerError('Creating user failed.');
        }
    }

    async initialize(user: UserModel) {
        // const user = await this.userRepo.findUnique({ where: { username: username } });
        if (user === null) {
            throw new InternalServerError('User not found, Error in initialization');
        }
        await this.todoCategoriesRepo.create({
            data: {
                name: 'Default',
                uuid: `default-category:${user.username}`,
                User: { connect: { id: user.id } }
            }
        });

        await this.todosRepo.create({
            data: {
                title: 'Welcome to TaskHorizon',
                uuid: UUID64() + `-todo:${user.username}`,
                completed: false,
                User: { connect: { id: user.id } },
                Category: {
                    connect: {
                        uuid: `default-category:${user.username}`
                    }
                }
            },
            include: { Category: true, LinkedEvents: true }
        });

        await this.todosRepo.create({
            data: {
                title: 'Drag me to calendar to create an event',
                uuid: UUID64() + `-todo:${user.username}`,
                completed: false,
                User: { connect: { id: user.id } },
                Category: {
                    connect: {
                        uuid: `default-category:${user.username}`
                    }
                }
            },
            include: { Category: true, LinkedEvents: true }
        });

        return user;
    }

    async login(username: string, password: string): Promise<{ user: UserResponseModel; token: string }> {
        const user = await this.userRepo.findUnique({ where: { username: username } });

        let token: string;
        if (user === null) {
            throw new BadRequest('User not found');
        } else if (user.password !== password) {
            throw new BadRequest('Incorrect password');
        } else {
            token = jwtSign({
                username: user.username,
                email: user.email,
                uid: user.id
            });
        }
        return {
            user: { username: user.username, email: user.email, uid: user.id },
            token: token
        };
    }

    async logout(token: string) {
        // TODO: implement logout with a blacklist
        const decoded = await jwt.verify(token, getJwtSecret());
        if (decoded) {
            return true;
        } else {
            throw new InternalServerError('Invalid token');
        }
    }

    // TODO
    uploadAvatar(username: string, avatar: string) {
        // return Promise.resolve(undefined);
    }
}
