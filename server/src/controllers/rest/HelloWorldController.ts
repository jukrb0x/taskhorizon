import { Controller, Inject } from '@tsed/di';
import { Get, In, Security } from '@tsed/schema';
import { TodosRepository, UsersRepository } from '@/repositories';
import { $log, PathParams, Req } from '@tsed/common';
import { JwtAuth } from '@/decorators/JwtAuth';
import { EventService } from '@/services/EventService';
import { BadRequest } from '@tsed/exceptions';

/**
 * THIS CONTROLLER IS FOR TESTING PURPOSES ONLY
 */
// @Controller('/hello-world')
export class HelloWorldController {
    @Inject()
    private todoRepository: TodosRepository;

    @Inject()
    private eventService: EventService;

    @Get('/')
    get() {
        return 'hello';
    }

    @Get('/todo')
    @JwtAuth()
    async getTodo(@Req() req: Req) {
        const todo = await this.todoRepository.findMany({ where: { id: 1 } }).catch((err) => {
            throw new BadRequest(err.message);
        });
        const res = { todo: todo, reqBody: req.headers };

        return res;
    }

    @Get('/events/:username')
    async getEventsByUsername(@Req() req: Req, @PathParams('username') username: string) {
        const events = await this.eventService.getEventsByUsername(username);
        return events;
    }

    // @Get('/user')
    // async getUser() {
    //     const user = await this.userRepository.findMany({ where: { id: 2 } }).catch((err) => {
    //         return err;
    //     });
    //
    //     return JSON.stringify(user);
    // }
}
