// dependencies
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// repositories
import { CustomersRepository } from "../repositories/customers-repository";

// error-handling

// interfaces
interface IGetCustomerProfileUseCaseRequest {
   email: string;
   password: string;
}

interface IGetCustomerProfileUseCaseResponse {
    jwt: string
}

export class UserLogInUseCase {

    constructor(private customersRepository: CustomersRepository) { }

    async execute({ email, password }: IGetCustomerProfileUseCaseRequest): Promise<IGetCustomerProfileUseCaseResponse> {

        const customer = await this.customersRepository.findByEmail(email);

        if (customer.length === 0) {
          throw new Error("Invalid credentials");
        }

        const isValidPassword = await bcrypt.compare(password, customer[0].password);

        if (!isValidPassword) {
            throw new Error("Invalid credentials");
        }

        const SECRET_KEY = 'mySecretJwtKey1234@';

        const jwtKey = jwt.sign({ id: customer[0].id, name: customer[0].name }, SECRET_KEY, { expiresIn: '1h' });

        return {
            jwt: jwtKey
        }
    }
}