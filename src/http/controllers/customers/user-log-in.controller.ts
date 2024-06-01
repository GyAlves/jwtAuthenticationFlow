
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeUserLogInUseCase } from '../../../use-cases/factories/make-log-in-use-case';

export async function UserLogInController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const userLogIn = makeUserLogInUseCase()

        const userLogInBodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        });

        const { email, password } = userLogInBodySchema.parse(request.body);

        const { jwt } = await userLogIn.execute({ email, password});

        return reply.status(200).send({ message: "Customer logged successfully", jwt })

    }catch(error) {

        if(error instanceof Error) {
            reply.status(403).send({ error: error.message })
        }

        reply.status(400).send({ message: "Error logging customer", error })
    }
    
}
