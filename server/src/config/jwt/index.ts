import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from '@/config/envs';
import { InternalServerError } from '@tsed/exceptions';

export interface JwtPayload {
    username: string;
    email: string;
    id: number;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
}

export const JwtOptions: SignOptions = {
    expiresIn: '1d',
    audience: 'task.horizon',
    issuer: 'task.horizon'
};

export function jwtSign(payload: Partial<JwtPayload>): string {
    if (!envs.JWT_SECRET) {
        throw new InternalServerError('JWT SECRET not set');
    }
    return jwt.sign(payload, envs.JWT_SECRET, JwtOptions);
}
