import { ErrorBase } from "./base.error";

export class ForbidenError extends ErrorBase {
    constructor(message = "Você não tem permissão para realizar essa ação") {
        super(403, message);
    }
}
