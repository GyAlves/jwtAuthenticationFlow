// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export const userAuthorizationMiddleware = (request: FastifyRequest, reply: FastifyReply, done: any) => {

    const authorizationToken = request.headers["authorization"];

    if(!authorizationToken) {
        return reply.status(403).send({ message: 'Access denied' });
    }

    const isTokenVerified = jwt.verify(authorizationToken, "mySecretJwtKey1234@");
    
    if(!isTokenVerified) {
        return reply.status(403).send({ message: 'Access denied' });
    }

    done();

}