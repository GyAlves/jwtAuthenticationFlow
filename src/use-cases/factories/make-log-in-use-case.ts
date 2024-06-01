
// repositories
import { KnexCustomersRepository } from "../../repositories/knex/knex-customers-repository";

// use-case
import { UserLogInUseCase } from "../user-log-in.use-case";

export function makeUserLogInUseCase() {
    const customersRepository = new KnexCustomersRepository()
    const useCase = new UserLogInUseCase(customersRepository)

    return useCase
}