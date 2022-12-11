import { Inject, Injectable } from '@tsed/di';
import { UsersRepository } from '@/repositories';
import { BadRequest, InternalServerError } from '@tsed/exceptions';
import jwt from 'jsonwebtoken';
import { envs } from '@/config/envs';
import { JwtOptions, jwtSign } from '@/config/jwt';

@Injectable()
export class UserService {
    @Inject()
    private userRepo: UsersRepository;

    checkEmail(email: string) {
        const REG_EMAIL =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

    async signup(username: string, email: string, password: string) {
        await this.checkUserExists(username, email);
        const user = await this.userRepo.create({ data: { email, username, password } });
        // const res = await this.login(username, password) // AUTO LOGIN

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: pwd, updatedAt, createdAt, ...res } = user;
        return res;
    }

    async login(username: string, password: string) {
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
                id: user.id
            });
        }
        return {
            data: { username: user.username, email: user.email, id: user.id },
            token: token
        };
    }

    async logout(token: string) {
        // TODO: implement logout with a blacklist
        const decoded = await jwt.verify(token, envs.JWT_SECRET as string);
        if (decoded) {
            return true;
        } else {
            throw new InternalServerError('Invalid token');
        }
    }
}
