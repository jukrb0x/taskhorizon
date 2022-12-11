import { Controller, Inject, ProviderScope, Scope } from '@tsed/di';
import { Post } from '@tsed/schema';
import { BodyParams } from '@tsed/platform-params';
import { $log, Req } from '@tsed/common';
import { UserService } from '@/services/UserService';
import { BadRequest } from '@tsed/exceptions';

@Controller('/auth')
@Scope(ProviderScope.SINGLETON)
export class AuthController {
    @Inject()
    private userService: UserService;

    @Post('/login')
    login(@Req() req: Req, @BodyParams('email') email: string, @BodyParams('password') password: string) {
        return this.userService.login(email, password);
    }

    @Post('/signup')
    register(
        @Req() req: Req,
        @BodyParams('username') username: string,
        @BodyParams('email') email: string,
        @BodyParams('password') password: string
    ) {
        return this.userService.signup(username, email, password);
    }

    @Post('/logout')
    logout(@Req() req: Req, @BodyParams('token') token: string) {
        $log.info('logout: ', token);
        return true; // jwt logout
        // return this.userService.logout(token);
    }
}
