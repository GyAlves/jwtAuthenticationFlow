
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeRegisterUserUseCase } from '../../../use-cases/factories/make-register-user-use-case';

export async function RegisterCustomerController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const registerCustomer = makeRegisterUserUseCase()

        const registerUserBodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        });

        const { name, email, password } = registerUserBodySchema.parse(request.body);

        const { customer } = await registerCustomer.execute({ 
            customer: {
                name,
                email,
                password
            }
        })

        return reply.status(200).send({ message: "Customer registered successfully", customer })

    }catch(error) {

        if(error instanceof Error) {
            reply.status(403).send({ error: error.message })
        }

        reply.status(400).send({ message: "Error registering customer", error })
    }
    
}
