import { Inject, Injectable } from '@tsed/di';
import { UsersRepository } from '@/repositories';
import { $log } from '@tsed/common';
import { BadRequest } from '@tsed/exceptions';

@Injectable()
export class UserService {
    @Inject()
    private userRepo: UsersRepository;

    checkEmail(email: string) {
        const REG_EMAIL =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (REG_EMAIL.test(email)) {
            return true;
        } else {
            throw new Error('Invalid email');
        }
    }

    async checkUserExists(username: string, email: string) {
        this.checkEmail(email);
        const byUsername = await this.userRepo.findUnique({ where: { username: username } });
        const byEmail = await this.userRepo.findUnique({ where: { email: email } });
        return byUsername !== null || byEmail !== null;
    }

    async findByUsername(username: string) {
        const user = await this.userRepo.findUnique({ where: { username: username } });
        if (user === null) {
            throw new BadRequest('User not found');
        }
        return user;
    }

    async register(username: string, email: string, password: string) {
        const userExists = await this.checkUserExists(username, email);
        if (userExists) {
            throw new BadRequest('User already exists');
        }
        const user = await this.userRepo.create({ data: { email, username, password } });
        return user;
    }

    async login(username: string, password: string) {
        const user = await this.userRepo.findUnique({ where: { username: username } });
        if (user === null) {
            throw new BadRequest('User not found');
        }
        if (user.password !== password) {
            throw new BadRequest('Incorrect password');
        }
        return user;
    }
}