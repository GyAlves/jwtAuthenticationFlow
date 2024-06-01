
// interfaces
import ICustomer from "./interfaces/ICustomer";

export class Customer implements ICustomer {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public id?: string,
        public created_at?: Date
    ) { }
}