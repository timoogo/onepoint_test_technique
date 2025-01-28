import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

/**
 * Valide les données avec un DTO.
 * @param dtoClass La classe du DTO (avec décorateurs class-validator).
 * @param data Les données brutes à valider.
 * @returns Une instance validée du DTO.
 * @throws Une erreur contenant les détails des validations échouées.
 */
export const validateDto = async <T extends object>(dtoClass: new () => T, data: unknown): Promise<T> => {
    // Transforme les données brutes en une instance de la classe DTO
    const dtoInstance = plainToInstance(dtoClass, data);

    // Valide l'instance
    const errors: ValidationError[] = await validate(dtoInstance);

    if (errors.length > 0) {
        // Formatage des erreurs
        const formattedErrors = errors.map(err => ({
            property: err.property,
            constraints: err.constraints,
        }));

        // Lancer une exception personnalisée
        throw new Error(
            JSON.stringify({
                message: 'Validation échouée',
                errors: formattedErrors,
            }),
        );
    }

    return dtoInstance; // Renvoie l'instance validée
};
