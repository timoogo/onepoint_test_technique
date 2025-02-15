# Documentation du Projet : Test Technique OnePoint

## 1. Introduction
Cette documentation décrit la stack technique utilisée dans le projet *Test Technique OnePoint*, avec une présentation détaillée des principales dépendances par catégorie.

---

## 2. Stack Technique

### 2.1 Serveur
| Nom                 | Version principale | Lien officiel                             | Lien npm                                      |
|---------------------|--------------------|------------------------------------------|----------------------------------------------|
| fastify             | 5.2               | [fastify.dev](https://www.fastify.dev)   | [npm](https://www.npmjs.com/package/fastify) |
| @fastify/swagger-ui | 5.2               | [GitHub](https://github.com/fastify/fastify-swagger-ui) | [npm](https://www.npmjs.com/package/@fastify/swagger-ui) |

---

### 2.2 ORM & Base de données
| Nom         | Version principale | Lien officiel                      | Lien npm                                     |
|-------------|--------------------|-----------------------------------|---------------------------------------------|
| prisma      | 6.2               | [prisma.io](https://www.prisma.io) | [npm](https://www.npmjs.com/package/prisma) |
| @prisma/client | 6.2            | [prisma.io](https://www.prisma.io) | [npm](https://www.npmjs.com/package/@prisma/client) |
| ioredis     | 5.4               | [redis.io](https://redis.io)      | [npm](https://www.npmjs.com/package/ioredis) |

---

### 2.3 Sécurité & Authentification
| Nom          | Version principale | Lien officiel                          | Lien npm                                        |
|--------------|--------------------|---------------------------------------|------------------------------------------------|
| bcrypt       | 5.1               | [GitHub](https://github.com/kelektiv/node.bcrypt.js) | [npm](https://www.npmjs.com/package/bcrypt)   |
| fastify-jwt  | 4.2               | [GitHub](https://github.com/fastify/fastify-jwt) | [npm](https://www.npmjs.com/package/fastify-jwt) |

---

### 2.4 Documentation
| Nom                | Version principale | Lien officiel                                  | Lien npm                                      |
|--------------------|--------------------|-----------------------------------------------|----------------------------------------------|
| fastify-swagger    | 5.2               | [GitHub](https://github.com/fastify/fastify-swagger) | [npm](https://www.npmjs.com/package/fastify-swagger) |
| typedoc            | 0.27              | [typedoc.org](https://typedoc.org)            | [npm](https://www.npmjs.com/package/typedoc) |
| typedoc-plugin-markdown | 4.4        | [GitHub](https://github.com/tgreyuk/typedoc-plugin-markdown) | [npm](https://www.npmjs.com/package/typedoc-plugin-markdown) |

---

### 2.5 Validation
| Nom                | Version principale | Lien officiel                                | Lien npm                                      |
|--------------------|--------------------|---------------------------------------------|----------------------------------------------|
| class-transformer  | 0.5               | [class-transformer](https://github.com/typestack/class-transformer) | [npm](https://www.npmjs.com/package/class-transformer) |
| class-validator    | 0.14              | [class-validator](https://github.com/typestack/class-validator) | [npm](https://www.npmjs.com/package/class-validator) |

---

### 2.6 Outils de développement
| Nom                       | Version principale | Lien officiel                          | Lien npm                                    |
|--------------------------|--------------------|---------------------------------------|---------------------------------------------|
| eslint                   | 9.19              | [eslint.org](https://eslint.org)     | [npm](https://www.npmjs.com/package/eslint) |
| prettier                 | 3.4               | [prettier.io](https://prettier.io)   | [npm](https://www.npmjs.com/package/prettier) |
| ts-node                  | 10.9              | [TypeStrong](https://typestrong.org) | [npm](https://www.npmjs.com/package/ts-node) |
| dotenv                   | 16.4              | [dotenv](https://github.com/motdotla/dotenv) | [npm](https://www.npmjs.com/package/dotenv) |
| cross-env                | 7.0               | [GitHub](https://github.com/kentcdodds/cross-env) | [npm](https://www.npmjs.com/package/cross-env) |

---

## 3. Remarques
- Les versions indiquées sont les principales, comme définies dans le fichier `package.json`.
- Les liens mènent vers la documentation officielle ou la page npm selon la disponibilité.

---
