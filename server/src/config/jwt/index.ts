import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from '@/config/envs';
import { InternalServerError } from '@tsed/exceptions';
import { ExtractJwt } from 'passport-jwt';
import { Req } from '@tsed/common';

export interface JwtPayload extends jwt.JwtPayload {
    uid: number;
    username: string;
    email: string;
}

export const getJwtSecret = (): string => {
    if (envs.JWT_SECRET) {
        return envs.JWT_SECRET;
    } else {
        throw new InternalServerError('JWT_SECRET is not defined');
    }
};

export const JwtOptions: SignOptions = {
    expiresIn: '1d',
    audience: 'task.horizon',
    issuer: 'task.horizon'
};

export function jwtSign(payload: Partial<JwtPayload>): string {
    if (!getJwtSecret()) {
        throw new InternalServerError('JWT SECRET not set');
    }
    return jwt.sign(payload, getJwtSecret(), JwtOptions);
}

export function extractBearerToken(req: Req): string | null {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
}

export function extractJwtPayload(req: Req): JwtPayload | null {
    const token = extractBearerToken(req);
    if (token) {
        return jwt.verify(token, getJwtSecret()) as JwtPayload;
    } else {
        return null;
    }
}
