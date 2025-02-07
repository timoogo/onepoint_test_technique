import { BaseException } from "./base.exception";
import { HttpStatus } from "../config/http.config";

export class AuthException extends BaseException {
    constructor(message: string = "Email ou mot de passe incorrect") {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}
