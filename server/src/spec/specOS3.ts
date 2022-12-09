import { OpenSpec3 } from '@tsed/openspec';

import { version as packageVersion } from '../../package.json';

export const specOS3: Partial<OpenSpec3> = {
    info: {
        title: 'TaskHorizon API',
        version: packageVersion,
        description: 'TaskHorizon API Document'
    },
    components: {
        securitySchemes: {
            jwt: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: ''
            }
        }
    }
};
