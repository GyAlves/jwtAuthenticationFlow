
// repositories
import { KnexCustomersRepository } from "../../repositories/knex/knex-customers-repository";

// use-case
import { RegisterUserUseCase } from "../register-user.use-case";

export function makeRegisterUserUseCase() {
    const customersRepository = new KnexCustomersRepository()
    const useCase = new RegisterUserUseCase(customersRepository)

    return useCase
}