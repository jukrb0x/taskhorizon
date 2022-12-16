import { Authenticate, Authorize, AuthorizeOptions } from '@tsed/passport';
import { useDecorators } from '@tsed/core';
import { In, Returns, Security } from '@tsed/schema';
import { Unauthorized } from '@tsed/exceptions';

export function JwtAuth(options: AuthorizeOptions = {}) {
    return useDecorators(Authenticate('jwt', options), Security('jwt'), Returns(401, Unauthorized).Description('Unauthorized'));
}
