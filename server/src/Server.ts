import { join } from 'path';
import { Configuration, Inject, Injectable } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import '@tsed/ajv';
import '@tsed/swagger';
import { config } from './config';
import * as rest from './controllers/rest/index';
import * as pages from './controllers/pages/index';
import * as protocols from './protocols/index';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import { UserModel } from '@/models';
import cors from 'cors';
import { specOS3 } from '@/spec/specOS3';

@Configuration({
    ...config,
    acceptMimes: ['application/json'],
    httpPort: process.env.PORT || 8083,
    httpsPort: false, // CHANGE
    componentsScan: false,
    mount: {
        '/rest': [...Object.values(rest)],
        '/': [...Object.values(pages)]
    },
    imports: [...Object.values(protocols)],
    swagger: [
        {
            path: '/doc',
            specVersion: '3.0.1',
            spec: specOS3
        }
    ],
    middlewares: [
        'cors',
        'cookie-parser',
        'compression',
        'method-override',
        'json-parser',
        { use: 'urlencoded-parser', options: { extended: true } }
    ],
    views: {
        root: join(process.cwd(), '../views'),
        extensions: {
            ejs: 'ejs'
        }
    },
    exclude: ['**/*.spec.ts'],
    passport: {
        userInfoModel: UserModel
    }
})
export class Server {
    @Inject()
    protected app: PlatformApplication;

    @Configuration()
    protected settings: Configuration;

    $beforeRoutesInit() {
        this.app
            .use(cors())
            .use(cookieParser())
            .use(methodOverride())
            .use(bodyParser.json())
            .use(
                bodyParser.urlencoded({
                    extended: true
                })
            )
            .use(
                session({
                    secret: 'some secret',
                    resave: true,
                    saveUninitialized: true,
                    cookie: {
                        path: '/',
                        // httpOnly: true,
                        secure: false
                    }
                })
            );
    }
}
