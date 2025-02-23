import fs from "fs";
import path from "path";

export const UserMessages = {
    USERNAME_REQUIRED: "Le nom d'utilisateur est obligatoire",
    USERNAME_LENGTH: `Le nom d'utilisateur doit contenir entre 3 et 30 caractères`,
    
    EMAIL_REQUIRED: "L'email est obligatoire",
    EMAIL_INVALID: "L'email n'est pas valide",
    
    PASSWORD_REQUIRED: "Le mot de passe est obligatoire",
    PASSWORD_LENGTH: `Le mot de passe doit contenir entre 8 et 64 caractères`,
    PASSWORD_PATTERN: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
    PASSWORD_TYPE: "Le mot de passe doit être une chaîne de caractères",

    NAME_REQUIRED: "Le nom est obligatoire",
    NAME_TYPE: "Le nom doit être une chaîne de caractères",
    NAME_LENGTH: `Le nom doit contenir entre 2 et 50 caractères`,

    ROLE_TYPE: "Le rôle doit être une chaîne de caractères",
    ROLE_PATTERN: "Le rôle doit être soit 'USER' ou 'ADMIN'",

    GET_ALL_USERS_SUMMARY: "Récupérer tous les utilisateurs",

    GET_ALL_USERS_DESCRIPTION: fs.readFileSync(
        path.join(__dirname, "../messages/swagger/get-all-users.md"),
        "utf8",
    ),

    GET_USER_BY_ID_SUMMARY: "Récupérer un utilisateur par ID",
    GET_USER_BY_ID_DESCRIPTION: fs.readFileSync(
        path.join(__dirname, "../messages/swagger/get-user-by-id.md"),
        "utf8",
    ),



    USER_CREATE_SUMMARY: "Création d'un utilisateur",
    USER_CREATE_DESCRIPTION: fs.readFileSync(
        path.join(__dirname, "../messages/swagger/create-user.md"),
        "utf8",
    ),

    DELETE_USER_BY_ID_SUMMARY: "Supprimer un utilisateur par ID",
    DELETE_USER_BY_ID_DESCRIPTION: fs.readFileSync(
        path.join(__dirname, "../messages/swagger/delete-user-by-id.md"),
        "utf8",
    ),


};
