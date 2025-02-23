import { HttpStatus } from "../config/http.config";
import { BaseException } from "./base.exception";

export class ValidationException extends BaseException {
    public readonly errors: any[];

    constructor(errors: any[]) {
        super("Validation échouée", HttpStatus.BAD_REQUEST);
        this.errors = errors;
    }
}
