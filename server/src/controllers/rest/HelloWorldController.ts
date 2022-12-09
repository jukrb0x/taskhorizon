import { Controller, Inject } from '@tsed/di';
import { Get, In, Security } from '@tsed/schema';
import { TodosRepository, UsersRepository } from '@/repositories';
import { Authorize } from '@tsed/passport';
import { $log, Req } from '@tsed/common';
import { JwtAuth } from '@/decorators/JwtAuth';

@Controller('/hello-world')
export class HelloWorldController {
    @Inject()
    private todoRepository: TodosRepository;

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

    // @Get('/user')
    // async getUser() {
    //     const user = await this.userRepository.findMany({ where: { id: 2 } }).catch((err) => {
    //         return err;
    //     });
    //
    //     return JSON.stringify(user);
    // }
}
