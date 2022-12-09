import { Controller, Inject } from '@tsed/di';
import { Get } from '@tsed/schema';
import { TodosRepository, UsersRepository } from '@/repositories';
import { Authorize } from '@tsed/passport';

@Controller('/hello-world')
export class HelloWorldController {
    // private todoRepository = new PrismaClient().todo;
    @Inject()
    private todoRepository: TodosRepository;

    @Get('/')
    get() {
        return 'hello';
    }

    @Get('/todo')
    // @Authorize()
    async getTodo() {
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
