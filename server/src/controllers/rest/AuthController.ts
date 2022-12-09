import { Controller } from '@tsed/di';
import { Post } from '@tsed/schema';

@Controller('/auth')
export class AuthController {
    @Post('/login')
    login() {
        //
    }
}
