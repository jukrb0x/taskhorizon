import { Controller, Inject, ProviderScope, Scope } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { BodyParams, HeaderParams } from '@tsed/platform-params';
import { $log, Req } from '@tsed/common';
import { UserResponseModel, UserService } from '@/services/UserService';
import { BadRequest } from '@tsed/exceptions';
import { envs } from '@/config/envs';
import { JwtAuth } from '@/decorators/JwtAuth';
import { extractBearerToken, JwtPayload } from '@/config/jwt';
import jwt from 'jsonwebtoken';
import { UserModel } from '@/models';

@Controller('/auth')
@Scope(ProviderScope.SINGLETON)
export class AuthController {
    @Inject()
    private userService: UserService;

    @Get('/')
    @Get('/user')
    @JwtAuth()
    async getUser(@Req() req: Req): Promise<{ user: UserResponseModel }> {
        const token = extractBearerToken(req);
        if (token) {
            const decoded = jwt.verify(token, envs.JWT_SECRET as string) as JwtPayload;
            if (decoded) {
                $log.info('decoded: ', decoded);
                const user = await this.userService.findByUsername(decoded.username);
                const res = {
                    user: {
                        uid: user.id,
                        username: user.username,
                        email: user.email
                    }
                };
                return res;
            } else {
                throw new BadRequest('Invalid token');
            }
        } else {
            throw new BadRequest('Invalid token');
        }
    }

    @Post('/login')
    login(@Req() req: Req, @BodyParams('username') username: string, @BodyParams('password') password: string) {
        return this.userService.login(username, password);
    }

    @Post('/signup')
    signup(
        @Req() req: Req,
        @BodyParams('username') username: string,
        @BodyParams('email') email: string,
        @BodyParams('password') password: string
    ) {
        return this.userService.signup(username, email, password);
    }

    @Post('/logout')
    logout(@Req() req: Req) {
        const token = extractBearerToken(req);
        $log.info('logout: ', token);
        return true; // jwt client logout
        // TODO: implement logout with a blacklist
        // return this.userService.logout(token);
    }
}
