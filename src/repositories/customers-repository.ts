
// models 
import { Customer } from "../models/Customer";

export interface CustomersRepository {
    findById(id: string): Promise<Customer | null>
    findByEmail(email: string): Promise<Customer[] | []>
    create(customer: Customer): Promise<number[]>
}