import { OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { BasicStrategy } from 'passport-http';

@Protocol({
    name: 'basic',
    useStrategy: BasicStrategy,
    settings: {}
})
export class BasicProtocol implements OnVerify, OnInstall {}
