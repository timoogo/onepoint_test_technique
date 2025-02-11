import { AppConfig } from "./app.config";

export class ConfigBase {
    /**
     * Vérifie si une valeur locale est définie, sinon retourne la valeur globale de `AppConfig`
     * @param key Clé du paramètre dans `AppConfig`
     * @param localValue Valeur spécifique au module
     * @returns Valeur spécifique si définie, sinon celle de `AppConfig`
     */
    static getOrDefault<T>(key: keyof typeof AppConfig, localValue: T): T {
        return localValue !== "" ? localValue : (AppConfig as any)[key];
    }
}
