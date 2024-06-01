// dependencies
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

// repositories
import { CustomersRepository } from "../repositories/customers-repository";

// model
import { Customer } from "../models/Customer";

// error-handling

// interfaces
interface IGetCustomerProfileUseCaseRequest {
    customer: Customer
}

interface IGetCustomerProfileUseCaseResponse {
    customer: number[]
}

export class RegisterUserUseCase {

    constructor(private customersRepository: CustomersRepository) { }

    async execute({ customer }: IGetCustomerProfileUseCaseRequest): Promise<IGetCustomerProfileUseCaseResponse> {

        const customerExists = await this.customersRepository.findByEmail(customer.email);

        if (customerExists.length > 0) {
          throw new Error(`Customer ${customer.email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(customer.password, 6);

        customer.password =  hashedPassword;
        customer.id = randomUUID();

        const customerCreated = await this.customersRepository.create(customer);

        return {
            customer: customerCreated
        }

    }
}