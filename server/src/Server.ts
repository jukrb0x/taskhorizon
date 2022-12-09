import { join } from 'path';
import { Configuration, Inject, Injectable } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import '@tsed/ajv';
import '@tsed/swagger';
import { config } from './config';
import * as rest from './controllers/rest/index';
import * as pages from './controllers/pages/index';
import session from 'express-session';

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
    swagger: [
        {
            path: '/doc',
            specVersion: '3.0.1'
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
    exclude: ['**/*.spec.ts']
})
export class Server {
    @Inject()
    protected app: PlatformApplication;

    @Configuration()
    protected settings: Configuration;

    $beforeRoutesInit() {
        this.app.use(
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
