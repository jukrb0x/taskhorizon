import { Arg, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { BasicStrategy } from 'passport-http';
import { Strategy } from 'passport';
import { $log, Req } from '@tsed/common';
import { UsersRepository } from '@/repositories';
import { Inject } from '@tsed/di';

@Protocol({
    name: 'basic',
    useStrategy: BasicStrategy,
    settings: {}
})
export class BasicProtocol implements OnVerify, OnInstall {
    @Inject()
    private useRepo: UsersRepository;

    async $onVerify(@Req() request: Req, @Arg(0) username: string, @Arg(1) password: string) {
        // checkEmail(username);

        // we need to make a user service since there is other stuff we need to do

        $log.info({ username, password });
        const user = await this.useRepo.findUnique({ where: { username: username } });
        $log.info(user);

        if (!user) {
            $log.error('not found user');
            return false;
        }

        return user.password === password;
    }

    $onInstall(strategy: Strategy): void {
        // intercept the strategy instance to adding extra configuration
    }
}
