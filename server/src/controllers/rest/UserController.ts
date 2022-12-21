import { Controller, Inject, ProviderScope, Scope } from '@tsed/di';
import { Email, Get, MaxLength, MinLength, Post } from '@tsed/schema';
import { BodyParams } from '@tsed/platform-params';
import { $log, MultipartFile, PlatformMulterFile, Req } from '@tsed/common';
import { UserResponseModel, UserService } from '@/services/UserService';
import { BadRequest } from '@tsed/exceptions';
import { JwtAuth } from '@/decorators/JwtAuth';
import { extractBearerToken, extractJwtPayload } from '@/config/jwt';

@Controller('/user')
@Scope(ProviderScope.SINGLETON)
export class UserController {
    @Inject()
    private userService: UserService;

    @Get('/')
    @Get('/me')
    @JwtAuth()
    async getUser(@Req() req: Req): Promise<{ user: UserResponseModel }> {
        const payload = extractJwtPayload(req);
        if (payload) {
            const user = await this.userService.findByUsername(payload.username);
            return {
                user: {
                    uid: user.id,
                    username: user.username,
                    email: user.email
                }
            };
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
        @BodyParams('username') @MinLength(4) @MaxLength(15) username: string,
        @BodyParams('email') @Email() email: string,
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

    // ---------
    // User Profile Settings
    // ---------

    // TODO
    // @Post('/upload/avatar')
    async uploadAvatar(@MultipartFile('file') image: PlatformMulterFile) {
        //         return this.userService.uploadAvatar(payload.username, avatar);
    }
}
