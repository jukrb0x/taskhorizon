import { Arg, OnVerify, Protocol } from '@tsed/passport';
import { $log, Req } from '@tsed/common';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { UserService } from '@/services/UserService';
import { Inject } from '@tsed/di';

@Protocol<StrategyOptions>({
    name: 'jwt',
    useStrategy: Strategy,
    settings: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'some-secret',
        issuer: 'accounts.task.horizon',
        audience: 'task.horizon'
    }
})
export class JwtProtocol implements OnVerify {
    @Inject()
    private userService: UserService;

    async $onVerify(@Req() request: Req, @Arg(0) payload: any) {
        $log.info('jwt header', request.header);
        const user = await this.userService.findByUsername(payload.sub);
        return user ? user : false;
    }
}
