import { HttpStatus } from "../config/http.config";
import { BaseException } from "./base.exception";

export class RegisterException extends BaseException {
	constructor(message: string) {
		super(message, HttpStatus.BAD_REQUEST);
	}
}
