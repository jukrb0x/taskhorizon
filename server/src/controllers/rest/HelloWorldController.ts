import { Controller, Inject } from '@tsed/di';
import { Get, In, Security } from '@tsed/schema';
import { TodosRepository, UsersRepository } from '@/repositories';
import { Authorize } from '@tsed/passport';
import { $log, Req } from '@tsed/common';
import { JwtAuth } from '@/decorators/JwtAuth';
import { EventService } from '@/services/EventService';

/**
 * THIS CONTROLLER IS FOR TESTING PURPOSES ONLY
 */
@Controller('/hello-world')
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
    // @Authorize('jwt')
    // @Security('jwt') // what is this
    @JwtAuth()
    async getTodo(@Req() req: Req) {
        $log.info(req);
        const todo = await this.todoRepository.findMany({ where: { id: 1 } }).catch((err) => {
            return err;
        });

        console.log(todo);
        return JSON.stringify(todo);
    }

    @Get('/events/:username')
    async getEventsByUsername(@Req() req: Req) {
        const events = await this.eventService.getEventsByUsername(req.params.username);
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
