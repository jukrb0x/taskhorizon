import { Arg, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { BasicStrategy } from 'passport-http';
import { Strategy } from 'passport';
import { $log, Req } from '@tsed/common';
import { UsersRepository } from '@/repositories';
import { Inject } from '@tsed/di';
import { UserService } from '@/services/UserService';

@Protocol({
    name: 'basic',
    useStrategy: BasicStrategy,
    settings: {}
})
export class BasicProtocol implements OnVerify, OnInstall {
    // this will not be used, just for testing

    @Inject()
    private userService: UserService;

    async $onVerify(@Req() request: Req, @Arg(0) username: string, @Arg(1) password: string) {
        return await this.userService
            .login(username, password)
            .then((r) => {
                if (r) {
                    return r;
                }
            })
            .catch((e) => {
                $log.error(e);
                return false;
            });
    }

    $onInstall(strategy: Strategy): void {
        // intercept the strategy instance to adding extra configuration
    }
}
