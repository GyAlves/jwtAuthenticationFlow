
// dependencies
import knex from '../../database/database.config';

// models 
import { Customer } from "../../models/Customer";

// repositories
import { CustomersRepository } from '../customers-repository'

export class KnexCustomersRepository implements CustomersRepository {

    async findById(id: string): Promise<Customer | any> {

        const query = knex("customers").select();

        return await query.where("id", "=", id).select("*");

    }

    async findByEmail(email: string): Promise<Customer[] | []> {

        const query = knex("customers").select();

        return await query.where("email", "=", email).select("*");

    }

    async create(customer: Customer): Promise<number[]> {

        return await knex("customers").insert(customer);

    }
}