
// repositories
import { KnexCustomersRepository } from "../../repositories/knex/knex-customers-repository";

// use-case
import { GetCustomerProfileUseCase } from "../get-customer-profile.use-case";

export function makeGetCustomerProfileUseCase() {
    const customersRepository = new KnexCustomersRepository()
    const useCase = new GetCustomerProfileUseCase(customersRepository)

    return useCase
}