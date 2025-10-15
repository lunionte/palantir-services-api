import { User } from "../models/owner.model";

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}
