
// dependencies 
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

// use-cases
import { makeGetCustomerProfileUseCase } from "../../../use-cases/factories/make-get-customer-profile-use-case";

export async function GetCustomerController(request: FastifyRequest, reply: FastifyReply) {

    try {

        const getCustomerProfile = makeGetCustomerProfileUseCase()

        const registerUserBodySchema = z.object({
            id: z.string(),
        });

        const { id } = registerUserBodySchema.parse(request.params);

        const { customer } = await getCustomerProfile.execute({ customer_id: id })

        return reply.status(200).send({ message: "Customer found", customer })

    }catch(error) {
        return reply.status(400).send({ message: "Error retrieving customer", error })
    }
    
}
