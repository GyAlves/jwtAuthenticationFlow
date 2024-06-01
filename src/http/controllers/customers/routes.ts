
// dependencies
import { FastifyInstance } from "fastify";

//controllers
import { GetCustomerController } from "./get-customer.controller";
import { RegisterCustomerController } from "./register-customer.controller";
import { UserLogInController } from "./user-log-in.controller";

// middlewares
import { userAuthorizationMiddleware } from "../../middlewares/user-authorization.middleware";

export async function CustomersRouter(app: FastifyInstance) {
    app.get("/customer/:id",{ preHandler: [ userAuthorizationMiddleware ] },GetCustomerController);
    app.post("/customer", RegisterCustomerController);
    app.post("/customer/login", UserLogInController)
}