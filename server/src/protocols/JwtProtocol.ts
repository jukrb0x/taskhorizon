import { Arg, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { $log, Req } from '@tsed/common';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { UserService } from '@/services/UserService';
import { Inject } from '@tsed/di';
import { envs } from '@/config/envs';
import { getJwtSecret, JwtOptions, JwtPayload } from '@/config/jwt';

console.log('JwtOptions', JwtOptions);

@Protocol<StrategyOptions>({
    name: 'jwt',
    useStrategy: Strategy,
    settings: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: getJwtSecret(),
        jsonWebTokenOptions: JwtOptions
    }
})
export class JwtProtocol implements OnVerify {
    @Inject()
    private userService: UserService;

    async $onVerify(@Req() request: Req, @Arg(0) payload: JwtPayload) {
        const user = await this.userService.findByUsername(payload.username);
        return user ? user : false;
    }
}
