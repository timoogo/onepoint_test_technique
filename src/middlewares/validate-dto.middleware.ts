import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { PasswordValidationException } from "../exeptions/password-validation.exception";
import { ValidationException } from "../exeptions/validation-exception.exception";

export const validateDto = async <T extends object>(dtoClass: new () => T, data: unknown): Promise<T> => {
    const dtoInstance = plainToInstance(dtoClass, data as Record<string, any>);
    const errors: ValidationError[] = await validate(dtoInstance);

    if (errors.length > 0) {
        // Vérifie si une erreur concerne un mot de passe et lève une exception spécifique
        const dataObject = data as Record<string, any>; // Cast explicite
        const passwordError = errors.find(err => err.property === "password");

        if (passwordError && typeof dataObject.password === "string") {
            throw new PasswordValidationException(dataObject.password);
        }

        // Sinon, lève une exception générique pour les autres erreurs
        const formattedErrors = errors.map(err => ({
            property: err.property,
            constraints: Object.values(err.constraints || {}),
        }));

        throw new ValidationException(formattedErrors);
    }

    return dtoInstance;
};
