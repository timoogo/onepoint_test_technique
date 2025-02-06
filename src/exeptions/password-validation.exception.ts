import { ValidationException } from "./validation-exception.exception";

export class PasswordValidationException extends ValidationException {
    public readonly violatedConstraints: any[];

    constructor(password: string) {
        const violatedConstraints = [];

        if (!/(?=.*[A-Z])/.test(password)) {
            violatedConstraints.push({
                type: "uppercase",
                message: "Le mot de passe doit contenir au moins une lettre majuscule.",
                expectedPattern: "A-Z",
            });
        }
        if (!/(?=.*[a-z])/.test(password)) {
            violatedConstraints.push({
                type: "lowercase",
                message: "Le mot de passe doit contenir au moins une lettre minuscule.",
                expectedPattern: "a-z",
            });
        }
        if (!/(?=.*\d)/.test(password)) {
            violatedConstraints.push({
                type: "digit",
                message: "Le mot de passe doit contenir au moins un chiffre.",
                expectedPattern: "0-9",
            });
        }
        if (!/(?=.*[@$!%*?&~])/g.test(password)) {
            violatedConstraints.push({
                type: "special",
                message: "Le mot de passe doit contenir au moins un caractère spécial.",
                expectedPattern: "!@#$%^&*",
            });
        }

        super([{ property: "password", constraints: violatedConstraints }]);
        this.violatedConstraints = violatedConstraints;
    }
}
