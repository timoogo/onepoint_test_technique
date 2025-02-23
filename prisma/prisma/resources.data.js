"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articles = exports.users = void 0;
var bcrypt_1 = require("bcrypt");
var hashPasswordSync = function (password) {
    return bcrypt_1.default.hashSync(password, 10);
};
var users = [
    {
        id: 1,
        email: "admin@example.com",
        name: "Admin",
        password: hashPasswordSync("SuperSecureP@ss123"), // plus d'async ici
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        email: "user@example.com",
        name: "User",
        password: hashPasswordSync("MotDePasseSecurisé123!"),
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
exports.users = users;
var articles = [
    {
        id: 1,
        title: "Article 1",
        description: "Description 1",
        content: "Content 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdById: 1,
    },
    {
        id: 2,
        title: "Article 2",
        description: "Description 2",
        content: "Content 2",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdById: 2,
    },
];
exports.articles = articles;
