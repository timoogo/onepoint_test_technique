export class ValidationException extends Error {
    public readonly statusCode: number;
    public readonly errors: any[];

    constructor(errors: any[]) {
        super("Validation échouée");
        this.statusCode = 400;
        this.errors = errors;
    }
}
