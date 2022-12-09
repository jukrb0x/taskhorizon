import { Controller, ProviderScope, Scope } from '@tsed/di';
import { Post } from '@tsed/schema';
import { BodyParams } from '@tsed/platform-params';
import { Req } from '@tsed/common';

@Controller('/auth')
@Scope(ProviderScope.SINGLETON)
export class AuthController {
    @Post('/login')
    login(@Req() req: Req, @BodyParams('email') email: string, @BodyParams('password') password: string) {
        console.log(req.user);
        return { email, password };
    }

    @Post('/signup')
    register(@Req() req: Req, @BodyParams('email') email: string, @BodyParams('password') password: string) {
        return { email, password };
    }
}
